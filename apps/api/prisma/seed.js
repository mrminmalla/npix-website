"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2 = __importStar(require("argon2"));
const LucideIcons = __importStar(require("lucide-react"));
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const core_values_1 = require("../../web/src/data/core-values");
const documentation_1 = require("../../web/src/data/documentation");
const members_1 = require("../../web/src/data/members");
const news_1 = require("../../web/src/data/news");
const stats_1 = require("../../web/src/data/stats");
const team_1 = require("../../web/src/data/team");
const timeline_1 = require("../../web/src/data/timeline");
const traffic_panels_1 = require("../../web/src/data/traffic-panels");
const why_npix_1 = require("../../web/src/data/why-npix");
const prisma = new client_1.PrismaClient();
const WEB_PUBLIC_DIR = (0, node_path_1.join)(__dirname, '..', '..', 'web', 'public');
const UPLOADS_DIR = (0, node_path_1.join)(process.cwd(), process.env.UPLOADS_DIR ?? './uploads');
const PUBLIC_ASSET_BASE_URL = process.env.PUBLIC_ASSET_BASE_URL ?? 'http://localhost:4100/uploads';
const NEWS_CATEGORY_MAP = {
    Announcements: client_1.NewsCategory.Announcements,
    Maintenance: client_1.NewsCategory.Maintenance,
    'New Members': client_1.NewsCategory.NewMembers,
    Workshops: client_1.NewsCategory.Workshops,
    Conferences: client_1.NewsCategory.Conferences,
    Upgrades: client_1.NewsCategory.Upgrades,
};
function iconName(icon) {
    const entry = Object.entries(LucideIcons).find(([, value]) => value === icon);
    if (!entry) {
        console.warn('  ! could not resolve icon name, falling back to HelpCircle');
        return 'HelpCircle';
    }
    return entry[0];
}
function cleanAddress(value) {
    if (!value)
        return undefined;
    return value.replace(/:{3,}/g, '::');
}
function stripCidr(value) {
    return value?.split('/')[0];
}
function guessMimeType(path) {
    if (path.endsWith('.png'))
        return 'image/png';
    if (path.endsWith('.svg'))
        return 'image/svg+xml';
    if (path.endsWith('.jpg') || path.endsWith('.jpeg'))
        return 'image/jpeg';
    if (path.endsWith('.pdf'))
        return 'application/pdf';
    return 'application/octet-stream';
}
async function seedAssetFromPublicFile(relativePath, altText) {
    const cleanedRelativePath = relativePath.replace(/^\/+/, '');
    const key = `seed/${cleanedRelativePath}`;
    const existing = await prisma.asset.findUnique({ where: { storageKey: key } });
    if (existing)
        return existing.id;
    let buffer;
    try {
        buffer = await (0, promises_1.readFile)((0, node_path_1.join)(WEB_PUBLIC_DIR, cleanedRelativePath));
    }
    catch {
        console.warn(`  ! could not read public/${cleanedRelativePath}, skipping asset`);
        return null;
    }
    const destPath = (0, node_path_1.join)(UPLOADS_DIR, key);
    await (0, promises_1.mkdir)((0, node_path_1.dirname)(destPath), { recursive: true });
    await (0, promises_1.writeFile)(destPath, buffer);
    const asset = await prisma.asset.create({
        data: {
            storageKey: key,
            url: `${PUBLIC_ASSET_BASE_URL}/${key}`,
            originalFilename: (0, node_path_1.basename)(cleanedRelativePath),
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
    if (existing)
        return;
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
        data: core_values_1.CORE_VALUES.map((item, index) => ({
            title: item.title,
            description: item.description,
            iconName: iconName(item.icon),
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${core_values_1.CORE_VALUES.length} core values`);
}
async function seedTimeline() {
    await prisma.timelineEntry.deleteMany();
    await prisma.timelineEntry.createMany({
        data: timeline_1.TIMELINE.map((item, index) => ({
            year: item.year,
            title: item.title,
            description: item.description,
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${timeline_1.TIMELINE.length} timeline entries`);
}
async function seedTeamMembers() {
    await prisma.teamMember.deleteMany();
    await prisma.teamMember.createMany({
        data: team_1.TEAM_MEMBERS.map((item, index) => ({
            name: item.name,
            role: item.role,
            bio: item.bio,
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${team_1.TEAM_MEMBERS.length} team members`);
}
async function seedWhyNpix() {
    await prisma.whyNpixItem.deleteMany();
    await prisma.whyNpixItem.createMany({
        data: why_npix_1.WHY_NPIX.map((item, index) => ({
            title: item.title,
            description: item.description,
            iconName: iconName(item.icon),
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${why_npix_1.WHY_NPIX.length} "why NPIX" items`);
}
async function seedStatCards() {
    await prisma.statCard.deleteMany();
    const homeStats = stats_1.HOME_STATS.filter((s) => s.label !== 'Connected ASNs');
    const rows = [
        ...homeStats.map((s, i) => ({ ...s, section: client_1.StatSection.home, sortOrder: i })),
        ...stats_1.TRAFFIC_INSIGHTS_STATS.map((s, i) => ({
            ...s,
            section: client_1.StatSection.traffic_insights,
            sortOrder: i,
        })),
        ...stats_1.INFRASTRUCTURE_STATS.map((s, i) => ({
            ...s,
            section: client_1.StatSection.infrastructure,
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
    await prisma.protocolAdoption.create({
        data: {
            ipv4SharePercent: stats_1.PROTOCOL_ADOPTION.ipv4SharePercent,
            ipv6SharePercent: stats_1.PROTOCOL_ADOPTION.ipv6SharePercent,
        },
    });
    console.log('✓ seeded protocol adoption');
}
async function seedPointsOfPresence() {
    await prisma.pointOfPresence.deleteMany();
    await prisma.pointOfPresence.createMany({
        data: stats_1.POINTS_OF_PRESENCE.map((p, index) => ({
            name: p.name,
            city: p.city,
            description: p.description,
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${stats_1.POINTS_OF_PRESENCE.length} points of presence`);
}
async function seedTrafficPanels() {
    await prisma.trafficPanel.deleteMany();
    await prisma.trafficPanel.createMany({
        data: traffic_panels_1.TRAFFIC_PANELS.map((p, index) => ({
            label: p.label,
            sublabel: p.sublabel,
            embedUrl: p.src,
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${traffic_panels_1.TRAFFIC_PANELS.length} traffic panels`);
}
async function seedDocumentCategories() {
    await prisma.document.deleteMany();
    await prisma.documentCategory.deleteMany();
    for (const cat of documentation_1.DOCUMENT_CATEGORIES) {
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
    console.log(`✓ seeded ${documentation_1.DOCUMENT_CATEGORIES.length} document categories`);
}
async function seedDocuments() {
    for (const doc of documentation_1.DOCUMENTS) {
        let fileAssetId = null;
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
                content: doc.content ? doc.content : undefined,
                isFeatured: doc.featured ?? false,
                sortOrder: doc.sortOrder,
            },
        });
    }
    console.log(`✓ seeded ${documentation_1.DOCUMENTS.length} documents`);
}
async function seedFaqs() {
    await prisma.faq.deleteMany();
    await prisma.faq.createMany({
        data: documentation_1.FAQ_ITEMS.map((f, index) => ({
            question: f.question,
            answer: f.answer,
            sortOrder: index,
        })),
    });
    console.log(`✓ seeded ${documentation_1.FAQ_ITEMS.length} FAQs`);
}
async function seedMembers() {
    await prisma.member.deleteMany();
    for (const [index, member] of members_1.MEMBERS.entries()) {
        let logoAssetId = null;
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
                category: member.category,
                logoAssetId,
                sortOrder: index,
            },
        });
    }
    console.log(`✓ seeded ${members_1.MEMBERS.length} members`);
}
async function seedNewsEvents() {
    await prisma.newsEvent.deleteMany();
    for (const item of news_1.NEWS_ITEMS) {
        await prisma.newsEvent.create({
            data: {
                slug: item.slug,
                title: item.title,
                category: NEWS_CATEGORY_MAP[item.category],
                summary: item.summary,
                content: item.content,
                location: item.location,
                isFeatured: item.featured ?? false,
                status: client_1.ContentStatus.published,
                publishedAt: new Date(item.date),
            },
        });
    }
    console.log(`✓ seeded ${news_1.NEWS_ITEMS.length} news & events items`);
}
async function main() {
    console.log('Seeding NPIX database from legacy static data...\n');
    await seedBootstrapAdmin();
    await seedCoreValues();
    await seedTimeline();
    await seedTeamMembers();
    await seedWhyNpix();
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
//# sourceMappingURL=seed.js.map