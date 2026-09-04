import type { PointOfPresence, StatDatum } from "@/types";
import type { TrafficPanel } from "@/data/traffic-panels";
import { cmsFetch } from "./config";
import { ApiStatCard, toStatDatum } from "./stat-cards";
import { ApiTrafficPanel, toTrafficPanel } from "./traffic-panels";

interface ApiProtocolAdoption {
  ipv4SharePercent: number;
  ipv6SharePercent: number;
  ipv4Sessions: number;
  ipv6Sessions: number;
}

interface ApiPointOfPresence {
  id: string;
  name: string;
  city: string;
  description: string;
}

interface ApiStatisticsResponse {
  trafficInsights: ApiStatCard[];
  infrastructure: ApiStatCard[];
  protocolAdoption: ApiProtocolAdoption;
  pointsOfPresence: ApiPointOfPresence[];
  trafficPanels: ApiTrafficPanel[];
}

export interface StatisticsData {
  trafficInsights: StatDatum[];
  infrastructure: StatDatum[];
  protocolAdoption: ApiProtocolAdoption;
  pointsOfPresence: PointOfPresence[];
  trafficPanels: TrafficPanel[];
}

export async function getStatisticsData(): Promise<StatisticsData> {
  const data = await cmsFetch<ApiStatisticsResponse>("/api/v1/statistics");
  return {
    trafficInsights: data.trafficInsights.map(toStatDatum),
    infrastructure: data.infrastructure.map(toStatDatum),
    protocolAdoption: data.protocolAdoption,
    pointsOfPresence: data.pointsOfPresence,
    trafficPanels: data.trafficPanels.map(toTrafficPanel),
  };
}
