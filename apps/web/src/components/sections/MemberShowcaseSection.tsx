import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { uniqueSpecialMembers } from "@/lib/cms/members";
import { chunkIntoRows } from "@/lib/utils";
import type { Member } from "@/types";

const ROW_SIZE = 4;

export function MemberShowcaseSection({ members }: { members: Member[] }) {
  const specialMembers = uniqueSpecialMembers(members);

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-coral-text">
              Trusted By Nepal&apos;s Digital Leaders
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Special Members
            </h2>
            <p className="mt-3 text-base text-text-secondary">
              Leading organizations and infrastructure providers connected to NPIX,
              helping strengthen Nepal&apos;s internet ecosystem through collaboration and
              local interconnection.
            </p>
          </div>
          <Link
            href="/members"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-coral-text"
          >
            View All Members
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-8 flex flex-col gap-4">
          {chunkIntoRows(specialMembers, ROW_SIZE).map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col gap-4 sm:flex-row">
              {row.map((member) => (
                <StaggerItem key={member.id} className="min-w-0 sm:flex-1">
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
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
