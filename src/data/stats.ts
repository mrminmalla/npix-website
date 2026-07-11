import { Activity, TrendingUp, Users, Network, MapPin, CalendarClock } from "lucide-react";
import type { StatDatum } from "@/types";
import { MEMBERS } from "@/data/members";
import { LOCATIONS } from "@/data/locations";

const UNIQUE_ASN_COUNT = new Set(MEMBERS.map((m) => m.asn)).size;

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

export const STATISTICS_PAGE_STATS: StatDatum[] = [
  { id: "sp1", label: "Current Traffic", value: 28.4, suffix: " Gbps", icon: Activity, decimals: 1 },
  { id: "sp2", label: "Peak Traffic", value: 40.2, suffix: " Gbps", icon: TrendingUp, decimals: 1 },
  { id: "sp3", label: "Total Members", value: MEMBERS.length, icon: Users },
  { id: "sp4", label: "Connected ASNs", value: UNIQUE_ASN_COUNT, icon: Network },
  { id: "sp5", label: "Port Capacity", value: 480, suffix: " Gbps", icon: Network },
];
