import { StatCard } from "@/components/cards/StatCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { HOME_STATS } from "@/data/stats";

export function StatisticsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Live Network Statistics
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            NPIX by the Numbers
          </h2>
          <p className="mt-4 text-base text-foreground-secondary">
            Real-time visibility into the exchange fabric connecting Nepal&apos;s digital
            ecosystem.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_STATS.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
