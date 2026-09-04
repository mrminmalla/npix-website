import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { HeroNepalMap } from "@/components/sections/HeroNepalMap";
import { FadeIn } from "@/components/shared/FadeIn";
import { CONTACT_EMAIL } from "@/constants/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-solid py-16 md:py-20">
      <HeroBackground />

      {/* lg:grid-cols-[1.1fr_1fr]: text keeps a slight edge over the map
          rather than a strict 50/50 split, matching how much content each
          side actually holds. Map hidden below lg — it's detailed enough
          that shrinking it to phone/tablet width makes city labels
          illegible, so the Hero just stays text-only until there's room. */}
      <div className="container-page relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <FadeIn delay={0.04}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">
              Nepal&apos;s Internet Exchange
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Connecting Nepal&apos;s <span className="text-coral">Digital Ecosystem</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
              Nepal Internet Exchange (NPIX) provides a neutral platform where Internet
              Service Providers, content providers, financial institutions, government
              organizations, academic networks, and enterprises exchange internet traffic
              locally, delivering faster, more resilient, and cost-effective connectivity
              across Nepal.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <a href={`mailto:${CONTACT_EMAIL}?subject=Membership%20Inquiry`}>
                  Join NPIX
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/statistics">
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                  View Statistics
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="hidden justify-center lg:flex">
          <HeroNepalMap />
        </FadeIn>
      </div>
    </section>
  );
}
