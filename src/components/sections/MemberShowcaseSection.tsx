import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { MEMBERS } from "@/data/members";

function uniqueSpecialMembers() {
  const seen = new Set<string>();
  return MEMBERS.filter((member) => member.category === "special" && member.logo).filter(
    (member) => {
      if (seen.has(member.website)) return false;
      seen.add(member.website);
      return true;
    },
  );
}

export function MemberShowcaseSection() {
  const specialMembers = uniqueSpecialMembers();

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Trusted By Nepal&apos;s Digital Leaders
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Special Members
            </h2>
            <p className="mt-3 text-base text-foreground-secondary">
              Leading organizations and infrastructure providers connected to NPIX,
              helping strengthen Nepal&apos;s internet ecosystem through collaboration and
              local interconnection.
            </p>
          </div>
          <Link
            href="/members"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
          >
            View All Members
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {specialMembers.map((member) => (
            <StaggerItem key={member.id}>
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-32 items-center justify-center rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Image
                  src={member.logo!}
                  alt={member.name}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
