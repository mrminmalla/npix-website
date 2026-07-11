import type { LucideIcon } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  asn: string;
  website: string;
  ipAddress: string;
  ipv6Address?: string;
  datahub: string;
  datahubIpv6?: string;
  category: "regular" | "special";
  logo?: string;
}

export type NewsCategory =
  | "Announcements"
  | "Maintenance"
  | "New Members"
  | "Workshops"
  | "Conferences"
  | "Upgrades";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: NewsCategory;
  featured?: boolean;
  image: string;
}

export interface ExchangeLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  capacity: string;
  status: "active" | "planned";
  contactEmail: string;
  contactPhone: string;
  lat: number;
  lng: number;
}

export interface StatDatum {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  decimals?: number;
  description?: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language?: string; code: string }
  | { type: "link"; href: string; label: string; download?: boolean };

export interface DocumentCategoryMeta {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  sortOrder: number;
}

export interface DocumentResource {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  tags: string[];
  fileType: string;
  fileSize?: string;
  version?: string;
  publishDate: string;
  updatedDate: string;
  downloadUrl?: string;
  previewUrl?: string;
  featured?: boolean;
  sortOrder: number;
  content?: ContentBlock[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TrafficDatum {
  label: string;
  ipv4: number;
  ipv6: number;
}

export interface MemberGrowthDatum {
  label: string;
  members: number;
  asns: number;
}

export interface WhyNpixItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}
