import Link from "next/link";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NewsCategoryBanner } from "@/components/cards/NewsCategoryBanner";
import { getReadingTime, cn } from "@/lib/utils";
import type { NewsItem } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsCard({ item, className }: { item: NewsItem; className?: string }) {
  const readingTime = getReadingTime(item.content);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <NewsCategoryBanner category={item.category} size="sm" />
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="secondary" className="w-fit">
          {item.category}
        </Badge>
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground-secondary">
          {item.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-secondary">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(item.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {readingTime} min read
          </span>
        </div>
        {item.location && (
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-foreground-secondary">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {item.location}
          </span>
        )}

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={`/news/${item.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-sky-600 group-hover:gap-2 dark:text-slate-300 dark:hover:text-sky-400"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
