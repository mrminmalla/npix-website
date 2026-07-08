import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { ChartCard } from "@/components/charts/ChartCard";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { MemberGrowthChart } from "@/components/charts/MemberGrowthChart";
import { IPv4IPv6Chart } from "@/components/charts/IPv4IPv6Chart";
import { StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { STATISTICS_PAGE_STATS } from "@/data/stats";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "View NPIX traffic statistics including current and peak traffic, member growth, IPv4 vs IPv6 traffic share, and historical trends.",
  keywords: ["NPIX statistics", "Internet exchange traffic Nepal", "IPv6 adoption Nepal"],
  alternates: { canonical: "/statistics" },
  openGraph: {
    title: "Statistics | NPIX",
    description:
      "View NPIX traffic statistics including current and peak traffic, member growth, and IPv4 vs IPv6 traffic share.",
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
        eyebrow="Transparent Reporting"
        title="Statistics"
        description="Real-time and historical visibility into traffic, membership, and protocol adoption across the NPIX exchange fabric."
      />

      <section className="py-16">
        <div className="container-page">
          <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STATISTICS_PAGE_STATS.map((stat) => (
              <StaggerItem key={stat.id}>
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard
            title="Traffic Growth"
            description="IPv4 vs IPv6 traffic growth, 2016-2026 (Gbps)"
            className="lg:col-span-2"
          >
            <TrafficChart variant="growth" />
          </ChartCard>

          <ChartCard title="IPv4 vs IPv6 Traffic" description="Current protocol traffic share">
            <IPv4IPv6Chart />
          </ChartCard>

          <ChartCard
            title="Member Growth"
            description="Connected members and ASNs over time"
            className="lg:col-span-2"
          >
            <MemberGrowthChart />
          </ChartCard>

          <ChartCard title="Traffic Trends" description="Daily traffic pattern (Gbps)">
            <TrafficChart variant="trends" height={320} />
          </ChartCard>
        </div>
      </section>
    </>
  );
}
