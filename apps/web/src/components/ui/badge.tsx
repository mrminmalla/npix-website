import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-solid text-primary-foreground",
        // `text-secondary-foreground` (white) on `bg-secondary` fails WCAG
        // AA (2.77:1) — `text-primary` (kept deliberately dark, see
        // globals.css) on the same background clears 5.8:1+ in both
        // themes without touching the shared `--secondary` token, which
        // also drives focus rings/links elsewhere.
        secondary: "border-transparent bg-secondary text-primary",
        accent: "border-transparent bg-accent text-accent-foreground",
        success: "border-transparent bg-success text-white",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
