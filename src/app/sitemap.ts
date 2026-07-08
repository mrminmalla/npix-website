import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { NEWS_ITEMS } from "@/data/news";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/members",
  "/statistics",
  "/locations",
  "/documentation",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = NEWS_ITEMS.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
