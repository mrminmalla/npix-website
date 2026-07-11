"use client";

import * as React from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/shared/FadeIn";

export function NewsletterSection() {
  const [submitted, setSubmitted] = React.useState(false);

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
            Stay Updated with NPIX
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="max-w-xl text-base text-primary-foreground/75">
            Receive announcements, maintenance notices, event updates, and community news
            from Nepal Internet Exchange.
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="w-full max-w-md">
          {submitted ? (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground">
              <CheckCircle2 className="h-5 w-5 text-secondary" aria-hidden="true" />
              Thanks — we&apos;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="you@organization.com"
                aria-label="Email address"
                className="flex-1"
              />
              <Button type="submit" variant="accent" className="shrink-0">
                <Send className="h-4 w-4" aria-hidden="true" />
                Subscribe
              </Button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
