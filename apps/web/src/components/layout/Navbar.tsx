"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/nav";
import { CONTACT_EMAIL } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Logo compact imgClassName="h-10" />

        {/* 5 short links fit comfortably well below the old 1280px (xl)
            cutoff — that was hiding the nav, including Members and
            Statistics, from real laptop/tablet-landscape widths in the
            1024–1279px range with room to spare. */}
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-black hover:text-primary-solid",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute inset-x-2.5 -bottom-1 h-0.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* ThemeSwitcher hidden for now, per explicit request — re-add
              `<ThemeSwitcher />` here if it comes back. Component file
              (components/shared/ThemeSwitcher.tsx) is untouched. */}
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Membership%20Inquiry`}>Join NPIX</a>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
