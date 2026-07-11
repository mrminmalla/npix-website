import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { NEWS_ITEMS } from "@/data/news";
import { SITE_CURRENT_DATE } from "@/constants/site";
import type { NewsItem } from "@/types";

const EVENT_CATEGORIES: NewsItem["category"][] = ["Workshops", "Conferences"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function UpcomingEvents() {
  const now = new Date(SITE_CURRENT_DATE);
  const upcoming = NEWS_ITEMS.filter(
    (item) => EVENT_CATEGORIES.includes(item.category) && new Date(item.date) >= now,
  )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  if (upcoming.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Mark Your Calendar
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <StaggerItem key={item.id}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {formatDate(item.date)}
                </p>
                {item.location && (
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-foreground-secondary">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.location}
                  </span>
                )}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-secondary">
                  {item.summary}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-primary"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
