import { MapPin } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { POINTS_OF_PRESENCE } from "@/data/stats";

export function PointsOfPresenceSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Facilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Points of Presence
          </h2>
          <p className="mt-4 text-base text-foreground-secondary">
            NPIX currently operates two active interconnection facilities.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {POINTS_OF_PRESENCE.map((pop) => (
            <StaggerItem key={pop.id}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{pop.name}</h3>
                    <p className="text-xs text-foreground-secondary">{pop.city}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                  {pop.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
