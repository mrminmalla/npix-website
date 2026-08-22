import { Zap, PiggyBank, ShieldCheck, Flag } from "lucide-react";
import type { WhyNpixItem } from "@/types";

export const WHY_NPIX: WhyNpixItem[] = [
  {
    id: "w1",
    title: "Lower Latency",
    description:
      "Keeping local traffic within Nepal reduces network delays, resulting in faster access to websites, applications, and digital services.",
    icon: Zap,
  },
  {
    id: "w2",
    title: "Reduced Transit Costs",
    description:
      "Exchanging traffic locally decreases dependency on international transit, lowering operational costs for connected networks.",
    icon: PiggyBank,
  },
  {
    id: "w3",
    title: "Improved Reliability",
    description:
      "Direct interconnection provides resilient local communication paths and reduces the impact of international connectivity disruptions.",
    icon: ShieldCheck,
  },
  {
    id: "w4",
    title: "Stronger Digital Nepal",
    description:
      "A robust exchange ecosystem encourages local content development, innovation, and long-term digital growth.",
    icon: Flag,
  },
];
