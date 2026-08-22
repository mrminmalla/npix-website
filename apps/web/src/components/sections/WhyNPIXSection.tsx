import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { WHY_NPIX } from "@/data/why-npix";

export function WhyNPIXSection() {
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
          <p className="mt-4 text-base text-foreground-secondary">
            Domestic internet peering creates measurable benefits for networks,
            businesses, and internet users throughout Nepal.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_NPIX.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.id}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
