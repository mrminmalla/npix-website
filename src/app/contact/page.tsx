import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Navigation } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { NepalMap } from "@/components/maps/NepalMapLoader";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { LOCATIONS } from "@/data/locations";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  NOC_EMAIL,
  NOC_PHONE,
  OFFICE_ADDRESS,
  SITE_URL,
} from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with NPIX to become a member or ask a question. Find office information, NOC contact details, and directions to our Kathmandu facility.",
  keywords: ["contact NPIX", "become a member Nepal Internet Exchange", "NPIX NOC"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | NPIX",
    description:
      "Get in touch with NPIX to become a member or ask a question about domestic Internet exchange in Nepal.",
    url: `${SITE_URL}/contact`,
  },
};

const kathmandu = LOCATIONS.find((l) => l.city === "Kathmandu") ?? LOCATIONS[0];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contact`,
        }}
      />

      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Interested in becoming a member, or have a question about NPIX? Reach out to our team."
      />

      <section id="become-a-member" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-2 text-base text-foreground-secondary">
              Fill out the form below and our team will respond within 1-2 business days.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Clock className="h-4 w-4 text-secondary" aria-hidden="true" />
                Office Information
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  <dd className="text-foreground-secondary">{OFFICE_ADDRESS}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  <dd>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-foreground-secondary hover:text-secondary">
                      {CONTACT_PHONE}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  <dd>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground-secondary hover:text-secondary">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="text-foreground-secondary">
                  Sunday - Friday, 10:00 AM - 5:00 PM (NPT)
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                Network Operations Center (NOC)
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <dd>
                    <a href={`tel:${NOC_PHONE}`} className="text-foreground-secondary hover:text-accent">
                      {NOC_PHONE}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <dd>
                    <a href={`mailto:${NOC_EMAIL}`} className="text-foreground-secondary hover:text-accent">
                      {NOC_EMAIL}
                    </a>
                  </dd>
                </div>
                <p className="text-foreground-secondary">
                  Available 24/7 for member network incidents and emergencies.
                </p>
              </dl>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Navigation className="h-4 w-4 text-secondary" aria-hidden="true" />
                Directions
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                Our Kathmandu facility is located in Putalisadak, a short distance from
                New Baneshwor and easily accessible by public transport. Visitor access
                requires prior appointment scheduling with our office.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="container-page">
          <FadeIn className="mb-6 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Find Us
            </h2>
          </FadeIn>
          <NepalMap locations={[kathmandu]} height={400} />
        </div>
      </section>
    </>
  );
}
