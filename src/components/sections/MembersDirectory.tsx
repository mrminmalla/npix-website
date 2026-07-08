"use client";

import * as React from "react";
import { LayoutGrid, List } from "lucide-react";
import { SearchBar } from "@/components/shared/SearchBar";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { MemberCard } from "@/components/cards/MemberCard";
import { MemberTable } from "@/components/tables/MemberTable";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";
import type { Member, MemberCategory } from "@/types";
import { MEMBER_CATEGORIES } from "@/data/members";

const PAGE_SIZE = 9;

export function MembersDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = React.useState("");
  const [activeCategories, setActiveCategories] = React.useState<MemberCategory[]>([]);
  const [view, setView] = React.useState<"grid" | "table">("grid");
  const [page, setPage] = React.useState(1);

  function toggleCategory(category: MemberCategory) {
    setPage(1);
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery =
        q === "" ||
        member.name.toLowerCase().includes(q) ||
        member.asn.toLowerCase().includes(q);
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(member.category);
      return matchesQuery && matchesCategory;
    });
  }, [members, query, activeCategories]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder="Search by company name or ASN..."
          aria-label="Search members"
          className="w-full sm:max-w-sm"
        />

        <div className="flex items-center gap-1 rounded-full border border-border p-1">
          <Button
            type="button"
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className="rounded-full"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            Grid
          </Button>
          <Button
            type="button"
            variant={view === "table" ? "default" : "ghost"}
            size="sm"
            aria-pressed={view === "table"}
            onClick={() => setView("table")}
            className="rounded-full"
          >
            <List className="h-4 w-4" aria-hidden="true" />
            Table
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {MEMBER_CATEGORIES.map((cat) => {
          const active = activeCategories.includes(cat.value);
          return (
            <button
              key={cat.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggleCategory(cat.value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border text-foreground-secondary hover:border-secondary hover:text-secondary",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-foreground-secondary">
        Showing {filtered.length} of {members.length} members
      </p>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            title="No members found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        ) : view === "grid" ? (
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((member) => (
              <StaggerItem key={member.id}>
                <MemberCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <MemberTable members={paged} />
        )}
      </div>

      {filtered.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className="mt-10"
        />
      )}
    </div>
  );
}
