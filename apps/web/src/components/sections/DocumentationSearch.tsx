"use client";

import * as React from "react";
import { FileText, HelpCircle, ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/shared/SearchBar";
import { DocumentModal } from "@/components/shared/DocumentModal";
import {
  getAllDocuments,
  getFaqs,
  searchDocuments,
  searchFaqs,
} from "@/lib/documents";
import type { DocumentResource } from "@/types";

const DOCUMENTS = getAllDocuments();
const FAQS = getFaqs();
const MAX_DOC_RESULTS = 5;
const MAX_FAQ_RESULTS = 4;

export function DocumentationSearch() {
  const [query, setQuery] = React.useState("");
  const [activeDocument, setActiveDocument] = React.useState<DocumentResource | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isOpen = query.trim().length > 0;
  const matchedDocs = isOpen ? searchDocuments(DOCUMENTS, query).slice(0, MAX_DOC_RESULTS) : [];
  const matchedFaqs = isOpen ? searchFaqs(FAQS, query).slice(0, MAX_FAQ_RESULTS) : [];
  const hasResults = matchedDocs.length > 0 || matchedFaqs.length > 0;

  React.useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative lg:sticky lg:top-20 lg:z-30">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search documentation, guides, policies, FAQs, and downloads..."
        aria-label="Search documentation"
        className="mx-auto max-w-2xl"
      />

      {isOpen && (
        <div className="mx-auto mt-2 max-w-2xl overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          {!hasResults ? (
            <p className="px-5 py-6 text-center text-sm text-foreground-secondary">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto">
              {matchedDocs.length > 0 && (
                <div className="py-2">
                  <p className="px-5 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
                    Documents
                  </p>
                  {matchedDocs.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => {
                        setActiveDocument(doc);
                        setQuery("");
                      }}
                      className="flex w-full items-start gap-3 px-5 py-2.5 text-left transition-colors hover:bg-surface"
                    >
                      <FileText
                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {doc.title}
                        </span>
                        <span className="block truncate text-xs text-foreground-secondary">
                          {doc.description}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {matchedFaqs.length > 0 && (
                <div className="border-t border-border py-2">
                  <p className="px-5 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
                    FAQs
                  </p>
                  {matchedFaqs.map((faq) => (
                    <a
                      key={faq.id}
                      href="#faqs"
                      onClick={() => setQuery("")}
                      className="flex items-start gap-3 px-5 py-2.5 text-left transition-colors hover:bg-surface"
                    >
                      <HelpCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                        {faq.question}
                      </span>
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-foreground-secondary/60"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <DocumentModal
        document={activeDocument}
        onOpenChange={(open) => {
          if (!open) setActiveDocument(null);
        }}
      />
    </div>
  );
}
