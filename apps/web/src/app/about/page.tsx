import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { Timeline } from "@/components/sections/Timeline";
import { JsonLd } from "@/components/shared/JsonLd";
import { getAboutData, type PageSection } from "@/lib/cms/about";
import { resolveIcon } from "@/lib/cms/icons";
import { SITE_URL } from "@/constants/site";

export const revalidate = 60;

// Fallbacks match the original hardcoded copy exactly, so the page still
// renders correctly even if a given section hasn't been seeded/edited yet.
// `iconFallback` is only set for sections that render an icon (mission/vision).
const FALLBACKS: Record<string, { eyebrow: string; heading: string; body: string; iconFallback?: string }> = {
  "who-we-are": {
    eyebrow: "Who We Are",
    heading: "A Neutral Home for Nepal's Networks",
    body: "NPIX (Nepal Internet Exchange) is an independent, carrier-neutral platform that allows Internet Service Providers, banks, government organizations, educational institutions, and technology companies to exchange traffic directly within Nepal. By keeping domestic traffic local, NPIX helps reduce latency, lower transit costs, and strengthen the reliability of Nepal's Internet infrastructure.",
  },
  "what-is-ixp": {
    eyebrow: "What is an Internet Exchange",
    heading: "The Fabric Behind a Faster Internet",
    body: "An Internet Exchange Point (IXP) is a physical and logical infrastructure where multiple networks connect to exchange traffic directly, instead of routing it through third-party international transit providers. This reduces the number of hops data must travel, improving speed and reliability for end users across the country.",
  },
  "why-npix-exists": {
    eyebrow: "Our Purpose",
    heading: "Why NPIX Exists",
    body: "Before NPIX, domestic internet traffic between Nepali networks often traveled through international links, introducing unnecessary latency and additional costs for purely local communication. NPIX was established to provide Nepal's networks with a fast, neutral, and reliable platform for direct interconnection, ensuring that local traffic remains local whenever possible.",
  },
  mission: {
    eyebrow: "",
    heading: "Mission",
    body: "To strengthen Nepal's digital infrastructure by providing a neutral, secure, and highly available platform for domestic internet traffic exchange, enabling efficient connectivity and collaboration among network operators.",
    iconFallback: "Target",
  },
  vision: {
    eyebrow: "",
    heading: "Vision",
    body: "To build a digitally connected Nepal where organizations and communities benefit from fast, affordable, resilient, and locally interconnected internet services.",
    iconFallback: "Eye",
  },
};

// Resolves the icon here (a plain data helper, not a component) rather than
// in AboutPage's body — assigning the result of resolveIcon() to a variable
// used directly as a JSX tag inside a component is flagged by
// react-hooks/static-components ("component created during render"), the
// same way `coreValues[i].icon` is pre-resolved in getAboutData() instead of
// in the page. Consuming `<section(...).Icon />` as a property read sidesteps
// that, matching the pattern already used for core values below.
function section(sections: Map<string, PageSection>, key: keyof typeof FALLBACKS) {
  const found = sections.get(key);
  const fallback = FALLBACKS[key];
  return {
    eyebrow: found?.eyebrow ?? fallback.eyebrow,
    heading: found?.heading ?? fallback.heading,
    body: found?.body ?? fallback.body,
    Icon: fallback.iconFallback ? resolveIcon(found?.iconName ?? fallback.iconFallback) : undefined,
  };
}

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about NPIX, Nepal's carrier-neutral Internet Exchange - our mission, vision, core values, history, and leadership team.",
  keywords: ["about NPIX", "Nepal Internet Exchange history", "IXP mission Nepal"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NPIX | Nepal Internet Exchange",
    description:
      "Learn about NPIX's mission, vision, core values, history, and leadership team.",
    url: `${SITE_URL}/about`,
  },
};

export default async function AboutPage() {
  const { coreValues, timeline, team, sections } = await getAboutData();
  const whoWeAre = section(sections, "who-we-are");
  const whatIsIxp = section(sections, "what-is-ixp");
  const whyNpixExists = section(sections, "why-npix-exists");
  const mission = section(sections, "mission");
  const vision = section(sections, "vision");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about` },
          ],
        }}
      />

      <PageHeader
        eyebrow="About NPIX"
        title="Connecting Nepal's Networks, Strengthening Nepal's Internet"
        description="Nepal Internet Exchange (NPIX) is a neutral and independent Internet Exchange Point (IXP) that enables networks across Nepal to exchange internet traffic locally. By providing secure and reliable interconnection infrastructure, NPIX helps improve performance, reduce costs, and strengthen the resilience of Nepal's digital ecosystem."
      />

      <section className="py-12 md:py-16">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {whoWeAre.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              {whoWeAre.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              {whoWeAre.body}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {whatIsIxp.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              {whatIsIxp.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              {whatIsIxp.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {whyNpixExists.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {whyNpixExists.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              {whyNpixExists.body}
            </p>
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                {mission.Icon && <mission.Icon className="h-6 w-6" aria-hidden="true" />}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{mission.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {mission.body}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {vision.Icon && <vision.Icon className="h-6 w-6" aria-hidden="true" />}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{vision.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {vision.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {coreValues.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-page">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                What Guides Us
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Core Values
              </h2>
            </FadeIn>

            {/* md:3 step avoids jumping straight from 2 to 5 columns —
                without it, five text-heavy cards get visibly cramped at
                common laptop/tablet widths (1024–1279px). */}
            <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {coreValues.map((value) => {
                const Icon = value.icon;
                return (
                  <StaggerItem key={value.id}>
                    <div className="flex h-full flex-col items-start rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                        {value.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      <section className="bg-surface py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Our Journey
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              NPIX Timeline
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              Key milestones in the growth of Nepal Internet Exchange and its contribution
              to Nepal&apos;s digital ecosystem.
            </p>
          </FadeIn>

          <div className="mx-auto mt-8 max-w-3xl">
            <Timeline entries={timeline} />
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-page">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Meet the Team
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Leadership Team
              </h2>
            </FadeIn>

            <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="flex h-full flex-col items-center rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <InitialsAvatar name={member.name} className="h-16 w-16 text-lg" />
                    )}
                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-secondary">{member.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                      {member.bio}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
