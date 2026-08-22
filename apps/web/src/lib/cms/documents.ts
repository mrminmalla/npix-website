import type { ContentBlock, DocumentCategoryMeta, DocumentResource, FaqItem } from "@/types";
import { cmsFetch } from "./config";

interface ApiDocumentCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  sortOrder: number;
}

interface ApiDocument {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  tags: string[];
  fileType: string;
  fileSize: string | null;
  version: string | null;
  publishDate: string;
  updatedDate: string;
  fileAsset: { url: string } | null;
  previewAsset: { url: string } | null;
  content: ContentBlock[] | null;
  isFeatured: boolean;
  sortOrder: number;
}

interface ApiFaq {
  id: string;
  question: string;
  answer: string;
}

export interface DocumentsData {
  documents: DocumentResource[];
  categories: DocumentCategoryMeta[];
  faqs: FaqItem[];
}

function toCategory(cat: ApiDocumentCategory): DocumentCategoryMeta {
  return {
    id: cat.id,
    title: cat.title,
    description: cat.description,
    iconName: cat.iconName,
    sortOrder: cat.sortOrder,
  };
}

function toDocument(doc: ApiDocument): DocumentResource {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    categoryId: doc.categoryId,
    tags: doc.tags,
    fileType: doc.fileType,
    fileSize: doc.fileSize ?? undefined,
    version: doc.version ?? undefined,
    publishDate: doc.publishDate,
    updatedDate: doc.updatedDate,
    downloadUrl: doc.fileAsset?.url,
    previewUrl: doc.previewAsset?.url,
    featured: doc.isFeatured,
    sortOrder: doc.sortOrder,
    content: doc.content ?? undefined,
  };
}

function toFaq(faq: ApiFaq): FaqItem {
  return { id: faq.id, question: faq.question, answer: faq.answer };
}

export async function getDocumentsData(): Promise<DocumentsData> {
  const [documents, categories, faqs] = await Promise.all([
    cmsFetch<ApiDocument[]>("/api/v1/documents"),
    cmsFetch<ApiDocumentCategory[]>("/api/v1/documents/categories"),
    cmsFetch<ApiFaq[]>("/api/v1/faqs"),
  ]);
  return {
    documents: documents.map(toDocument),
    categories: categories.map(toCategory),
    faqs: faqs.map(toFaq),
  };
}
