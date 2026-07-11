export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "Statistics", href: "/statistics" },
  { label: "Documentation", href: "/documentation" },
  { label: "News & Events", href: "/news" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "Statistics", href: "/statistics" },
  { label: "News & Events", href: "/news" },
];

export const FOOTER_DOC_LINKS: NavLink[] = [
  { label: "Getting Started", href: "/documentation#getting-started" },
  { label: "Membership Requirements", href: "/documentation#membership-requirements" },
  { label: "Technical Requirements", href: "/documentation#technical-requirements" },
  { label: "FAQs", href: "/documentation#faqs" },
  { label: "Download Center", href: "/documentation#downloads" },
];
