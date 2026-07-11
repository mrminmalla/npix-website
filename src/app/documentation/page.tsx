import type { Metadata } from "next";
import {
  Eye,
  Download as DownloadIcon,
  FileText,
  FileType2,
  File as FileIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/JsonLd";
import { DocumentationSearch } from "@/components/sections/DocumentationSearch";
import { FeaturedDocuments } from "@/components/sections/FeaturedDocuments";
import { DocumentCategoryList } from "@/components/sections/DocumentCategoryList";
import { QuickActions } from "@/components/sections/QuickActions";
import { getDownloadableDocuments, getFaqs } from "@/lib/documents";
import { SITE_URL } from "@/constants/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Everything you need to join, peer, and connect with Nepal Internet Exchange. Explore guides, technical requirements, policies, and downloadable resources.",
  keywords: [
    "NPIX documentation",
    "membership requirements",
    "technical requirements",
    "peering policy Nepal",
  ],
  alternates: { canonical: "/documentation" },
  openGraph: {
    title: "Documentation | NPIX",
    description:
      "Everything you need to join, peer, and connect with Nepal Internet Exchange.",
    url: `${SITE_URL}/documentation`,
  },
};

const FAQS = getFaqs();
const DOWNLOADS = getDownloadableDocuments();

function formatMonthYear(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getFileTypeIcon(fileType: string) {
  const type = fileType.toLowerCase();
  if (type === "pdf") return FileText;
  if (type === "docx" || type === "doc") return FileType2;
  return FileIcon;
}

export default function DocumentationPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <PageHeader
        eyebrow="Resources"
        title="Documentation & Resources"
        description="Everything you need to join, peer, and connect with Nepal Internet Exchange. Explore guides, technical requirements, policies, and downloadable resources."
      />

      <section className="py-8 md:py-10">
        <div className="container-page">
          <DocumentationSearch />
        </div>
      </section>

      <FeaturedDocuments />

      <section className="py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Browse By Topic
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Documentation Categories
            </h2>
          </FadeIn>

          <div className="mt-8">
            <DocumentCategoryList />
          </div>
        </div>
      </section>

      <QuickActions />

      <section id="faqs" className="scroll-mt-24 py-10 md:py-12">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <div className="mt-6">
            <Accordion type="single" collapsible>
              {FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="downloads" className="scroll-mt-24 bg-surface py-12 md:py-16">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Resources
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Download Center
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-8 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            {DOWNLOADS.map((item, index) => {
              const Icon = getFileTypeIcon(item.fileType);
              return (
                <StaggerItem key={item.id}>
                  <div
                    className={cn(
                      "flex flex-wrap items-start gap-4 p-4 transition-colors hover:bg-surface/60 sm:p-5 lg:flex-nowrap lg:items-center",
                      index !== DOWNLOADS.length - 1 && "border-b border-border",
                    )}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-foreground-secondary">
                        {item.description}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-foreground-secondary/70">
                        <Badge variant="outline">{item.fileType}</Badge>
                        <span>{item.fileSize}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>Version {item.version}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>Updated {formatMonthYear(item.updatedDate)}</span>
                      </div>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 lg:w-auto">
                      <Button asChild size="sm" variant="outline" className="flex-1 lg:flex-none">
                        <a
                          href={item.previewUrl ?? item.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" />
                          Preview
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="accent" className="flex-1 lg:flex-none">
                        <a href={item.downloadUrl} download>
                          <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
