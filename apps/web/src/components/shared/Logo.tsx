import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imgClassName,
  compact = false,
  light = false,
}: {
  className?: string;
  imgClassName?: string;
  compact?: boolean;
  /** For placing the logo on a permanently-dark surface (e.g. the navy
   *  footer) regardless of the site's own light/dark theme toggle — the
   *  source PNG is dark-on-transparent, so it needs to be unconditionally
   *  inverted to white there, not just in dark theme (`dark:invert`). */
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-foreground",
        className,
      )}
    >
      {/* width/height are next/image's srcset-generation basis, not the
          source file's native size (2048x1365) — the logo only ever
          renders at 32-40px tall via imgClassName below, so declaring the
          full native size made next/image request up to a 3840px-wide
          retina variant on every Retina/high-DPI display (fine on a
          non-Retina external monitor, which only ever requests the small
          1x size — this is why the bug only showed up on a MacBook's
          Retina screen). 200x133 keeps the same ~3:2 aspect ratio while
          giving 2-3x headroom over the largest actual display size. */}
      <Image
        src="/npix_black.png"
        alt="NPIX"
        width={200}
        height={133}
        priority
        className={cn("h-8 w-auto", light ? "invert" : "dark:invert", imgClassName)}
      />
      {!compact && (
        <span
          className={cn(
            "hidden whitespace-nowrap font-medium sm:inline",
            light ? "text-white/70" : "text-foreground-secondary",
          )}
        >
          Nepal Internet Exchange
        </span>
      )}
    </Link>
  );
}
