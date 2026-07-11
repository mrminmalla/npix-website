"use client";

import * as React from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { MemberTable } from "@/components/tables/MemberTable";
import type { Member } from "@/types";

export function MembersDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return members
      .filter((member) => {
        return (
          q === "" ||
          member.name.toLowerCase().includes(q) ||
          member.asn.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, query]);

  return (
    <div>
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by company name or ASN..."
        aria-label="Search members"
        className="w-full sm:max-w-sm"
      />

      <p className="mt-5 text-sm text-foreground-secondary">
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
