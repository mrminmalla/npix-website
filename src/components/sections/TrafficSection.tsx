import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { GrafanaEmbed } from "@/components/shared/GrafanaEmbed";
import { TRAFFIC_PANELS } from "@/data/traffic-panels";

const DAILY_PANEL = TRAFFIC_PANELS[0];

export function TrafficSection() {
  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Live Traffic
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Internet Exchange Traffic
          </h2>
          <p className="mt-4 text-base text-foreground-secondary">
            Real-time traffic exchanged across Nepal Internet Exchange.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6">
          <GrafanaEmbed
            src={DAILY_PANEL.src}
            title="NPIX daily traffic, last 24 hours"
            className="h-[250px] sm:h-[380px]"
          />

          <div className="mt-6">
            <Button asChild variant="outline">
              <Link href="/statistics">
                View Detailed Statistics
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
