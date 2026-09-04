import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { getAllNews } from "@/lib/cms/news";

const STATIC_ROUTES = [
  "",
  "/about",
  "/members",
  "/statistics",
  "/documentation",
  "/news",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const newsItems = await getAllNews();
  const newsEntries: MetadataRoute.Sitemap = newsItems.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
