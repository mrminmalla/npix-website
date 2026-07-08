import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-6 shadow-sm", className)}>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-foreground-secondary">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}
