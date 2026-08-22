/**
 * One-time migration seed: transcribes the legacy static data modules from
 * apps/web/src/data/*.ts directly into Postgres, so the CMS launches with
 * the site looking exactly as it does today (see the approved technical
 * plan, section I — "Migration Strategy from Static Data to Database").
 *
 * Run with: pnpm --filter @npix/api prisma:seed
 *
 * This is destructive by design (clears and re-populates the tables it
 * owns) — intended for the initial migration / local dev, not for re-run
 * against a database that already has real admin-authored content.
 */
import { ContentStatus, MemberCategory, NewsCategory, PrismaClient, StatSection } from '@prisma/client';
import * as argon2 from 'argon2';
import * as LucideIcons from 'lucide-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

import { CORE_VALUES } from '../../web/src/data/core-values';
import { DOCUMENT_CATEGORIES, DOCUMENTS, FAQ_ITEMS } from '../../web/src/data/documentation';
import { MEMBERS } from '../../web/src/data/members';
import { NEWS_ITEMS } from '../../web/src/data/news';
import {
  HOME_STATS,
  INFRASTRUCTURE_STATS,
  POINTS_OF_PRESENCE,
  PROTOCOL_ADOPTION,
  TRAFFIC_INSIGHTS_STATS,
} from '../../web/src/data/stats';
import { TEAM_MEMBERS } from '../../web/src/data/team';
import { TIMELINE } from '../../web/src/data/timeline';
import { TRAFFIC_PANELS } from '../../web/src/data/traffic-panels';
import { WHY_NPIX } from '../../web/src/data/why-npix';

const prisma = new PrismaClient();
const WEB_PUBLIC_DIR = join(__dirname, '..', '..', 'web', 'public');
const UPLOADS_DIR = join(process.cwd(), process.env.UPLOADS_DIR ?? './uploads');
const PUBLIC_ASSET_BASE_URL = process.env.PUBLIC_ASSET_BASE_URL ?? 'http://localhost:4100/uploads';

const NEWS_CATEGORY_MAP: Record<string, NewsCategory> = {
  Announcements: NewsCategory.Announcements,
  Maintenance: NewsCategory.Maintenance,
  'New Members': NewsCategory.NewMembers,
  Workshops: NewsCategory.Workshops,
  Conferences: NewsCategory.Conferences,
  Upgrades: NewsCategory.Upgrades,
};

/**
 * Resolves a `lucide-react` icon component reference back to its export
 * name. Each icon is exported under several aliases (e.g. `TrendingUp`,
 * `LucideTrendingUp`, `TrendingUpIcon`) — we prefer the canonical short
 * name so it matches the admin panel's icon picker.
 */
function iconName(icon: unknown): string {
  const matches = Object.entries(LucideIcons).filter(([, value]) => value === icon);
  if (matches.length === 0) {
    console.warn('  ! could not resolve icon name, falling back to HelpCircle');
    return 'HelpCircle';
  }
  const canonical = matches.find(([key]) => !key.startsWith('Lucide') && !key.endsWith('Icon'));
  return (canonical ?? matches[0])[0];
}

/** Collapses the malformed `:::` typo seen in a couple of legacy IPv6 records. */
function cleanAddress(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  return value.replace(/:{3,}/g, '::');
}

/** ipv6Address should never carry a CIDR suffix (unlike datahubIpv6, where it's normal). */
function stripCidr(value: string | undefined): string | undefined {
  return value?.split('/')[0];
}

function guessMimeType(path: string): string {
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.svg')) return 'image/svg+xml';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  if (path.endsWith('.pdf')) return 'application/pdf';
  return 'application/octet-stream';
}

/**
 * Copies a file already checked into apps/web/public into the API's asset
 * store (local uploads dir + an Asset row) and returns its id. Idempotent
 * across re-runs via the unique storageKey.
 */
async function seedAssetFromPublicFile(relativePath: string, altText: string): Promise<string | null> {
  const cleanedRelativePath = relativePath.replace(/^\/+/, '');
  const key = `seed/${cleanedRelativePath}`;

  const existing = await prisma.asset.findUnique({ where: { storageKey: key } });
  if (existing) return existing.id;

  let buffer: Buffer;
  try {
    buffer = await readFile(join(WEB_PUBLIC_DIR, cleanedRelativePath));
  } catch {
    console.warn(`  ! could not read public/${cleanedRelativePath}, skipping asset`);
    return null;
  }

  const destPath = join(UPLOADS_DIR, key);
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, buffer);

  const asset = await prisma.asset.create({
    data: {
      storageKey: key,
      url: `${PUBLIC_ASSET_BASE_URL}/${key}`,
      originalFilename: basename(cleanedRelativePath),
      mimeType: guessMimeType(cleanedRelativePath),
      sizeBytes: buffer.length,
      altText,
    },
  });
  return asset.id;
}

async function seedBootstrapAdmin() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL ?? 'admin@npix.net.np';
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD ?? 'change-me-please';
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) return;
  await prisma.adminUser.create({
    data: {
      email,
      name: 'NPIX Admin',
      role: 'SUPER_ADMIN',
      passwordHash: await argon2.hash(password),
    },
  });
  console.log(`✓ bootstrap admin user created (${email})`);
}

async function seedCoreValues() {
  await prisma.coreValue.deleteMany();
  await prisma.coreValue.createMany({
    data: CORE_VALUES.map((item, index) => ({
      title: item.title,
      description: item.description,
      iconName: iconName(item.icon),
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${CORE_VALUES.length} core values`);
}

async function seedTimeline() {
  await prisma.timelineEntry.deleteMany();
  await prisma.timelineEntry.createMany({
    data: TIMELINE.map((item, index) => ({
      year: item.year,
      title: item.title,
      description: item.description,
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${TIMELINE.length} timeline entries`);
}

async function seedTeamMembers() {
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: TEAM_MEMBERS.map((item, index) => ({
      name: item.name,
      role: item.role,
      bio: item.bio,
      // `photo` is always "" in the legacy data — no real files exist yet,
      // so photoAssetId stays null and the admin/frontend fall back to the
      // generated initials avatar exactly as today.
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${TEAM_MEMBERS.length} team members`);
}

async function seedWhyNpix() {
  await prisma.whyNpixItem.deleteMany();
  await prisma.whyNpixItem.createMany({
    data: WHY_NPIX.map((item, index) => ({
      title: item.title,
      description: item.description,
      iconName: iconName(item.icon),
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${WHY_NPIX.length} "why NPIX" items`);
}

async function seedStatCards() {
  await prisma.statCard.deleteMany();

  // "Connected ASNs" is computed live from the members table on the
  // current site (new Set(members.map(m => m.asn)).size) — it must stay
  // a live query, never a stored/editable number, so it's excluded here.
  const homeStats = HOME_STATS.filter((s) => s.label !== 'Connected ASNs');

  const rows = [
    ...homeStats.map((s, i) => ({ ...s, section: StatSection.home, sortOrder: i })),
    ...TRAFFIC_INSIGHTS_STATS.map((s, i) => ({
      ...s,
      section: StatSection.traffic_insights,
      sortOrder: i,
    })),
    ...INFRASTRUCTURE_STATS.map((s, i) => ({
      ...s,
      section: StatSection.infrastructure,
      sortOrder: i,
    })),
  ];

  await prisma.statCard.createMany({
    data: rows.map((s) => ({
      section: s.section,
      label: s.label,
      value: s.value,
      prefix: s.prefix,
      suffix: s.suffix,
      decimals: s.decimals ?? 0,
      iconName: iconName(s.icon),
      description: s.description,
      sortOrder: s.sortOrder,
    })),
  });
  console.log(`✓ seeded ${rows.length} stat cards`);
}

async function seedProtocolAdoption() {
  await prisma.protocolAdoption.deleteMany();
  // Only the two static share percentages are seeded — ipv4Sessions /
  // ipv6Sessions are always computed live from the members table.
  await prisma.protocolAdoption.create({
    data: {
      ipv4SharePercent: PROTOCOL_ADOPTION.ipv4SharePercent,
      ipv6SharePercent: PROTOCOL_ADOPTION.ipv6SharePercent,
    },
  });
  console.log('✓ seeded protocol adoption');
}

async function seedPointsOfPresence() {
  await prisma.pointOfPresence.deleteMany();
  await prisma.pointOfPresence.createMany({
    data: POINTS_OF_PRESENCE.map((p, index) => ({
      name: p.name,
      city: p.city,
      description: p.description,
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${POINTS_OF_PRESENCE.length} points of presence`);
}

async function seedTrafficPanels() {
  await prisma.trafficPanel.deleteMany();
  await prisma.trafficPanel.createMany({
    data: TRAFFIC_PANELS.map((p, index) => ({
      label: p.label,
      sublabel: p.sublabel,
      embedUrl: p.src,
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${TRAFFIC_PANELS.length} traffic panels`);
}

async function seedDocumentCategories() {
  await prisma.document.deleteMany();
  await prisma.documentCategory.deleteMany();
  for (const cat of DOCUMENT_CATEGORIES) {
    await prisma.documentCategory.create({
      data: {
        id: cat.id,
        slug: cat.id,
        title: cat.title,
        description: cat.description,
        iconName: iconName(cat.icon),
        sortOrder: cat.sortOrder,
      },
    });
  }
  console.log(`✓ seeded ${DOCUMENT_CATEGORIES.length} document categories`);
}

async function seedDocuments() {
  for (const doc of DOCUMENTS) {
    let fileAssetId: string | null = null;
    if (doc.downloadUrl) {
      fileAssetId = await seedAssetFromPublicFile(doc.downloadUrl, doc.title);
    }
    await prisma.document.create({
      data: {
        title: doc.title,
        description: doc.description,
        categoryId: doc.categoryId,
        tags: doc.tags ?? [],
        fileType: doc.fileType,
        fileSize: doc.fileSize,
        version: doc.version,
        publishDate: new Date(doc.publishDate),
        updatedDate: new Date(doc.updatedDate),
        fileAssetId,
        content: doc.content ? (doc.content as object) : undefined,
        isFeatured: doc.featured ?? false,
        sortOrder: doc.sortOrder,
      },
    });
  }
  console.log(`✓ seeded ${DOCUMENTS.length} documents`);
}

/**
 * The About page's "Who We Are" / "What is an IXP" / "Why NPIX Exists" /
 * Mission / Vision prose was 100% hardcoded JSX with no backing data file
 * on the legacy static site. Per the approved plan this becomes editable,
 * so we seed it here with the exact original copy (a one-time
 * transcription, not a redesign) rather than pulling from src/data.
 */
const ABOUT_SECTIONS = [
  {
    sectionKey: 'who-we-are',
    eyebrow: 'Who We Are',
    heading: "A Neutral Home for Nepal's Networks",
    body: "NPIX (Nepal Internet Exchange) is an independent, carrier-neutral platform that allows Internet Service Providers, banks, government organizations, educational institutions, and technology companies to exchange traffic directly within Nepal. By keeping domestic traffic local, NPIX helps reduce latency, lower transit costs, and strengthen the reliability of Nepal's Internet infrastructure.",
  },
  {
    sectionKey: 'what-is-ixp',
    eyebrow: 'What is an Internet Exchange',
    heading: 'The Fabric Behind a Faster Internet',
    body: 'An Internet Exchange Point (IXP) is a physical and logical infrastructure where multiple networks connect to exchange traffic directly, instead of routing it through third-party international transit providers. This reduces the number of hops data must travel, improving speed and reliability for end users across the country.',
  },
  {
    sectionKey: 'why-npix-exists',
    eyebrow: 'Our Purpose',
    heading: 'Why NPIX Exists',
    body: "Before NPIX, domestic internet traffic between Nepali networks often traveled through international links, introducing unnecessary latency and additional costs for purely local communication. NPIX was established to provide Nepal's networks with a fast, neutral, and reliable platform for direct interconnection, ensuring that local traffic remains local whenever possible.",
  },
  {
    sectionKey: 'mission',
    eyebrow: null,
    heading: 'Mission',
    iconName: 'Target',
    body: 'To strengthen Nepal\'s digital infrastructure by providing a neutral, secure, and highly available platform for domestic internet traffic exchange, enabling efficient connectivity and collaboration among network operators.',
  },
  {
    sectionKey: 'vision',
    eyebrow: null,
    heading: 'Vision',
    iconName: 'Eye',
    body: 'To build a digitally connected Nepal where organizations and communities benefit from fast, affordable, resilient, and locally interconnected internet services.',
  },
];

async function seedPageSections() {
  await prisma.pageSection.deleteMany({ where: { pageSlug: 'about' } });
  await prisma.pageSection.createMany({
    data: ABOUT_SECTIONS.map((s, index) => ({
      pageSlug: 'about',
      sectionKey: s.sectionKey,
      eyebrow: s.eyebrow ?? undefined,
      heading: s.heading,
      body: s.body,
      iconName: 'iconName' in s ? s.iconName : undefined,
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${ABOUT_SECTIONS.length} about page sections`);
}

async function seedFaqs() {
  await prisma.faq.deleteMany();
  await prisma.faq.createMany({
    data: FAQ_ITEMS.map((f, index) => ({
      question: f.question,
      answer: f.answer,
      sortOrder: index,
    })),
  });
  console.log(`✓ seeded ${FAQ_ITEMS.length} FAQs`);
}

async function seedMembers() {
  await prisma.member.deleteMany();
  for (const [index, member] of MEMBERS.entries()) {
    let logoAssetId: string | null = null;
    if (member.logo) {
      logoAssetId = await seedAssetFromPublicFile(member.logo, member.name);
    }
    await prisma.member.create({
      data: {
        name: member.name,
        asn: member.asn,
        website: member.website || undefined,
        ipAddress: member.ipAddress || undefined,
        ipv6Address: stripCidr(cleanAddress(member.ipv6Address)),
        datahubIp: member.datahub || undefined,
        datahubIpv6: cleanAddress(member.datahubIpv6),
        category: member.category as MemberCategory,
        logoAssetId,
        sortOrder: index,
      },
    });
  }
  console.log(`✓ seeded ${MEMBERS.length} members`);
}

async function seedNewsEvents() {
  await prisma.newsEvent.deleteMany();
  for (const item of NEWS_ITEMS) {
    await prisma.newsEvent.create({
      data: {
        slug: item.slug,
        title: item.title,
        category: NEWS_CATEGORY_MAP[item.category],
        summary: item.summary,
        content: item.content,
        location: item.location,
        isFeatured: item.featured ?? false,
        status: ContentStatus.published,
        publishedAt: new Date(item.date),
      },
    });
  }
  console.log(`✓ seeded ${NEWS_ITEMS.length} news & events items`);
}

async function main() {
  console.log('Seeding NPIX database from legacy static data...\n');
  await seedBootstrapAdmin();
  await seedCoreValues();
  await seedTimeline();
  await seedTeamMembers();
  await seedWhyNpix();
  await seedPageSections();
  await seedStatCards();
  await seedProtocolAdoption();
  await seedPointsOfPresence();
  await seedTrafficPanels();
  await seedDocumentCategories();
  await seedDocuments();
  await seedFaqs();
  await seedMembers();
  await seedNewsEvents();
  console.log('\nDone.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
