import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { SERVICES } from "@/data/services";

export function ServicesSection() {
  const featured = SERVICES.filter((s) => s.slug !== "technical-consultation");

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              What We Offer
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Services Overview
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              Core infrastructure services that power reliable, low-latency connectivity
              across Nepal.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
          >
            View All Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
