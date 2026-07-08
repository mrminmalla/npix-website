import { Network, Router, Globe2, Cable, Headphones } from "lucide-react";
import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "s1",
    slug: "public-peering",
    title: "Public Peering",
    icon: Network,
    description:
      "Exchange traffic with all connected members through a single physical or virtual port, reducing complexity and transit costs.",
    benefits: [
      "Single port to reach all NPIX members",
      "Reduced international transit costs",
      "Lower latency for domestic traffic",
      "Simplified network operations",
    ],
  },
  {
    id: "s2",
    slug: "route-server",
    title: "Route Server Services",
    icon: Router,
    description:
      "Simplify multilateral peering by connecting once to our route servers instead of negotiating individual BGP sessions with every member.",
    benefits: [
      "One BGP session instead of many",
      "Faster onboarding of new peers",
      "Automated route policy management",
      "Reduced configuration overhead",
    ],
  },
  {
    id: "s3",
    slug: "ipv6",
    title: "IPv6 Services",
    icon: Globe2,
    description:
      "Full dual-stack support across the exchange fabric, helping members future-proof their networks and prepare for IPv4 exhaustion.",
    benefits: [
      "Native dual-stack peering",
      "IPv6 route server support",
      "Future-proof network readiness",
      "Technical guidance for migration",
    ],
  },
  {
    id: "s4",
    slug: "domestic-interconnection",
    title: "Domestic Interconnection",
    icon: Cable,
    description:
      "Keep Nepal's Internet traffic within Nepal, improving speed and reliability for local content, banking, and government services.",
    benefits: [
      "Traffic stays within national borders",
      "Improved reliability during international outages",
      "Faster access to local content and services",
      "Support for national digital resilience",
    ],
  },
  {
    id: "s5",
    slug: "technical-consultation",
    title: "Technical Consultation",
    icon: Headphones,
    description:
      "Our engineering team helps members plan connectivity, BGP configuration, and peering strategy tailored to their network needs.",
    benefits: [
      "Dedicated onboarding support",
      "BGP and routing best practices",
      "Capacity planning guidance",
      "Ongoing technical account support",
    ],
  },
];
