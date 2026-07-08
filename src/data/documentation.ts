import {
  Rocket,
  ClipboardList,
  Settings2,
  Cable,
  ScrollText,
  HelpCircle,
  Download,
} from "lucide-react";
import type { DocCategory, DownloadItem, FaqItem } from "@/types";

export const DOC_CATEGORIES: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "An overview of how to become an NPIX member and connect to the exchange.",
    icon: Rocket,
    items: [
      "What is an Internet Exchange",
      "Benefits of joining NPIX",
      "Membership process overview",
      "Timeline from application to connection",
    ],
  },
  {
    id: "membership-requirements",
    title: "Membership Requirements",
    description: "Eligibility criteria and organizational requirements for prospective members.",
    icon: ClipboardList,
    items: [
      "Eligible organization types",
      "Autonomous System Number (ASN) requirement",
      "Membership agreement overview",
      "Annual fees and port charges",
    ],
  },
  {
    id: "technical-requirements",
    title: "Technical Requirements",
    description: "Hardware, routing, and configuration prerequisites for connecting to NPIX.",
    icon: Settings2,
    items: [
      "Supported port speeds (1G/10G/40G/100G)",
      "BGP session requirements",
      "IPv4 and IPv6 addressing policy",
      "Equipment and cross-connect specifications",
    ],
  },
  {
    id: "connectivity-guide",
    title: "Connectivity Guide",
    description: "Step-by-step guidance for physical and logical connection to the exchange fabric.",
    icon: Cable,
    items: [
      "Cross-connect ordering process",
      "Route server peering configuration",
      "Bilateral peering setup",
      "Testing and go-live checklist",
    ],
  },
  {
    id: "policies",
    title: "Policies",
    description: "Governance, acceptable use, and routing policies that guide NPIX operations.",
    icon: ScrollText,
    items: [
      "Peering policy",
      "Acceptable use policy",
      "Route filtering and RPKI policy",
      "Dispute resolution process",
    ],
  },
  {
    id: "faqs",
    title: "FAQs",
    description: "Answers to the most common questions from prospective and current members.",
    icon: HelpCircle,
    items: [
      "How long does onboarding take?",
      "Is IPv6 mandatory?",
      "What happens during maintenance windows?",
      "Can non-ISPs join NPIX?",
    ],
  },
  {
    id: "downloads",
    title: "Download Center",
    description: "Application forms, technical specifications, and policy documents.",
    icon: Download,
    items: [
      "Membership Application Form",
      "Technical Requirements Document",
      "Network Diagram",
      "Policy Documents",
    ],
  },
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: "d1",
    title: "Membership Application Form",
    description: "Official application form required to initiate NPIX membership.",
    fileType: "PDF",
    fileSize: "240 KB",
    href: "/downloads/npix-membership-application.pdf",
  },
  {
    id: "d2",
    title: "Technical Requirements Document",
    description: "Detailed hardware, BGP, and cross-connect requirements for new members.",
    fileType: "PDF",
    fileSize: "310 KB",
    href: "/downloads/npix-technical-requirements.pdf",
  },
  {
    id: "d3",
    title: "Network Diagram",
    description: "High-level topology diagram of the NPIX exchange fabric.",
    fileType: "PDF",
    fileSize: "180 KB",
    href: "/downloads/npix-network-diagram.pdf",
  },
  {
    id: "d4",
    title: "Peering Policy Document",
    description: "Official peering, routing, and acceptable use policy documentation.",
    fileType: "PDF",
    fileSize: "265 KB",
    href: "/downloads/npix-policy-documents.pdf",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "f1",
    question: "How long does the onboarding process take?",
    answer:
      "Most members complete onboarding within 2-4 weeks of submitting a completed application, subject to port availability and cross-connect scheduling.",
  },
  {
    id: "f2",
    question: "Is IPv6 support mandatory for members?",
    answer:
      "IPv6 is not mandatory, but strongly encouraged. NPIX provides native dual-stack support on both bilateral and route server peering.",
  },
  {
    id: "f3",
    question: "Can organizations without an ASN join NPIX?",
    answer:
      "A registered Autonomous System Number is required to peer at NPIX, as BGP is used for all route exchange on the fabric.",
  },
  {
    id: "f4",
    question: "What happens during a scheduled maintenance window?",
    answer:
      "NPIX notifies all technical contacts in advance of planned maintenance. Redundant infrastructure typically limits impact to under 60 seconds of failover time.",
  },
  {
    id: "f5",
    question: "Can non-ISP organizations join NPIX?",
    answer:
      "Yes. Banks, government organizations, universities, and technology companies are all eligible to join, provided they meet the technical and ASN requirements.",
  },
  {
    id: "f6",
    question: "What port speeds does NPIX support?",
    answer:
      "NPIX currently supports 1G, 10G, 40G, and 100G ports at its Kathmandu facility, with capacity upgrades planned as demand grows.",
  },
];
