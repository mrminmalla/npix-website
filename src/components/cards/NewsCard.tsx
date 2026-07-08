import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/types";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsCard({ item, className }: { item: NewsItem; className?: string }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary/60">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
          {item.category}
        </span>
      </div>
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
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(item.date)}
          </span>
          <Link
            href={`/news/${item.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-secondary transition-colors hover:text-primary group-hover:gap-2"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
