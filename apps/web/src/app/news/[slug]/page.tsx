import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/shared/JsonLd";
import { getAllNews, getNewsBySlug } from "@/lib/cms/news";
import { SITE_URL } from "@/constants/site";

export const revalidate = 60;
// New articles published after the last build still render on-demand
// (default Next.js behavior) even though generateStaticParams below only
// knows about slugs that existed at build time.
export const dynamicParams = true;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `${SITE_URL}/news/${item.slug}`,
      type: "article",
      publishedTime: item.date,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: item.title,
          datePublished: item.date,
          description: item.summary,
          articleSection: item.category,
          publisher: { "@type": "Organization", name: "NPIX" },
        }}
      />

      <article className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-sky-600 dark:hover:text-sky-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to News & Events
            </Link>

            <Badge variant="secondary" className="w-fit">
              {item.category}
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {item.title}
          </h1>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-foreground">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDate(item.date)}
          </div>

          <div className="mt-8 h-56 w-full rounded-xl bg-gradient-to-br from-primary-solid to-secondary/60 sm:h-72" />

          <p className="mt-8 text-lg leading-relaxed text-text-secondary">
            {item.content}
          </p>
        </div>
      </article>
    </>
  );
}
