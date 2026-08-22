"use client";

import * as React from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { NewsCard } from "@/components/cards/NewsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/types";
import { NEWS_CATEGORIES } from "@/data/news";

const PAGE_SIZE = 6;

export function NewsDirectory({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<NewsItem["category"] | "All">("All");
  const [year, setYear] = React.useState("All");
  const [page, setPage] = React.useState(1);

  const years = React.useMemo(() => {
    const distinct = new Set(items.map((item) => item.date.slice(0, 4)));
    return [...distinct].sort((a, b) => b.localeCompare(a));
  }, [items]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((item) => {
        const matchesQuery =
          q === "" ||
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q);
        const matchesCategory = category === "All" || item.category === category;
        const matchesYear = year === "All" || item.date.startsWith(year);
        return matchesQuery && matchesCategory && matchesYear;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [items, query, category, year]);

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
          placeholder="Search news, events, workshops, and announcements..."
          aria-label="Search news"
          className="w-full lg:w-[360px]"
        />

        {years.length > 1 && (
          <Select
            value={year}
            onValueChange={(value) => {
              setYear(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-36" aria-label="Filter by year">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={category === "All"}
          onClick={() => {
            setCategory("All");
            setPage(1);
          }}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            category === "All"
              ? "border-secondary bg-secondary text-secondary-foreground"
              : "border-border text-foreground-secondary hover:border-secondary hover:text-secondary",
          )}
        >
          All
        </button>
        {NEWS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === cat
                ? "border-secondary bg-secondary text-secondary-foreground"
                : "border-border text-foreground-secondary hover:border-secondary hover:text-secondary",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title="No articles found"
            description="Try adjusting your search or category filter."
          />
        ) : (
          <StaggerContainer
            key={`${category}-${year}-${query}-${page}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {paged.map((item) => (
              <StaggerItem key={item.id}>
                <NewsCard item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {filtered.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className="mt-8"
        />
      )}
    </div>
  );
}
