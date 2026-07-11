import {
  Activity,
  TrendingUp,
  Users,
  Network,
  MapPin,
  CalendarClock,
  Gauge,
  Percent,
  Database,
  Building2,
  ShieldCheck,
} from "lucide-react";
import type { StatDatum, PointOfPresence } from "@/types";
import { MEMBERS } from "@/data/members";
import { LOCATIONS } from "@/data/locations";

const UNIQUE_ASN_COUNT = new Set(MEMBERS.map((m) => m.asn)).size;
const IPV6_MEMBER_COUNT = MEMBERS.filter((m) => m.ipv6Address).length;

export const HOME_STATS: StatDatum[] = [
  {
    id: "st1",
    label: "Current Traffic",
    value: 28.4,
    suffix: " Gbps",
    icon: Activity,
    decimals: 1,
    description: "Real-time domestic traffic exchanged through NPIX.",
  },
  {
    id: "st2",
    label: "Peak Traffic",
    value: 40.2,
    suffix: " Gbps",
    icon: TrendingUp,
    decimals: 1,
    description: "Highest traffic volume observed on the exchange.",
  },
  {
    id: "st3",
    label: "Connected Members",
    value: MEMBERS.length,
    icon: Users,
    description: "Organizations actively peering through NPIX.",
  },
  {
    id: "st4",
    label: "Connected ASNs",
    value: UNIQUE_ASN_COUNT,
    icon: Network,
    description: "Autonomous Systems participating in the exchange.",
  },
  {
    id: "st5",
    label: "Exchange Locations",
    value: LOCATIONS.length,
    icon: MapPin,
    description: "Points of interconnection across Nepal.",
  },
  {
    id: "st6",
    label: "Years of Operation",
    value: 11,
    icon: CalendarClock,
    description: "Years of supporting Nepal's digital infrastructure.",
  },
];

export const TRAFFIC_INSIGHTS_STATS: StatDatum[] = [
  {
    id: "ti1",
    label: "Current Traffic",
    value: 28.4,
    suffix: " Gbps",
    icon: Activity,
    decimals: 1,
    description: "Real-time traffic exchanged across the peering fabric.",
  },
  {
    id: "ti2",
    label: "Average Traffic",
    value: 24.6,
    suffix: " Gbps",
    icon: Gauge,
    decimals: 1,
    description: "Mean traffic observed over the selected period.",
  },
  {
    id: "ti3",
    label: "Peak Traffic",
    value: 40.2,
    suffix: " Gbps",
    icon: TrendingUp,
    decimals: 1,
    description: "Highest observed traffic during the selected period.",
  },
  {
    id: "ti4",
    label: "95th Percentile",
    value: 36.8,
    suffix: " Gbps",
    icon: Percent,
    decimals: 1,
    description: "Billing-grade traffic level, excluding brief spikes.",
  },
  {
    id: "ti5",
    label: "24-Hour Traffic Volume",
    value: 266,
    suffix: " TB",
    icon: Database,
    description: "Total data exchanged across NPIX in the past 24 hours.",
  },
];

export const PROTOCOL_ADOPTION = {
  ipv4SharePercent: 76,
  ipv6SharePercent: 24,
  ipv4Sessions: MEMBERS.length,
  ipv6Sessions: IPV6_MEMBER_COUNT,
};

export const INFRASTRUCTURE_STATS: StatDatum[] = [
  {
    id: "in1",
    label: "Active PoPs",
    value: 2,
    icon: Building2,
    description: "Interconnection facilities currently in operation.",
  },
  {
    id: "in2",
    label: "Port Capacity",
    value: 480,
    suffix: " Gbps",
    icon: Network,
    description: "Total switching capacity available across NPIX.",
  },
  {
    id: "in3",
    label: "Years of Operation",
    value: 11,
    suffix: "+",
    icon: CalendarClock,
    description: "Years of supporting Nepal's digital infrastructure.",
  },
  {
    id: "in4",
    label: "Network Uptime",
    value: 99.99,
    suffix: "%",
    decimals: 2,
    icon: ShieldCheck,
    description: "Exchange fabric availability over the past 12 months.",
  },
];

export const POINTS_OF_PRESENCE: PointOfPresence[] = [
  {
    id: "pop1",
    name: "DataHub Nepal",
    city: "Kathmandu, Nepal",
    description: "Primary exchange infrastructure and route server location.",
  },
  {
    id: "pop2",
    name: "Access World, Pulchowk",
    city: "Lalitpur, Nepal",
    description:
      "Secondary PoP providing redundancy and additional interconnection capacity.",
  },
];
