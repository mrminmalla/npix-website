import Link from "next/link";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsCategoryBanner } from "@/components/cards/NewsCategoryBanner";
import { getReadingTime } from "@/lib/utils";
import type { NewsItem } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function FeaturedNewsCard({ item }: { item: NewsItem }) {
  const readingTime = getReadingTime(item.content);

  return (
    // rounded-xl, matching NewsCard/StatCard — this is the largest, most
    // prominent card on the page; it was previously the one exception
    // using a *smaller* radius (rounded-2xl) than the ordinary grid cards.
    <article className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm lg:grid-cols-2">
      <NewsCategoryBanner category={item.category} size="lg" />
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <Badge variant="accent" className="w-fit">
          {item.category}
        </Badge>
        {/* text-3xl/text-4xl matches the site's normal H2 convention
            (about/statistics/documentation section headings) — this is
            the single most prominent element on its page, so it
            shouldn't be a smaller type step than an ordinary section
            heading. */}
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {item.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
          {item.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground-secondary">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDate(item.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {readingTime} min read
          </span>
          {item.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {item.location}
            </span>
          )}
        </div>

        <div className="mt-6">
          <Button asChild size="sm">
            <Link href={`/news/${item.slug}`}>
              Read More
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
