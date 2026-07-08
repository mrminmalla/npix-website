import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocationCard } from "@/components/cards/LocationCard";
import { NepalMap } from "@/components/maps/NepalMapLoader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { LOCATIONS } from "@/data/locations";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Explore NPIX's exchange facility in Kathmandu and planned future expansion to Pokhara, Biratnagar, Butwal, and Nepalgunj.",
  keywords: ["NPIX locations", "Kathmandu Internet Exchange", "Nepal IXP facilities"],
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Locations | NPIX",
    description:
      "Explore NPIX's exchange facility in Kathmandu and planned future expansion across Nepal.",
    url: `${SITE_URL}/locations`,
  },
};

export default function LocationsPage() {
  const active = LOCATIONS.filter((l) => l.status === "active");
  const planned = LOCATIONS.filter((l) => l.status === "planned");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Locations",
              item: `${SITE_URL}/locations`,
            },
          ],
        }}
      />

      <PageHeader
        eyebrow="Where We Operate"
        title="Locations"
        description="NPIX operates from Kathmandu today, with planned expansion to major cities across Nepal."
      />

      <section className="py-20">
        <div className="container-page">
          <FadeIn className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Interactive Nepal Map
            </h2>
            <p className="mt-3 text-base text-foreground-secondary">
              Explore active and planned NPIX exchange facilities across Nepal.
            </p>
          </FadeIn>
          <NepalMap locations={LOCATIONS} />
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-foreground-secondary">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-secondary" aria-hidden="true" />
              Active Facility
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
              Planned Expansion
            </span>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Currently Operational
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Exchange Facilities
            </h2>
          </FadeIn>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((location) => (
              <StaggerItem key={location.id}>
                <LocationCard location={location} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              What&apos;s Next
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Future Expansion
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              NPIX plans to extend its exchange fabric to additional regional hubs,
              improving resilience and reducing latency nationwide.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {planned.map((location) => (
              <StaggerItem key={location.id}>
                <LocationCard location={location} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
