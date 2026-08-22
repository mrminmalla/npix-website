import type { DocumentCategoryMeta, DocumentResource, FaqItem } from "@/types";

function bySortOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getDocumentCategories(categories: DocumentCategoryMeta[]) {
  return bySortOrder(categories);
}

export function getDocumentsByCategory(docs: DocumentResource[], categoryId: string) {
  return bySortOrder(docs.filter((doc) => doc.categoryId === categoryId && doc.content));
}

export function getFeaturedDocuments(docs: DocumentResource[], limit?: number) {
  const featured = bySortOrder(docs.filter((doc) => doc.featured));
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getDownloadableDocuments(docs: DocumentResource[]) {
  return bySortOrder(docs.filter((doc) => doc.downloadUrl));
}

export function getAllDocuments(docs: DocumentResource[]) {
  return docs;
}

export function getFaqs(faqs: FaqItem[]) {
  return faqs;
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
