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
import { chunkIntoRows } from "@/lib/utils";
import type { NewsItem } from "@/types";
import { NEWS_CATEGORIES } from "@/data/news";

const PAGE_SIZE = 6;
const ROW_SIZE = 3;

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
      <div className="flex flex-col gap-2.5 rounded-md bg-surface p-4 sm:flex-row sm:items-center">
        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder="Search news, events, workshops, and announcements"
          aria-label="Search news"
          className="w-full flex-1"
        />

        {years.length > 1 && (
          <Select
            value={year}
            onValueChange={(value) => {
              setYear(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[150px]" aria-label="Filter by year">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value as NewsItem["category"] | "All");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[170px]" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All categories</SelectItem>
            {NEWS_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            className="flex flex-col gap-6"
          >
            {/* Even a "fixed" PAGE_SIZE doesn't guarantee full rows here —
                the last page of almost any filtered/searched result is a
                partial row, which a fixed grid would leave stranded. lg,
                not sm: NewsCard carries a banner image, same reasoning as
                NewsSection/EventsAnnouncementsSection. */}
            {chunkIntoRows(paged, ROW_SIZE).map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col gap-6 lg:flex-row">
                {row.map((item) => (
                  <StaggerItem key={item.id} className="min-w-0 lg:flex-1">
                    <NewsCard item={item} />
                  </StaggerItem>
                ))}
              </div>
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
