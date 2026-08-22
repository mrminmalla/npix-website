import {
  Megaphone,
  Wrench,
  UserPlus,
  GraduationCap,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { NewsItem, NewsCategory } from "@/types";

// News/event *content* now comes from the CMS (see src/lib/cms/news.ts).
// What stays here is fixed UI/domain configuration: the category list and
// their icon/color mapping, which are part of the design system, not
// editorial content an admin edits.
export const NEWS_CATEGORIES: NewsItem["category"][] = [
  "Announcements",
  "Maintenance",
  "New Members",
  "Workshops",
  "Conferences",
  "Upgrades",
];

export const NEWS_CATEGORY_ICONS: Record<NewsCategory, LucideIcon> = {
  Announcements: Megaphone,
  Maintenance: Wrench,
  "New Members": UserPlus,
  Workshops: GraduationCap,
  Conferences: Users,
  Upgrades: TrendingUp,
};
