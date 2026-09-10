"use client";

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

  return (
    <header className="sticky top-0 z-50 w-full bg-primary-solid shadow-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* light: forces the mark to white regardless of theme (this bar
            is always the brand navy). compact: logo mark only, no
            wordmark/subtitle text next to it. */}
        <Logo light compact imgClassName="h-9" />

        {/* 5 short links fit comfortably well below the old 1280px (xl)
            cutoff — that was hiding the nav, including Members and
            Statistics, from real laptop/tablet-landscape widths in the
            1024–1279px range with room to spare. Links + the CTA now
            live together inside one floating white pill. */}
        <div className="hidden items-center gap-1 rounded-full bg-white py-1.5 pr-1.5 pl-2 shadow-lg lg:flex">
          <nav aria-label="Primary navigation">
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
                        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-black/5 text-coral-text"
                          : "text-slate-900 hover:bg-black/5",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* White text on coral is an explicit ask for this specific
              button (bold + small, so it clears the 3:1 UI-component
              threshold at 3.81:1 even though it falls under the 4.5:1
              normal-text one) — everywhere else accent buttons use navy
              text for full AA compliance; this one instance overrides
              that on purpose. */}
          <Button
            asChild
            size="sm"
            variant="accent"
            className="ml-1 font-bold text-white shadow-none hover:opacity-90"
          >
            <a href={`mailto:${CONTACT_EMAIL}?subject=Membership%20Inquiry`}>Join NPIX</a>
          </Button>
        </div>

        <div className="flex shrink-0 items-center lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
