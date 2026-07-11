import { Rocket, ClipboardList, Settings2, Cable, ScrollText } from "lucide-react";
import type { DocCategory, DownloadItem, FaqItem } from "@/types";
import { CONTACT_EMAIL, NOC_EMAIL } from "@/constants/site";

export const DOC_CATEGORIES: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "An overview of how to become an NPIX member and connect to the exchange.",
    icon: Rocket,
    items: [
      {
        id: "what-is-an-internet-exchange",
        title: "What is an Internet Exchange",
        summary: "How Internet Exchange Points keep local traffic local.",
        content: [
          { type: "heading", text: "Overview" },
          {
            type: "paragraph",
            text: "An Internet Exchange Point (IXP) is shared infrastructure that lets Internet Service Providers, content networks, and other organizations exchange traffic directly with each other instead of routing it through expensive, higher-latency international transit links.",
          },
          {
            type: "paragraph",
            text: "NPIX operates as Nepal's carrier-neutral Internet Exchange, connecting ISPs, banks, government agencies, universities, and technology companies at a single physical fabric in Kathmandu.",
          },
          { type: "heading", text: "Why It Matters For Nepal" },
          {
            type: "list",
            items: [
              "Domestic traffic stays within Nepal instead of transiting overseas",
              "Lower latency for banking, streaming, and government e-services",
              "Reduced dependency on costly international bandwidth",
              "A more resilient national Internet during international outages",
            ],
          },
          {
            type: "link",
            href: "/statistics",
            label: "View live NPIX traffic statistics",
          },
        ],
      },
      {
        id: "benefits-of-joining-npix",
        title: "Benefits of joining NPIX",
        summary: "What members gain from connecting to the exchange fabric.",
        content: [
          { type: "heading", text: "Member Benefits" },
          {
            type: "paragraph",
            text: "Joining NPIX gives your network a direct, low-latency path to every other connected member, reducing transit costs and improving the experience for end users across Nepal.",
          },
          {
            type: "list",
            items: [
              "Single port to reach all NPIX members",
              "Reduced international transit costs",
              "Lower latency for domestic traffic",
              "Simplified network operations via route server peering",
              "Native dual-stack IPv4/IPv6 support",
            ],
          },
          { type: "heading", text: "Who Should Join" },
          {
            type: "paragraph",
            text: "Any organization operating its own Autonomous System — ISPs, banks, government bodies, universities, and technology companies — benefits from peering at NPIX, regardless of size.",
          },
        ],
      },
      {
        id: "membership-process-overview",
        title: "Membership process overview",
        summary: "The high-level steps from interest to live peering.",
        content: [
          { type: "heading", text: "Process Summary" },
          {
            type: "list",
            ordered: true,
            items: [
              "Submit a membership inquiry and receive the application pack",
              "Complete and return the membership application form",
              "Sign the membership agreement and settle applicable fees",
              "Schedule cross-connect installation at the NPIX facility",
              "Configure BGP sessions and complete connectivity testing",
              "Go live on the exchange fabric",
            ],
          },
          {
            type: "paragraph",
            text: "A dedicated technical contact from NPIX supports your team throughout onboarding, from paperwork through to the first BGP session.",
          },
          {
            type: "link",
            href: "/downloads/npix-membership-application.pdf",
            label: "Download the Membership Application Form",
            download: true,
          },
        ],
      },
      {
        id: "timeline-from-application-to-connection",
        title: "Timeline from application to connection",
        summary: "What to expect and when, week by week.",
        content: [
          { type: "heading", text: "Typical Onboarding Timeline" },
          {
            type: "table",
            headers: ["Stage", "Typical Duration"],
            rows: [
              ["Application review", "2-3 business days"],
              ["Agreement and payment", "3-5 business days"],
              ["Cross-connect scheduling", "1-2 weeks"],
              ["BGP configuration and testing", "2-3 business days"],
              ["Go-live", "Same day as successful testing"],
            ],
          },
          {
            type: "paragraph",
            text: "Most members complete onboarding within 2-4 weeks of submitting a completed application, subject to port availability and cross-connect scheduling at the Kathmandu facility.",
          },
        ],
      },
    ],
  },
  {
    id: "membership-requirements",
    title: "Membership Requirements",
    description: "Eligibility criteria and organizational requirements for prospective members.",
    icon: ClipboardList,
    items: [
      {
        id: "eligible-organization-types",
        title: "Eligible organization types",
        summary: "Who can become an NPIX member.",
        content: [
          { type: "heading", text: "Eligible Organizations" },
          {
            type: "paragraph",
            text: "NPIX membership is open to any organization in Nepal that operates its own network infrastructure and requires direct interconnection with other domestic networks.",
          },
          {
            type: "list",
            items: [
              "Internet Service Providers (ISPs)",
              "Banks and financial institutions",
              "Government organizations and agencies",
              "Universities and research institutions",
              "Technology and content companies",
            ],
          },
          {
            type: "paragraph",
            text: "Organizations that do not yet operate their own Autonomous System can still engage NPIX for guidance on ASN registration as part of the onboarding process.",
          },
        ],
      },
      {
        id: "asn-requirement",
        title: "Autonomous System Number (ASN) requirement",
        summary: "Why BGP and a registered ASN are required to peer.",
        content: [
          { type: "heading", text: "ASN Requirement" },
          {
            type: "paragraph",
            text: "A registered Autonomous System Number is required to peer at NPIX, since all route exchange on the fabric is conducted over BGP (Border Gateway Protocol).",
          },
          {
            type: "list",
            items: [
              "A publicly registered ASN (RIR-assigned)",
              "At least one valid IPv4 and/or IPv6 prefix announced under that ASN",
              "Accurate IRR (Internet Routing Registry) route objects for filtering",
            ],
          },
          {
            type: "paragraph",
            text: "Organizations without an existing ASN can apply for one through APNIC prior to completing NPIX onboarding. Our technical team can advise on the registration process during your application review.",
          },
        ],
      },
      {
        id: "membership-agreement-overview",
        title: "Membership agreement overview",
        summary: "What the standard membership agreement covers.",
        content: [
          { type: "heading", text: "Agreement Overview" },
          {
            type: "paragraph",
            text: "Every member signs a standard membership agreement covering the operational terms, responsibilities, and acceptable use of the shared exchange fabric.",
          },
          {
            type: "list",
            items: [
              "Scope of service and port allocation",
              "Uptime commitments and maintenance notice windows",
              "Acceptable use and routing security obligations",
              "Fee schedule and renewal terms",
              "Termination and dispute resolution procedures",
            ],
          },
          {
            type: "link",
            href: "/downloads/npix-policy-documents.pdf",
            label: "Download the Peering Policy Document",
            download: true,
          },
        ],
      },
      {
        id: "annual-fees-and-port-charges",
        title: "Annual fees and port charges",
        summary: "Indicative pricing across supported port speeds.",
        content: [
          { type: "heading", text: "Indicative Fee Schedule" },
          {
            type: "paragraph",
            text: "Port charges scale with committed capacity. Final pricing is confirmed during the application review based on port availability at the time of connection.",
          },
          {
            type: "table",
            headers: ["Port Speed", "Setup Fee", "Annual Port Fee"],
            rows: [
              ["1 Gbps", "NPR 15,000", "NPR 60,000"],
              ["10 Gbps", "NPR 25,000", "NPR 150,000"],
              ["40 Gbps", "NPR 40,000", "NPR 350,000"],
              ["100 Gbps", "NPR 60,000", "NPR 600,000"],
            ],
          },
          {
            type: "paragraph",
            text: `For a formal quote, reach out to ${CONTACT_EMAIL} with your organization's expected traffic profile.`,
          },
        ],
      },
    ],
  },
  {
    id: "technical-requirements",
    title: "Technical Requirements",
    description: "Hardware, routing, and configuration prerequisites for connecting to NPIX.",
    icon: Settings2,
    items: [
      {
        id: "supported-port-speeds",
        title: "Supported port speeds (1G/10G/40G/100G)",
        summary: "Available physical port options at the Kathmandu facility.",
        content: [
          { type: "heading", text: "Available Port Speeds" },
          {
            type: "table",
            headers: ["Speed", "Interface", "Typical Use Case"],
            rows: [
              ["1 Gbps", "1000BASE-LX", "Small ISPs, single-branch organizations"],
              ["10 Gbps", "10GBASE-LR", "Mid-size ISPs, banks, universities"],
              ["40 Gbps", "40GBASE-LR4", "Large ISPs, high-traffic content networks"],
              ["100 Gbps", "100GBASE-LR4", "National backbone operators"],
            ],
          },
          {
            type: "paragraph",
            text: "Capacity upgrades are planned as member demand grows; contact the NPIX technical team to check current availability at your preferred speed.",
          },
        ],
      },
      {
        id: "bgp-session-requirements",
        title: "BGP session requirements",
        summary: "Baseline BGP configuration expected of every member.",
        content: [
          { type: "heading", text: "BGP Requirements" },
          {
            type: "paragraph",
            text: "All members must support standard eBGP sessions, either directly with other members (bilateral peering) or via the NPIX route servers (multilateral peering).",
          },
          {
            type: "list",
            items: [
              "eBGP support with MD5 or TCP-AO authentication",
              "Maximum-prefix limits configured to prevent route leaks",
              "RPKI-based route origin validation recommended",
              "Accurate AS-SET and route objects registered in an IRR",
            ],
          },
          { type: "heading", text: "Example Route Server Session" },
          {
            type: "code",
            language: "text",
            code: "router bgp 65000\n neighbor 198.32.231.1 remote-as 24474\n neighbor 198.32.231.1 description NPIX-Route-Server\n neighbor 198.32.231.1 maximum-prefix 500 restart 15\n neighbor 198.32.231.1 soft-reconfiguration inbound",
          },
        ],
      },
      {
        id: "ipv4-ipv6-addressing-policy",
        title: "IPv4 and IPv6 addressing policy",
        summary: "Dual-stack addressing requirements for the exchange LAN.",
        content: [
          { type: "heading", text: "Addressing Policy" },
          {
            type: "paragraph",
            text: "NPIX operates a shared, dual-stack exchange LAN. Members are assigned a single IPv4 and IPv6 address on the peering fabric for use in BGP sessions.",
          },
          {
            type: "list",
            items: [
              "IPv4 peering LAN: 198.32.231.0/24",
              "IPv6 peering LAN: 2404:2C00:FFFF:E::/64",
              "IPv6 is optional but strongly encouraged for all members",
              "No use of the peering LAN addresses for anything other than BGP sessions",
            ],
          },
        ],
      },
      {
        id: "equipment-cross-connect-specifications",
        title: "Equipment and cross-connect specifications",
        summary: "What to bring, and what NPIX provisions on site.",
        content: [
          { type: "heading", text: "Equipment Requirements" },
          {
            type: "paragraph",
            text: "Members are responsible for their own router or switch capable of terminating the ordered port speed; NPIX provisions and terminates the cross-connect at its Kathmandu facility.",
          },
          {
            type: "list",
            items: [
              "Member-owned router/switch with an SFP/SFP+/QSFP28 port matching the ordered speed",
              "Single-mode fiber patch cable (LC connector) for the cross-connect",
              "Remote-hands access arranged in advance for on-site installation",
              "A named technical contact available during the testing window",
            ],
          },
          {
            type: "link",
            href: "/downloads/npix-network-diagram.pdf",
            label: "Download the NPIX Network Diagram",
            download: true,
          },
        ],
      },
    ],
  },
  {
    id: "connectivity-guide",
    title: "Connectivity Guide",
    description: "Step-by-step guidance for physical and logical connection to the exchange fabric.",
    icon: Cable,
    items: [
      {
        id: "cross-connect-ordering-process",
        title: "Cross-connect ordering process",
        summary: "How to request and schedule your physical connection.",
        content: [
          { type: "heading", text: "Ordering a Cross-Connect" },
          {
            type: "list",
            ordered: true,
            items: [
              "Confirm your signed membership agreement and paid setup fee",
              "Submit a cross-connect request with your rack location and port speed",
              "NPIX schedules an installation window at the Kathmandu facility",
              "On-site technician terminates and tests the fiber cross-connect",
              "Member confirms link is up before proceeding to BGP configuration",
            ],
          },
          {
            type: "paragraph",
            text: `Cross-connect requests can be submitted to ${NOC_EMAIL} along with your preferred installation window.`,
          },
        ],
      },
      {
        id: "route-server-peering-configuration",
        title: "Route server peering configuration",
        summary: "Multilateral peering setup via the NPIX route servers.",
        content: [
          { type: "heading", text: "Route Server Peering" },
          {
            type: "paragraph",
            text: "Route server peering lets you exchange routes with all participating members through a single BGP session, instead of configuring individual sessions with each peer.",
          },
          {
            type: "code",
            language: "text",
            code: "router bgp 65000\n neighbor rs1.npix.net.np remote-as 24474\n neighbor rs1.npix.net.np ebgp-multihop 2\n neighbor rs1.npix.net.np soft-reconfiguration inbound\n address-family ipv6\n  neighbor rs1.npix.net.np activate",
          },
          {
            type: "paragraph",
            text: "Route servers apply RPKI-based origin validation and prefix filtering automatically, reducing the operational burden on member networks.",
          },
        ],
      },
      {
        id: "bilateral-peering-setup",
        title: "Bilateral peering setup",
        summary: "Direct, one-to-one BGP sessions with specific members.",
        content: [
          { type: "heading", text: "Bilateral Peering" },
          {
            type: "paragraph",
            text: "Bilateral peering establishes a direct BGP session between two member networks, useful for high-volume traffic pairs or custom routing policies not suited to the shared route servers.",
          },
          {
            type: "list",
            items: [
              "Coordinate directly with the target member to agree on peering terms",
              "Exchange ASN, peering LAN IP, and prefix list details",
              "Configure a direct eBGP session over the shared exchange LAN",
              "Apply prefix filters matching each side's registered IRR objects",
            ],
          },
          {
            type: "link",
            href: "/members",
            label: "Browse the NPIX member directory",
          },
        ],
      },
      {
        id: "testing-and-go-live-checklist",
        title: "Testing and go-live checklist",
        summary: "Final checks before a new connection goes live.",
        content: [
          { type: "heading", text: "Go-Live Checklist" },
          {
            type: "list",
            ordered: true,
            items: [
              "Cross-connect link is up and stable on both ends",
              "BGP session(s) established with expected prefix counts",
              "Maximum-prefix limits and filters verified",
              "IPv6 session tested if dual-stack was requested",
              "Traffic counters confirmed on the NPIX monitoring dashboard",
              "Technical contact details confirmed for maintenance notices",
            ],
          },
          {
            type: "link",
            href: "/statistics",
            label: "View the NPIX traffic dashboard",
          },
        ],
      },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    description: "Governance, acceptable use, and routing policies that guide NPIX operations.",
    icon: ScrollText,
    items: [
      {
        id: "peering-policy",
        title: "Peering policy",
        summary: "The multilateral and bilateral peering framework at NPIX.",
        content: [
          { type: "heading", text: "Peering Policy" },
          {
            type: "paragraph",
            text: "NPIX operates an open peering policy: any member may peer bilaterally with any other member, and multilateral peering is available to all members via the route servers at no additional cost.",
          },
          {
            type: "list",
            items: [
              "No mandatory bilateral peering obligations between members",
              "Route server peering is optional but strongly recommended",
              "Members may set individual BGP communities to control route redistribution",
            ],
          },
        ],
      },
      {
        id: "acceptable-use-policy",
        title: "Acceptable use policy",
        summary: "Rules governing use of the shared exchange fabric.",
        content: [
          { type: "heading", text: "Acceptable Use" },
          {
            type: "paragraph",
            text: "The NPIX exchange fabric may only be used for the exchange of traffic between members' own networks and their customers.",
          },
          {
            type: "list",
            items: [
              "No use of the peering LAN for transit services without prior agreement",
              "No announcement of prefixes the member is not authorized to originate",
              "No disruptive behavior including route leaks, spoofing, or excessive ARP traffic",
              "Compliance with all applicable Nepali telecommunications regulations",
            ],
          },
        ],
      },
      {
        id: "route-filtering-and-rpki-policy",
        title: "Route filtering and RPKI policy",
        summary: "How NPIX validates and filters routes on the fabric.",
        content: [
          { type: "heading", text: "Route Filtering and RPKI" },
          {
            type: "paragraph",
            text: "NPIX route servers apply strict prefix filtering based on IRR route objects and RPKI Route Origin Validation (ROV) to reduce the risk of accidental route leaks or hijacks.",
          },
          {
            type: "list",
            items: [
              "Prefixes must match a registered IRR route object",
              "RPKI-invalid announcements are rejected by the route servers",
              "Members are notified of filtering changes affecting their sessions",
            ],
          },
          {
            type: "link",
            href: "/downloads/npix-policy-documents.pdf",
            label: "Download the full Policy Documents package",
            download: true,
          },
        ],
      },
      {
        id: "dispute-resolution-process",
        title: "Dispute resolution process",
        summary: "How disagreements between members or with NPIX are handled.",
        content: [
          { type: "heading", text: "Dispute Resolution" },
          {
            type: "paragraph",
            text: "Disputes between members, or between a member and NPIX, are handled through a structured escalation process before any termination of service is considered.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Initial written notice describing the dispute to the involved parties",
              "A 10 business day period for direct resolution between parties",
              "Escalation to the NPIX governance committee if unresolved",
              "Formal mediation as a final step prior to any service action",
            ],
          },
          {
            type: "paragraph",
            text: `Disputes can be raised at any time by contacting ${CONTACT_EMAIL}.`,
          },
        ],
      },
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
