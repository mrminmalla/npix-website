import { Scale, ShieldCheck, Eye, Handshake, Lightbulb } from "lucide-react";
import type { CoreValue } from "@/types";

export const CORE_VALUES: CoreValue[] = [
  {
    id: "cv1",
    title: "Neutrality",
    description:
      "We operate as a carrier-neutral platform, providing equal opportunities and fair access to all members regardless of size, sector, or business model.",
    icon: Scale,
  },
  {
    id: "cv2",
    title: "Reliability",
    description:
      "We maintain resilient and highly available infrastructure to ensure uninterrupted and dependable connectivity for our members.",
    icon: ShieldCheck,
  },
  {
    id: "cv3",
    title: "Transparency",
    description:
      "We believe in open communication, clear policies, and accountable operations that foster trust within Nepal's internet community.",
    icon: Eye,
  },
  {
    id: "cv4",
    title: "Collaboration",
    description:
      "We work closely with network operators, government agencies, academic institutions, and industry stakeholders to strengthen Nepal's digital ecosystem.",
    icon: Handshake,
  },
  {
    id: "cv5",
    title: "Innovation",
    description:
      "We continuously invest in technology and best practices to support the evolving needs of Nepal's growing internet infrastructure.",
    icon: Lightbulb,
  },
];
