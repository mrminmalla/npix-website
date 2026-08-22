import { GitBranch, Router } from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { ProtocolBar } from "@/components/charts/ProtocolBar";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { PROTOCOL_ADOPTION } from "@/data/stats";

export function ProtocolAdoptionSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            IPv4 &amp; IPv6
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Protocol Adoption
          </h2>
          <p className="mt-4 text-base text-foreground-secondary">
            Overview of IPv4 and IPv6 traffic exchanged through NPIX.
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-xl border border-border bg-background p-6 shadow-sm">
              <h3 className="text-base font-semibold text-foreground">
                Traffic Share by Protocol
              </h3>
              <div className="mt-6 space-y-5">
                <ProtocolBar
                  label="IPv4"
                  percent={PROTOCOL_ADOPTION.ipv4SharePercent}
                  colorClassName="bg-secondary"
                />
                <ProtocolBar
                  label="IPv6"
                  percent={PROTOCOL_ADOPTION.ipv6SharePercent}
                  colorClassName="bg-accent"
                />
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <StaggerItem>
              <StatCard
                label="IPv4 Sessions"
                value={PROTOCOL_ADOPTION.ipv4Sessions}
                icon={GitBranch}
                description="Members peering over IPv4."
                className="h-full"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="IPv6 Sessions"
                value={PROTOCOL_ADOPTION.ipv6Sessions}
                icon={Router}
                description="Members peering over IPv6."
                className="h-full"
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
