import type { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  className?: string;
  /** Alternates the icon tint between the flag's blue and crimson so a
   *  row of stat cards doesn't read as one flat color block — callers
   *  pass e.g. `index % 2 === 0 ? "blue" : "crimson"`. Defaults to blue. */
  tone?: "blue" | "crimson";
}

export function StatCard({
  label,
  value,
  icon: Icon,
  suffix,
  prefix,
  decimals,
  description,
  className,
  tone = "blue",
}: StatCardProps) {
  const tint = tone === "crimson" ? "bg-accent/10 text-accent" : "bg-primary-solid/10 text-primary-solid";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-100",
          tone === "crimson" ? "bg-accent/10" : "bg-primary-solid/10",
        )}
        aria-hidden="true"
      />
      <div className={cn("relative flex h-10 w-10 items-center justify-center rounded-lg", tint)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <p className="relative mt-3 text-2xl font-bold tracking-tight text-foreground">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <p className="relative mt-1 text-sm text-text-secondary">{label}</p>
      {description && (
        <p className="relative mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-secondary/70">
          {description}
        </p>
      )}
    </div>
  );
}
