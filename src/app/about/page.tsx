import type { Metadata } from "next";
import { Target, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { Timeline } from "@/components/sections/Timeline";
import { JsonLd } from "@/components/shared/JsonLd";
import { CORE_VALUES } from "@/data/core-values";
import { TIMELINE } from "@/data/timeline";
import { TEAM_MEMBERS } from "@/data/team";
import { SITE_URL } from "@/constants/site";

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

export default function AboutPage() {
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
        title="Who We Are"
        description="NPIX is Nepal's carrier-neutral Internet Exchange, built to keep the nation's Internet traffic fast, resilient, and local."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Who We Are
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              A Neutral Home for Nepal&apos;s Networks
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              NPIX (Nepal Internet Exchange) is an independent, carrier-neutral platform
              that allows Internet Service Providers, banks, government organizations,
              educational institutions, and technology companies to exchange traffic
              directly within Nepal. By keeping domestic traffic local, NPIX helps reduce
              latency, lower transit costs, and strengthen the reliability of Nepal&apos;s
              Internet infrastructure.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              What is an Internet Exchange
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              The Fabric Behind a Faster Internet
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              An Internet Exchange Point (IXP) is a physical and logical infrastructure
              where multiple networks connect to exchange traffic directly, instead of
              routing it through third-party international transit providers. This
              reduces the number of hops data must travel, improving speed and
              reliability for end users across the country.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Our Purpose
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why NPIX Exists
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              Before NPIX, domestic Internet traffic between Nepali networks often
              traveled through international links, adding latency and cost even for
              purely local communication. NPIX was founded to correct this by giving
              Nepal&apos;s networks a fast, neutral, and reliable way to connect directly
              with one another.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                To strengthen Nepal&apos;s digital infrastructure by providing a neutral,
                reliable, and efficient platform for domestic Internet traffic exchange.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                A digitally connected Nepal where every organization benefits from fast,
                affordable, and resilient domestic Internet connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              What Guides Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Core Values
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CORE_VALUES.map((value) => {
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

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Our Journey
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Company Timeline
            </h2>
          </FadeIn>

          <div className="mx-auto mt-16 max-w-3xl">
            <Timeline entries={TIMELINE} />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Meet the Team
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Leadership Team
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <StaggerItem key={member.id}>
                <div className="flex h-full flex-col items-center rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <InitialsAvatar
                    name={member.name}
                    className="h-16 w-16 text-lg"
                  />
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
    </>
  );
}
