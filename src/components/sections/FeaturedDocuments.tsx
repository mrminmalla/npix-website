"use client";

import * as React from "react";
import { Eye, Download as DownloadIcon, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { DocumentModal } from "@/components/shared/DocumentModal";
import { getFeaturedDocuments } from "@/lib/documents";
import type { DocumentResource } from "@/types";

const FEATURED = getFeaturedDocuments();

function formatMonthYear(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function FeaturedDocuments() {
  const [activeDocument, setActiveDocument] = React.useState<DocumentResource | null>(null);

  if (FEATURED.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Start Here
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Documents
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((doc) => (
            <StaggerItem key={doc.id}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge variant="outline">{doc.fileType}</Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{doc.title}</h3>
                <p className="mt-1 text-xs text-foreground-secondary">
                  Version {doc.version} &middot; Updated {formatMonthYear(doc.updatedDate)}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-secondary">
                  {doc.description}
                </p>
                <div className="mt-5 flex items-center gap-2">
                  {doc.content && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setActiveDocument(doc)}
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Preview
                    </Button>
                  )}
                  {doc.downloadUrl && (
                    <Button asChild size="sm" variant="accent" className="flex-1">
                      <a href={doc.downloadUrl} download>
                        <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                        Download
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <DocumentModal
        document={activeDocument}
        onOpenChange={(open) => {
          if (!open) setActiveDocument(null);
        }}
      />
    </section>
  );
}
