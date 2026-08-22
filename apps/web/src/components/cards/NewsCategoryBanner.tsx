import { NEWS_CATEGORY_ICONS } from "@/data/news";
import type { NewsCategory } from "@/types";
import { cn } from "@/lib/utils";

export function NewsCategoryBanner({
  category,
  size = "sm",
  className,
}: {
  category: NewsCategory;
  size?: "sm" | "lg";
  className?: string;
}) {
  const Icon = NEWS_CATEGORY_ICONS[category];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary/70",
        size === "sm" ? "h-40" : "min-h-[220px]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.15]" aria-hidden="true" />
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-primary-foreground/10 backdrop-blur-sm",
          size === "sm" ? "h-16 w-16" : "h-24 w-24",
        )}
      >
        <Icon
          className={cn("text-primary-foreground/90", size === "sm" ? "h-8 w-8" : "h-12 w-12")}
          aria-hidden="true"
        />
      </div>
      <span
        className={cn(
          "absolute bottom-3 right-4 font-bold uppercase tracking-widest text-primary-foreground/25",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        NPIX
      </span>
    </div>
  );
}
