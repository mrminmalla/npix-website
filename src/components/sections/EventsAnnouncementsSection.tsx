import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/cards/NewsCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { NEWS_ITEMS } from "@/data/news";
import type { NewsCategory } from "@/types";

const EVENT_CATEGORIES: NewsCategory[] = ["Announcements", "Workshops", "Conferences"];

export function EventsAnnouncementsSection() {
  const latest = NEWS_ITEMS.filter((item) => EVENT_CATEGORIES.includes(item.category))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              What&apos;s Happening
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Events &amp; Announcements
            </h2>
            <p className="mt-4 text-base text-foreground-secondary">
              Stay informed about workshops, industry events, peering activities, and
              important updates from Nepal Internet Exchange.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((item) => (
            <StaggerItem key={item.id}>
              <NewsCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
