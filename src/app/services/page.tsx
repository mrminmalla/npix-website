import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/JsonLd";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore NPIX services including public peering, route server services, IPv6 support, domestic interconnection, and technical consultation.",
  keywords: [
    "NPIX services",
    "public peering",
    "route server Nepal",
    "IPv6 Nepal",
    "domestic interconnection",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | NPIX",
    description:
      "Explore NPIX services including public peering, route server services, IPv6 support, and domestic interconnection.",
    url: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          provider: { "@type": "Organization", name: "NPIX" },
          serviceType: SERVICES.map((s) => s.title),
        }}
      />

      <PageHeader
        eyebrow="What We Offer"
        title="Services"
        description="Core infrastructure services designed to keep Nepal's networks fast, resilient, and interconnected."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Not sure which service fits your network?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-foreground-secondary">
              Our technical team can help you plan connectivity, BGP configuration, and
              peering strategy tailored to your organization.
            </p>
          </FadeIn>
          <Button asChild size="lg">
            <Link href="/contact">
              Talk to Our Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
