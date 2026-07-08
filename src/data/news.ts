import type { NewsItem } from "@/types";

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    slug: "npix-crosses-40gbps-peak-traffic",
    title: "NPIX Crosses 40 Gbps Peak Traffic for the First Time",
    date: "2026-06-18",
    summary:
      "Growing domestic content consumption and new member connections pushed NPIX's peak exchange traffic past 40 Gbps this month.",
    content:
      "NPIX recorded a new peak traffic milestone of 40.2 Gbps, driven by increased domestic streaming, banking transactions, and government e-service usage. This marks a 28% year-over-year increase and reflects the growing importance of local traffic exchange in Nepal's digital ecosystem.",
    category: "Announcements",
    featured: true,
    image: "/images/news/traffic-milestone.svg",
  },
  {
    id: "n2",
    slug: "scheduled-maintenance-core-switch-upgrade",
    title: "Scheduled Maintenance: Core Switch Firmware Upgrade",
    date: "2026-06-05",
    summary:
      "A scheduled maintenance window has been planned to upgrade firmware on NPIX's core switching infrastructure in Kathmandu.",
    content:
      "NPIX will perform a firmware upgrade on its core switching fabric on the scheduled date. Members may experience brief interruptions of under 60 seconds during the failover window. Advance notice was sent to all technical contacts.",
    category: "Maintenance",
    image: "/images/news/maintenance.svg",
  },
  {
    id: "n3",
    slug: "welcoming-three-new-members-q2-2026",
    title: "Welcoming Three New Members in Q2 2026",
    date: "2026-05-22",
    summary:
      "NPIX is pleased to welcome two new technology companies and one educational institution to the exchange this quarter.",
    content:
      "This quarter, NPIX onboarded Lumbini Edge Networks, Nepal Academy of Science & Research, and Chitwan Cyber Solutions. Each new member gains access to public peering, route server services, and dual-stack connectivity from day one.",
    category: "New Members",
    image: "/images/news/new-members.svg",
  },
  {
    id: "n4",
    slug: "ipv6-adoption-workshop-recap",
    title: "IPv6 Adoption Workshop Recap",
    date: "2026-05-10",
    summary:
      "NPIX hosted a hands-on workshop for member network engineers on planning and deploying dual-stack IPv6 connectivity.",
    content:
      "The workshop covered IPv6 addressing plans, route server peering configuration, and common migration pitfalls. Over 30 engineers from member organizations attended the session held at the NPIX Kathmandu facility.",
    category: "Workshops",
    image: "/images/news/workshop.svg",
  },
  {
    id: "n5",
    slug: "npix-annual-peering-conference-2026",
    title: "Save the Date: NPIX Annual Peering Conference 2026",
    date: "2026-04-28",
    summary:
      "NPIX will host its annual peering conference bringing together ISPs, banks, and government stakeholders to discuss the future of Nepal's Internet infrastructure.",
    content:
      "The conference will feature keynote sessions on national digital infrastructure resilience, panel discussions with member organizations, and technical deep-dives into route server operations and IPv6 adoption trends.",
    category: "Conferences",
    image: "/images/news/conference.svg",
  },
  {
    id: "n6",
    slug: "route-server-capacity-upgrade-completed",
    title: "Route Server Capacity Upgrade Completed",
    date: "2026-04-15",
    summary:
      "NPIX has completed a capacity upgrade to its route server infrastructure to support growing multilateral peering demand.",
    content:
      "The upgrade doubles available route server capacity and introduces improved route filtering and RPKI validation, further strengthening the security and reliability of multilateral peering at NPIX.",
    category: "Upgrades",
    image: "/images/news/upgrade.svg",
  },
  {
    id: "n7",
    slug: "new-member-onboarding-guide-published",
    title: "New Member Onboarding Guide Published",
    date: "2026-03-30",
    summary:
      "A revised onboarding guide is now available in the Documentation Center to help new members connect faster.",
    content:
      "The updated guide walks prospective members through membership requirements, technical prerequisites, port provisioning timelines, and BGP configuration templates for both route server and bilateral peering.",
    category: "Announcements",
    image: "/images/news/documentation.svg",
  },
  {
    id: "n8",
    slug: "scheduled-maintenance-power-systems",
    title: "Scheduled Maintenance: Facility Power Systems Test",
    date: "2026-03-12",
    summary:
      "A routine UPS and backup generator test is scheduled at the NPIX Kathmandu facility with no expected member impact.",
    content:
      "This is a routine annual test of backup power systems at the NPIX facility. Redundant power paths ensure no impact to member connectivity is expected during the test window.",
    category: "Maintenance",
    image: "/images/news/maintenance.svg",
  },
  {
    id: "n9",
    slug: "welcoming-himalayan-commerce-bank",
    title: "Welcoming Himalayan Commerce Bank as a New Member",
    date: "2026-02-27",
    summary:
      "Himalayan Commerce Bank joins NPIX to improve resilience and latency for its digital banking services.",
    content:
      "As digital banking adoption grows in Nepal, Himalayan Commerce Bank joins NPIX to ensure faster, more reliable access to its online and mobile banking platforms for customers across all connected ISPs.",
    category: "New Members",
    image: "/images/news/new-members.svg",
  },
  {
    id: "n10",
    slug: "network-security-workshop-for-members",
    title: "Network Security Best Practices Workshop for Members",
    date: "2026-02-14",
    summary:
      "A joint workshop with member security teams focused on route hijack prevention and RPKI adoption.",
    content:
      "The workshop covered BGP route hijack prevention, RPKI-based route origin validation, and coordinated incident response procedures among NPIX member networks.",
    category: "Workshops",
    image: "/images/news/workshop.svg",
  },
  {
    id: "n11",
    slug: "regional-connectivity-panel-discussion",
    title: "NPIX Joins Regional Connectivity Panel Discussion",
    date: "2026-01-22",
    summary:
      "NPIX representatives joined a regional panel on South Asian Internet exchange cooperation and cross-border connectivity.",
    content:
      "The panel discussed opportunities for regional IXP cooperation, shared best practices for neutral exchange governance, and strategies for improving Internet resilience across South Asia.",
    category: "Conferences",
    image: "/images/news/conference.svg",
  },
  {
    id: "n12",
    slug: "bgp-route-filtering-policy-update",
    title: "Updated BGP Route Filtering Policy Now in Effect",
    date: "2026-01-08",
    summary:
      "NPIX has published an updated route filtering policy to strengthen routing security across the exchange fabric.",
    content:
      "The updated policy requires all members to maintain accurate IRR route objects and enables stricter prefix filtering on route server sessions, reducing the risk of accidental route leaks.",
    category: "Upgrades",
    image: "/images/news/upgrade.svg",
  },
];

export const NEWS_CATEGORIES: NewsItem["category"][] = [
  "Announcements",
  "Maintenance",
  "New Members",
  "Workshops",
  "Conferences",
  "Upgrades",
];
