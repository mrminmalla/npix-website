import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { FadeIn } from "@/components/shared/FadeIn";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-28 sm:py-36">
      <HeroBackground />

      <div className="container-page relative">
        <FadeIn>
          <p className="mb-4 inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            Nepal&apos;s Carrier-Neutral Internet Exchange
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Connecting Nepal&apos;s <span className="text-gradient">Digital Ecosystem</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
            NPIX is Nepal&apos;s carrier-neutral Internet Exchange enabling local traffic
            exchange among Internet Service Providers, banks, government organizations,
            educational institutions, and technology companies.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href="/contact#become-a-member">
                Become a Member
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
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
    </section>
  );
}
