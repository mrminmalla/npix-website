import type { TrafficDatum, MemberGrowthDatum } from "@/types";

export const TRAFFIC_GROWTH: TrafficDatum[] = [
  { label: "2016", ipv4: 1.2, ipv6: 0.05 },
  { label: "2017", ipv4: 2.1, ipv6: 0.1 },
  { label: "2018", ipv4: 3.8, ipv6: 0.3 },
  { label: "2019", ipv4: 6.5, ipv6: 0.6 },
  { label: "2020", ipv4: 10.2, ipv6: 1.1 },
  { label: "2021", ipv4: 14.8, ipv6: 2.0 },
  { label: "2022", ipv4: 18.9, ipv6: 3.4 },
  { label: "2023", ipv4: 22.6, ipv6: 4.9 },
  { label: "2024", ipv4: 26.1, ipv6: 6.8 },
  { label: "2025", ipv4: 30.4, ipv6: 8.9 },
  { label: "2026", ipv4: 33.2, ipv6: 10.6 },
];

export const MEMBER_GROWTH: MemberGrowthDatum[] = [
  { label: "2016", members: 9, asns: 9 },
  { label: "2017", members: 14, asns: 14 },
  { label: "2018", members: 19, asns: 19 },
  { label: "2019", members: 24, asns: 24 },
  { label: "2020", members: 29, asns: 29 },
  { label: "2021", members: 35, asns: 35 },
  { label: "2022", members: 40, asns: 40 },
  { label: "2023", members: 45, asns: 45 },
  { label: "2024", members: 49, asns: 49 },
  { label: "2025", members: 52, asns: 52 },
  { label: "2026", members: 55, asns: 54 },
];

export const TRAFFIC_TRENDS_DAILY = [
  { time: "00:00", traffic: 12.4 },
  { time: "02:00", traffic: 10.1 },
  { time: "04:00", traffic: 8.6 },
  { time: "06:00", traffic: 11.3 },
  { time: "08:00", traffic: 18.7 },
  { time: "10:00", traffic: 24.2 },
  { time: "12:00", traffic: 27.5 },
  { time: "14:00", traffic: 26.8 },
  { time: "16:00", traffic: 28.4 },
  { time: "18:00", traffic: 34.9 },
  { time: "20:00", traffic: 40.2 },
  { time: "22:00", traffic: 22.1 },
];

export const IPV4_IPV6_SHARE = [
  { name: "IPv4", value: 76 },
  { name: "IPv6", value: 24 },
];
