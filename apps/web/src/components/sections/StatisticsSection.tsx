import { StatCard } from "@/components/cards/StatCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { chunkIntoRows } from "@/lib/utils";
import type { StatDatum } from "@/types";

const ROW_SIZE = 4;

export function StatisticsSection({ stats }: { stats: StatDatum[] }) {
  if (stats.length === 0) return null;

  return (
    <section className="bg-surface pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Live Network Statistics
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            NPIX by the Numbers
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Real-time insights into the infrastructure powering Nepal&apos;s interconnected
            digital ecosystem.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-8 flex flex-col gap-5">
          {chunkIntoRows(stats, ROW_SIZE).map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col gap-5 sm:flex-row">
              {row.map((stat, i) => (
                <StaggerItem key={stat.id} className="min-w-0 sm:flex-1">
                  <StatCard
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    decimals={stat.decimals}
                    description={stat.description}
                    className="h-full"
                    tone={(rowIndex * ROW_SIZE + i) % 2 === 0 ? "blue" : "crimson"}
                  />
                </StaggerItem>
              ))}
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
