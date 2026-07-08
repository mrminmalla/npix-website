import type { Metadata } from "next";
import { Download as DownloadIcon, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/JsonLd";
import { DOC_CATEGORIES, DOWNLOAD_ITEMS, FAQ_ITEMS } from "@/data/documentation";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Access NPIX documentation including membership requirements, technical requirements, connectivity guides, policies, FAQs, and downloadable resources.",
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
      "Access NPIX documentation including membership requirements, technical guides, policies, and downloadable resources.",
    url: `${SITE_URL}/documentation`,
  },
};

export default function DocumentationPage() {
  const nonDownloadCategories = DOC_CATEGORIES.filter(
    (cat) => cat.id !== "downloads" && cat.id !== "faqs",
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <PageHeader
        eyebrow="Resources"
        title="Documentation"
        description="Everything your organization needs to plan, apply for, and connect to the NPIX exchange fabric."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nonDownloadCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <StaggerItem key={cat.id}>
                  <div
                    id={cat.id}
                    className="flex h-full scroll-mt-24 flex-col rounded-xl border border-border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{cat.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                      {cat.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-foreground-secondary"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section id="faqs" className="scroll-mt-24 bg-surface py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-border bg-background px-6">
            <Accordion type="single" collapsible>
              {FAQ_ITEMS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="downloads" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Resources
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Download Center
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {DOWNLOAD_ITEMS.map((item) => (
              <StaggerItem key={item.id}>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-foreground-secondary">
                      {item.fileType} &middot; {item.fileSize}
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <a href={item.href} download>
                      <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                      Download
                    </a>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
