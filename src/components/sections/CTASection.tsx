import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { CONTACT_EMAIL } from "@/constants/site";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 md:py-16">
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
            Connect with NPIX to reduce latency, improve network resilience, and become
            part of Nepal&apos;s growing interconnected digital community.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col gap-4 sm:flex-row">
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
              <a href={`mailto:${CONTACT_EMAIL}`}>Contact Us</a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
