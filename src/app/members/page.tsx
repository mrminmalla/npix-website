import type { Metadata } from "next";
import { Users, Network, LayoutGrid } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { MembersDirectory } from "@/components/sections/MembersDirectory";
import { JsonLd } from "@/components/shared/JsonLd";
import { MEMBERS, MEMBER_CATEGORIES } from "@/data/members";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Browse NPIX member organizations including ISPs, banks, government organizations, educational institutions, and technology companies.",
  keywords: ["NPIX members", "IXP members Nepal", "ISP members Nepal", "ASN directory"],
  alternates: { canonical: "/members" },
  openGraph: {
    title: "Members | NPIX",
    description:
      "Browse NPIX member organizations including ISPs, banks, government organizations, and universities.",
    url: `${SITE_URL}/members`,
  },
};

export default function MembersPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Members", item: `${SITE_URL}/members` },
          ],
        }}
      />

      <PageHeader
        eyebrow="The NPIX Community"
        title="Members"
        description="A growing community of ISPs, banks, government organizations, universities, and technology companies connected through NPIX."
      />

      <section className="py-16">
        <div className="container-page grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard label="Total Members" value={MEMBERS.length} icon={Users} />
          <StatCard label="Total ASNs" value={MEMBERS.length} icon={Network} />
          <StatCard label="Categories" value={MEMBER_CATEGORIES.length} icon={LayoutGrid} />
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <MembersDirectory members={MEMBERS} />
        </div>
      </section>
    </>
  );
}
