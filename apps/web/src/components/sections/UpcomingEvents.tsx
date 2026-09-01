import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { chunkIntoRows } from "@/lib/utils";
import type { NewsItem } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const ROW_SIZE = 3;

export function UpcomingEvents({ events }: { events: NewsItem[] }) {
  if (events.length === 0) return null;

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

        <StaggerContainer className="mt-8 flex flex-col gap-6">
          {chunkIntoRows(events, ROW_SIZE).map((row, rowIndex) => (
            // flex-col here too: on mobile every row's cards simply
            // continue the same single-column stack as every other row,
            // at the same gap — indistinguishable from one flat list.
            <div key={rowIndex} className="flex flex-col gap-6 sm:flex-row">
              {row.map((item) => (
                <StaggerItem key={item.id} className="min-w-0 sm:flex-1">
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
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
