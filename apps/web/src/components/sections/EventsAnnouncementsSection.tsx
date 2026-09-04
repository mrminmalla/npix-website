import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/cards/NewsCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { chunkIntoRows } from "@/lib/utils";
import type { NewsItem } from "@/types";

const ROW_SIZE = 4;

export function EventsAnnouncementsSection({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-text">
              What&apos;s Happening
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Events &amp; Announcements
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Stay informed about workshops, industry events, peering activities, and
              important updates from Nepal Internet Exchange.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-teal-text"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-8 flex flex-col gap-6">
          {chunkIntoRows(items, ROW_SIZE).map((row, rowIndex) => (
            // lg, not sm: NewsCard carries a banner image and several text
            // rows, so cramming up to 4 of them into a tablet-width row
            // reads worse than stacking — the row layout only kicks in
            // once there's the same width the old 4-column grid already
            // assumed at lg. Below that everything just stacks singly.
            <div key={rowIndex} className="flex flex-col gap-6 lg:flex-row">
              {row.map((item) => (
                <StaggerItem key={item.id} className="min-w-0 lg:flex-1">
                  <NewsCard item={item} />
                </StaggerItem>
              ))}
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
