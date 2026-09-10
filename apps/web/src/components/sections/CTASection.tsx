import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { CONTACT_EMAIL } from "@/constants/site";

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background:
          "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-deep) 55%, var(--color-coral) 130%)",
      }}
    >
      <div className="container-page relative flex flex-col items-center gap-6 text-center">
        <FadeIn>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Join Nepal&apos;s Digital Backbone?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="max-w-xl text-base text-white/75">
            Connect with NPIX to reduce latency, improve network resilience, and become
            part of Nepal&apos;s growing interconnected digital community.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* White fill with navy text (16.9:1) — matches the redesign
                spec exactly rather than reusing the coral accent variant,
                whose navy-on-coral text would blend into this gradient's
                own coral edge. */}
            <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90">
              <a href={`mailto:${CONTACT_EMAIL}?subject=Membership%20Inquiry`}>
                Join NPIX
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <a href={`mailto:${CONTACT_EMAIL}`}>Contact Us</a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
