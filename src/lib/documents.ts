import { DOCUMENT_CATEGORIES, DOCUMENTS, FAQ_ITEMS } from "@/data/documentation";
import type { DocumentResource, FaqItem } from "@/types";

function bySortOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getDocumentCategories() {
  return bySortOrder(DOCUMENT_CATEGORIES);
}

export function getDocumentsByCategory(categoryId: string) {
  return bySortOrder(
    DOCUMENTS.filter((doc) => doc.categoryId === categoryId && doc.content),
  );
}

export function getFeaturedDocuments(limit?: number) {
  const featured = bySortOrder(DOCUMENTS.filter((doc) => doc.featured));
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getDownloadableDocuments() {
  return bySortOrder(DOCUMENTS.filter((doc) => doc.downloadUrl));
}

export function getAllDocuments() {
  return DOCUMENTS;
}

export function getFaqs() {
  return FAQ_ITEMS;
}

export function searchDocuments(docs: DocumentResource[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(q) ||
      doc.description.toLowerCase().includes(q) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}

export function searchFaqs(faqs: FaqItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q),
  );
}
