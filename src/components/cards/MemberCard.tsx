import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { Badge } from "@/components/ui/badge";
import type { Member } from "@/types";
import { MEMBER_CATEGORIES } from "@/data/members";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function MemberCard({ member }: { member: Member }) {
  const categoryLabel =
    MEMBER_CATEGORIES.find((c) => c.value === member.category)?.label ?? member.category;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <InitialsAvatar name={member.name} className="h-12 w-12 text-sm" />
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">{member.name}</h3>
          <Badge variant="outline" className="mt-1.5">
            {categoryLabel}
          </Badge>
        </div>
      </div>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-foreground-secondary">ASN</dt>
          <dd className="font-mono font-medium text-foreground">{member.asn}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-foreground-secondary">IPv6 Support</dt>
          <dd>
            {member.ipv6Support ? (
              <span className="inline-flex items-center gap-1 font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Yes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-medium text-foreground-secondary">
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> No
              </span>
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-foreground-secondary">Member Since</dt>
          <dd className="font-medium text-foreground">{formatDate(member.memberSince)}</dd>
        </div>
      </dl>

      <a
        href={member.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
      >
        Visit Website
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
