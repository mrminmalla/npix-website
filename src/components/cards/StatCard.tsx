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
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  suffix,
  prefix,
  decimals,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/10 blur-2xl transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="relative mt-4 text-3xl font-bold tracking-tight text-foreground">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <p className="relative mt-1 text-sm text-foreground-secondary">{label}</p>
    </div>
  );
}
