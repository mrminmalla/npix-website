import { FadeIn } from "@/components/shared/FadeIn";
import type { TimelineEntry } from "@/types";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      <div
        className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2"
        aria-hidden="true"
      />
      <ol className="space-y-10">
        {entries.map((entry, i) => {
          const isEven = i % 2 === 0;
          return (
            <li key={entry.id} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
              <div
                className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-secondary bg-background sm:left-1/2"
                aria-hidden="true"
              />
              <FadeIn
                className={
                  isEven
                    ? "pl-10 sm:col-start-1 sm:pl-0 sm:pr-12 sm:text-right"
                    : "pl-10 sm:col-start-2 sm:pl-12"
                }
              >
                <p className="text-sm font-semibold text-secondary">{entry.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {entry.description}
                </p>
              </FadeIn>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
