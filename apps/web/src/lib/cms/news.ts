import type { NewsCategory, NewsItem } from "@/types";
import { cmsFetch, CmsFetchError } from "./config";

// Prisma's @map on an enum value renames the *database* label, not the
// JS-facing one — so `NewsCategory.NewMembers` (@map("New Members")) comes
// back over the wire as the literal string "NewMembers", not "New Members".
// Every other category's code name and display value happen to be
// identical, so this is the one translation needed to match the frontend's
// fixed NewsCategory union (and the NEWS_CATEGORY_ICONS map keyed on it).
const CATEGORY_FROM_API: Record<string, NewsCategory> = {
  Announcements: "Announcements",
  Maintenance: "Maintenance",
  NewMembers: "New Members",
  Workshops: "Workshops",
  Conferences: "Conferences",
  Upgrades: "Upgrades",
};

export interface ApiNewsEvent {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  location: string | null;
  isFeatured: boolean;
  publishedAt: string;
}

interface ApiNewsListResponse {
  items: ApiNewsEvent[];
  total: number;
}

export function toNewsItem(item: ApiNewsEvent): NewsItem {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    date: item.publishedAt,
    summary: item.summary,
    content: item.content,
    category: CATEGORY_FROM_API[item.category] ?? (item.category as NewsCategory),
    featured: item.isFeatured,
    location: item.location ?? undefined,
  };
}

/** The News & Events list page fetches everything and paginates/filters
 *  client-side (NewsDirectory), exactly like the legacy static-array
 *  version did — so we ask the API for the full published list in one go. */
export async function getAllNews(): Promise<NewsItem[]> {
  const { items } = await cmsFetch<ApiNewsListResponse>("/api/v1/news?pageSize=200");
  return items.map(toNewsItem);
}

export async function getUpcomingEvents(): Promise<NewsItem[]> {
  const items = await cmsFetch<ApiNewsEvent[]>("/api/v1/news/upcoming-events");
  return items.map(toNewsItem);
}

export async function getFeaturedNews(): Promise<NewsItem> {
  const item = await cmsFetch<ApiNewsEvent>("/api/v1/news/featured");
  return toNewsItem(item);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const item = await cmsFetch<ApiNewsEvent>(`/api/v1/news/${slug}`);
    return toNewsItem(item);
  } catch (err) {
    if (err instanceof CmsFetchError && err.status === 404) return null;
    throw err;
  }
}
