import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-foreground",
        className,
      )}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <circle cx="16" cy="16" r="3.5" className="fill-secondary" />
        <circle cx="7" cy="9" r="2" className="fill-accent" />
        <circle cx="25" cy="9" r="2" className="fill-secondary" />
        <circle cx="7" cy="23" r="2" className="fill-secondary" />
        <circle cx="25" cy="23" r="2" className="fill-accent" />
        <path
          d="M16 16L7 9M16 16L25 9M16 16L7 23M16 16L25 23"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
          className="text-background"
        />
      </svg>
      <span className="whitespace-nowrap">
        NPIX
        {!compact && (
          <span className="hidden text-foreground-secondary font-medium sm:inline">
            {" "}
            | Nepal Internet Exchange
          </span>
        )}
      </span>
    </Link>
  );
}
