"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/FadeIn";
import { DocumentModal } from "@/components/shared/DocumentModal";
import { getDocumentCategories, getDocumentsByCategory } from "@/lib/documents";
import type { DocumentResource } from "@/types";

const CATEGORIES = getDocumentCategories();

export function DocumentCategoryList() {
  const [activeDocument, setActiveDocument] = React.useState<DocumentResource | null>(null);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        defaultValue={CATEGORIES[0]?.id}
        className="flex flex-col gap-5"
      >
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          const items = getDocumentsByCategory(category.id);
          return (
            <FadeIn key={category.id} delay={index * 0.05}>
              <div
                id={category.id}
                className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <AccordionItem value={category.id} className="border-b-0">
                  <AccordionTrigger className="gap-4 px-5 py-5 hover:no-underline sm:px-7">
                    <div className="flex flex-1 items-center gap-4 text-left">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-foreground sm:text-lg">
                          {category.title}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-sm font-normal text-foreground-secondary sm:line-clamp-none">
                          {category.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="hidden shrink-0 sm:inline-flex">
                        {items.length} documents
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-7">
                    <div className="grid grid-cols-1 gap-1 border-t border-border pt-4 sm:grid-cols-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveDocument(item)}
                          className="group/item flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground"
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                              aria-hidden="true"
                            />
                            {item.title}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-foreground-secondary/60 transition-transform group-hover/item:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            </FadeIn>
          );
        })}
      </Accordion>

      <DocumentModal
        document={activeDocument}
        onOpenChange={(open) => {
          if (!open) setActiveDocument(null);
        }}
      />
    </>
  );
}
