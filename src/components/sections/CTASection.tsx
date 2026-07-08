import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <div
        className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full bg-secondary/20 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-accent/15 blur-[90px]"
        aria-hidden="true"
      />

      <div className="container-page relative flex flex-col items-center gap-6 text-center">
        <FadeIn>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Join Nepal&apos;s Digital Backbone?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="max-w-xl text-base text-primary-foreground/75">
            Connect with NPIX to reduce latency, lower transit costs, and strengthen your
            network&apos;s resilience.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Button asChild size="lg" variant="accent">
            <Link href="/contact#become-a-member">
              Become a Member
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
