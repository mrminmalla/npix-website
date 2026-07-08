import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/cards/NewsCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { NEWS_ITEMS } from "@/data/news";

export function NewsSection() {
  const latest = NEWS_ITEMS.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Stay Updated
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest News
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
          >
            View All News
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
