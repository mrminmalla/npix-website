import { Activity, TrendingUp, Users, Network, MapPin, CalendarClock } from "lucide-react";
import type { StatDatum } from "@/types";

export const HOME_STATS: StatDatum[] = [
  { id: "st1", label: "Current Traffic", value: 28.4, suffix: " Gbps", icon: Activity, decimals: 1 },
  { id: "st2", label: "Peak Traffic", value: 40.2, suffix: " Gbps", icon: TrendingUp, decimals: 1 },
  { id: "st3", label: "Connected Members", value: 27, icon: Users },
  { id: "st4", label: "Connected ASNs", value: 27, icon: Network },
  { id: "st5", label: "Exchange Locations", value: 5, icon: MapPin },
  { id: "st6", label: "Years of Operation", value: 11, icon: CalendarClock },
];

export const STATISTICS_PAGE_STATS: StatDatum[] = [
  { id: "sp1", label: "Current Traffic", value: 28.4, suffix: " Gbps", icon: Activity, decimals: 1 },
  { id: "sp2", label: "Peak Traffic", value: 40.2, suffix: " Gbps", icon: TrendingUp, decimals: 1 },
  { id: "sp3", label: "Total Members", value: 27, icon: Users },
  { id: "sp4", label: "Connected ASNs", value: 27, icon: Network },
  { id: "sp5", label: "Port Capacity", value: 480, suffix: " Gbps", icon: Network },
];
