import { Zap, PiggyBank, ShieldCheck, Flag } from "lucide-react";
import type { WhyNpixItem } from "@/types";

export const WHY_NPIX: WhyNpixItem[] = [
  {
    id: "w1",
    title: "Lower Latency",
    description:
      "Keeping traffic within Nepal means fewer network hops, resulting in faster response times for local users.",
    icon: Zap,
  },
  {
    id: "w2",
    title: "Reduced Transit Cost",
    description:
      "Exchanging traffic locally reduces reliance on expensive international transit bandwidth.",
    icon: PiggyBank,
  },
  {
    id: "w3",
    title: "Improved Reliability",
    description:
      "Domestic peering reduces dependency on international links, improving resilience during outages.",
    icon: ShieldCheck,
  },
  {
    id: "w4",
    title: "Stronger Digital Nepal",
    description:
      "A robust domestic exchange strengthens the foundation of Nepal's growing digital economy and services.",
    icon: Flag,
  },
];
