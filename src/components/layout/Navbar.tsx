"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/nav";
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
        <Logo compact />

        <nav aria-label="Primary navigation" className="hidden xl:block">
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
                        ? "text-secondary"
                        : "text-foreground-secondary hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeSwitcher />
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact#become-a-member">Become a Member</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
