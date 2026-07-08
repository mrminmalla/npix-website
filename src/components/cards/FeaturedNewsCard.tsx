import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function FeaturedNewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:grid-cols-2">
      <div className="relative flex min-h-[220px] items-center justify-center bg-gradient-to-br from-primary to-secondary/70 p-8">
        <span className="text-center text-lg font-semibold uppercase tracking-widest text-primary-foreground/85">
          Featured Article
        </span>
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <Badge variant="accent" className="w-fit">
          {item.category}
        </Badge>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {item.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
          {item.summary}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDate(item.date)}
          </span>
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
