export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Members", href: "/members" },
  { label: "Statistics", href: "/statistics" },
  { label: "Locations", href: "/locations" },
  { label: "Documentation", href: "/documentation" },
  { label: "News & Events", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "Statistics", href: "/statistics" },
  { label: "Locations", href: "/locations" },
  { label: "News & Events", href: "/news" },
];

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { label: "Public Peering", href: "/services#public-peering" },
  { label: "Route Server Services", href: "/services#route-server" },
  { label: "IPv6 Services", href: "/services#ipv6" },
  { label: "Domestic Interconnection", href: "/services#domestic-interconnection" },
  { label: "Technical Consultation", href: "/services#technical-consultation" },
];

export const FOOTER_DOC_LINKS: NavLink[] = [
  { label: "Getting Started", href: "/documentation#getting-started" },
  { label: "Membership Requirements", href: "/documentation#membership-requirements" },
  { label: "Technical Requirements", href: "/documentation#technical-requirements" },
  { label: "FAQs", href: "/documentation#faqs" },
  { label: "Download Center", href: "/documentation#downloads" },
];
