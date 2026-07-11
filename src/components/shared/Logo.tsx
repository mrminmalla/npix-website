import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imgClassName,
  compact = false,
}: {
  className?: string;
  imgClassName?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-foreground",
        className,
      )}
    >
      <Image
        src="/npix_black.png"
        alt="NPIX"
        width={2048}
        height={1365}
        priority
        className={cn("h-8 w-auto dark:invert", imgClassName)}
      />
      {!compact && (
        <span className="hidden whitespace-nowrap text-foreground-secondary font-medium sm:inline">
          Nepal Internet Exchange
        </span>
      )}
    </Link>
  );
}
