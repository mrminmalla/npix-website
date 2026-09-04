import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { chunkIntoRows, cn } from "@/lib/utils";
import type { WhyNpixItem } from "@/types";

const ROW_SIZE = 4;

export function WhyNPIXSection({ items }: { items: WhyNpixItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Why It Matters
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why NPIX Matters
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Domestic internet peering creates measurable benefits for networks,
            businesses, and internet users throughout Nepal.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-8 flex flex-col gap-6">
          {chunkIntoRows(items, ROW_SIZE).map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col gap-6 sm:flex-row">
              {row.map((item, i) => {
                const Icon = item.icon;
                // Alternates blue/crimson (the flag palette) per icon so
                // the row doesn't read as one flat tint block.
                const isCrimson = (rowIndex * ROW_SIZE + i) % 2 !== 0;
                return (
                  <StaggerItem key={item.id} className="min-w-0 sm:flex-1">
                    <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          isCrimson ? "bg-accent/10 text-accent" : "bg-primary-solid/10 text-primary-solid",
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
