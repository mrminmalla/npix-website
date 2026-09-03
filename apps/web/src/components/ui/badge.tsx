import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-solid text-primary-foreground",
        // White on the shared `--secondary` token (a light sky blue) fails
        // WCAG AA (2.1-2.8:1 depending on theme). Rather than reuse
        // --secondary itself — which also drives focus rings/links
        // elsewhere and would darken those too — this variant gets its
        // own fixed, darker blue (5.93:1 with white, both themes) so it
        // still reads as "blue" and distinct from the navy `default`
        // variant above.
        secondary: "border-transparent bg-[#0369a1] text-white",
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
