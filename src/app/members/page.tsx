import type { Metadata } from "next";
import { Users, Network, Server } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { MembersDirectory } from "@/components/sections/MembersDirectory";
import { MemberTable } from "@/components/tables/MemberTable";
import { JsonLd } from "@/components/shared/JsonLd";
import { MEMBERS } from "@/data/members";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Browse the full list of NPIX member organizations connected to Nepal's Internet Exchange.",
  keywords: ["NPIX members", "IXP members Nepal", "ISP members Nepal", "ASN directory"],
  alternates: { canonical: "/members" },
  openGraph: {
    title: "Members | NPIX",
    description: "Browse the full list of NPIX member organizations.",
    url: `${SITE_URL}/members`,
  },
};

const uniqueAsnCount = new Set(MEMBERS.map((m) => m.asn)).size;
const datahubCount = MEMBERS.filter((m) => m.datahub).length;
const regularMembers = MEMBERS.filter((m) => m.category === "regular");
const specialMembers = MEMBERS.filter((m) => m.category === "special");

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
        description="The full, growing community of organizations connected through NPIX."
      />

      <section className="py-12 md:py-16">
        <div className="container-page grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard label="Total Members" value={MEMBERS.length} icon={Users} />
          <StatCard label="Unique ASNs" value={uniqueAsnCount} icon={Network} />
          <StatCard label="Datahub Enabled" value={datahubCount} icon={Server} />
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container-page">
          <MembersDirectory members={regularMembers} />
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Special Members
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground-secondary">
            Root server operators, DNS anycast nodes, and the exchange operator itself.
          </p>
          <div className="mt-6">
            <MemberTable members={specialMembers} />
          </div>
        </div>
      </section>
    </>
  );
}
