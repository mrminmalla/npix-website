import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeaturedNewsCard } from "@/components/cards/FeaturedNewsCard";
import { NewsDirectory } from "@/components/sections/NewsDirectory";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { NEWS_ITEMS } from "@/data/news";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Stay up to date with NPIX announcements, maintenance notices, new member updates, workshops, conferences, and infrastructure upgrades.",
  keywords: ["NPIX news", "Nepal Internet Exchange events", "IXP announcements Nepal"],
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Events | NPIX",
    description:
      "Stay up to date with NPIX announcements, maintenance notices, workshops, and infrastructure upgrades.",
    url: `${SITE_URL}/news`,
  },
};

export default function NewsPage() {
  const featured = NEWS_ITEMS.find((item) => item.featured) ?? NEWS_ITEMS[0];
  const rest = NEWS_ITEMS.filter((item) => item.id !== featured.id);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "News & Events", item: `${SITE_URL}/news` },
          ],
        }}
      />

      <PageHeader
        eyebrow="Stay Informed"
        title="News & Events"
        description="Announcements, maintenance notices, new member updates, and upcoming events from NPIX."
      />

      <section className="py-12 md:py-16">
        <div className="container-page">
          <FadeIn>
            <FeaturedNewsCard item={featured} />
          </FadeIn>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container-page">
          <NewsDirectory items={rest} />
        </div>
      </section>
    </>
  );
}
