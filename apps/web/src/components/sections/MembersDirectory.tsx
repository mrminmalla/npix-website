"use client";

import * as React from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { MemberTable } from "@/components/tables/MemberTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Member } from "@/types";

type Site = "All" | "Access World" | "Datahub";

export function MembersDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = React.useState("");
  const [site, setSite] = React.useState<Site>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return members
      .filter((member) => {
        const matchesQuery =
          q === "" ||
          member.name.toLowerCase().includes(q) ||
          member.asn.toLowerCase().includes(q);
        const matchesSite =
          site === "All" ||
          (site === "Access World" && !!member.ipAddress) ||
          (site === "Datahub" && !!member.datahub);
        return matchesQuery && matchesSite;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, query, site]);

  return (
    <div>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by company name or ASN..."
          aria-label="Search members"
          className="w-full sm:max-w-sm"
        />

        <Select value={site} onValueChange={(value) => setSite(value as Site)}>
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by site">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All sites</SelectItem>
            <SelectItem value="Access World">Access World</SelectItem>
            <SelectItem value="Datahub">Datahub</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mt-5 text-sm text-foreground">
        Showing {filtered.length} of {members.length} members, sorted alphabetically
      </p>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            title="No members found"
            description="Try adjusting your search to find what you're looking for."
          />
        ) : (
          <MemberTable members={filtered} />
        )}
      </div>
    </div>
  );
}
