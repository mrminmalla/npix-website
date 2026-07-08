import { Scale, ShieldCheck, Eye, Handshake, Lightbulb } from "lucide-react";
import type { CoreValue } from "@/types";

export const CORE_VALUES: CoreValue[] = [
  {
    id: "cv1",
    title: "Neutrality",
    description:
      "NPIX operates as a carrier-neutral platform, treating every member equally regardless of size or sector.",
    icon: Scale,
  },
  {
    id: "cv2",
    title: "Reliability",
    description:
      "We maintain resilient, redundant infrastructure so members can depend on NPIX for critical connectivity.",
    icon: ShieldCheck,
  },
  {
    id: "cv3",
    title: "Transparency",
    description:
      "Clear policies, open statistics, and honest communication guide every aspect of how NPIX operates.",
    icon: Eye,
  },
  {
    id: "cv4",
    title: "Collaboration",
    description:
      "We work closely with ISPs, government, and industry to strengthen Nepal's shared digital infrastructure.",
    icon: Handshake,
  },
  {
    id: "cv5",
    title: "Innovation",
    description:
      "We continually invest in new technology and services to keep pace with Nepal's growing digital economy.",
    icon: Lightbulb,
  },
];
