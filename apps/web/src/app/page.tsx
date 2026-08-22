import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TrafficSection } from "@/components/sections/TrafficSection";
import { WhyNPIXSection } from "@/components/sections/WhyNPIXSection";
import { EventsAnnouncementsSection } from "@/components/sections/EventsAnnouncementsSection";
import { MemberShowcaseSection } from "@/components/sections/MemberShowcaseSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NPIX - Nepal Internet Exchange",
          alternateName: "NPIX",
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          slogan: SITE_TAGLINE,
        }}
      />
      <HeroSection />
      <StatisticsSection />
      <TrafficSection />
      <WhyNPIXSection />
      <EventsAnnouncementsSection />
      <MemberShowcaseSection />
      <NewsSection />
      <CTASection />
    </>
  );
}
