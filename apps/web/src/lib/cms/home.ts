import type { Member, NewsItem, StatDatum, WhyNpixItem } from "@/types";
import type { TrafficPanel } from "@/data/traffic-panels";
import { cmsFetch } from "./config";
import { resolveIcon } from "./icons";
import { ApiMember, toMember } from "./members";
import { ApiNewsEvent, toNewsItem } from "./news";
import { ApiStatCard, toStatDatum } from "./stat-cards";
import { ApiTrafficPanel, toTrafficPanel } from "./traffic-panels";

interface ApiWhyNpixItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface ApiHomeResponse {
  stats: ApiStatCard[];
  whyNpix: ApiWhyNpixItem[];
  trafficPanel: ApiTrafficPanel | null;
  memberShowcase: ApiMember[];
  eventsAnnouncements: ApiNewsEvent[];
  news: ApiNewsEvent[];
}

export interface HomeData {
  stats: StatDatum[];
  whyNpix: WhyNpixItem[];
  trafficPanel: TrafficPanel | null;
  memberShowcase: Member[];
  eventsAnnouncements: NewsItem[];
  news: NewsItem[];
}

function toWhyNpixItem(item: ApiWhyNpixItem): WhyNpixItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    icon: resolveIcon(item.iconName),
  };
}

export async function getHomeData(): Promise<HomeData> {
  const data = await cmsFetch<ApiHomeResponse>("/api/v1/home");
  return {
    stats: data.stats.map(toStatDatum),
    whyNpix: data.whyNpix.map(toWhyNpixItem),
    trafficPanel: data.trafficPanel ? toTrafficPanel(data.trafficPanel) : null,
    memberShowcase: data.memberShowcase.map(toMember),
    eventsAnnouncements: data.eventsAnnouncements.map(toNewsItem),
    news: data.news.map(toNewsItem),
  };
}
