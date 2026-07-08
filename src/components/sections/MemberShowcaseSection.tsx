"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { FadeIn } from "@/components/shared/FadeIn";
import { MEMBERS, MEMBER_CATEGORIES } from "@/data/members";

export function MemberShowcaseSection() {
  const [active, setActive] = React.useState(MEMBER_CATEGORIES[0].value);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Trusted By Nepal&apos;s Digital Leaders
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Members
            </h2>
          </div>
          <Link
            href="/members"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
          >
            View All Members
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <div className="mt-10">
          <Tabs
            value={active}
            onValueChange={(v) => setActive(v as typeof active)}
          >
            <TabsList className="flex-wrap justify-start">
              {MEMBER_CATEGORIES.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {MEMBER_CATEGORIES.map((cat) => (
              <TabsContent key={cat.value} value={cat.value}>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {MEMBERS.filter((m) => m.category === cat.value).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <InitialsAvatar name={member.name} className="h-10 w-10 shrink-0 text-xs" />
                      <span className="truncate text-sm font-medium text-foreground">
                        {member.name}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
