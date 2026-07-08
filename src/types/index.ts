import type { LucideIcon } from "lucide-react";

export type MemberCategory =
  | "ISP"
  | "Bank"
  | "Government"
  | "Education"
  | "Technology";

export interface Member {
  id: string;
  name: string;
  logo: string;
  category: MemberCategory;
  asn: string;
  website: string;
  ipv6Support: boolean;
  memberSince: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
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

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  href: string;
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
