import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/shared/JsonLd";
import { NEWS_ITEMS } from "@/data/news";
import { SITE_URL } from "@/constants/site";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = NEWS_ITEMS.find((n) => n.slug === slug);
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
  const item = NEWS_ITEMS.find((n) => n.slug === slug);

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

      <article className="py-20 sm:py-28">
        <div className="container-page mx-auto max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to News & Events
          </Link>

          <Badge variant="secondary" className="mt-6 w-fit">
            {item.category}
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {item.title}
          </h1>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-foreground-secondary">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDate(item.date)}
          </div>

          <div className="mt-8 h-56 w-full rounded-xl bg-gradient-to-br from-primary to-secondary/60 sm:h-72" />

          <p className="mt-8 text-lg leading-relaxed text-foreground-secondary">
            {item.content}
          </p>
        </div>
      </article>
    </>
  );
}
