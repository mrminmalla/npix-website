import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { TrafficTabs } from "@/components/charts/TrafficTabs";
import { ProtocolAdoptionSection } from "@/components/sections/ProtocolAdoptionSection";
import { PointsOfPresenceSection } from "@/components/sections/PointsOfPresenceSection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { TRAFFIC_INSIGHTS_STATS, INFRASTRUCTURE_STATS } from "@/data/stats";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Real-time and historical NPIX exchange traffic, infrastructure capacity, protocol adoption, and peering statistics.",
  keywords: ["NPIX statistics", "Internet exchange traffic Nepal", "IPv6 adoption Nepal", "BGP peering Nepal"],
  alternates: { canonical: "/statistics" },
  openGraph: {
    title: "Statistics | NPIX",
    description:
      "Real-time and historical NPIX exchange traffic, infrastructure capacity, protocol adoption, and peering statistics.",
    url: `${SITE_URL}/statistics`,
  },
};

export default function StatisticsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Statistics",
              item: `${SITE_URL}/statistics`,
            },
          ],
        }}
      />

      <PageHeader
        eyebrow="Network Analytics"
        title="Statistics"
        description="Real-time and historical insights into traffic exchange, infrastructure capacity, and operational performance across Nepal Internet Exchange (NPIX)."
      />

      <section className="py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Traffic Analytics
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Exchange Traffic Statistics
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              Monitor real-time and historical traffic exchanged across the NPIX peering
              fabric.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="mt-8 rounded-xl border border-border bg-background p-4 shadow-sm sm:p-6"
          >
            <TrafficTabs graphClassName="h-[360px] sm:h-[520px]" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Key Metrics
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Traffic Insights
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              Key traffic indicators derived from exchange traffic.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {TRAFFIC_INSIGHTS_STATS.map((stat) => (
              <StaggerItem key={stat.id}>
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  description={stat.description}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ProtocolAdoptionSection />

      <section className="bg-surface py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Infrastructure
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Exchange Infrastructure
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              Physical infrastructure and operational capacity supporting NPIX.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INFRASTRUCTURE_STATS.map((stat) => (
              <StaggerItem key={stat.id}>
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  description={stat.description}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PointsOfPresenceSection />
    </>
  );
}
