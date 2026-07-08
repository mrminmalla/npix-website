import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";
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

export function MemberTable({ members }: { members: Member[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left">
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              Company
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              Category
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              ASN
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              IPv6
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              Member Since
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              Website
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const categoryLabel =
              MEMBER_CATEGORIES.find((c) => c.value === member.category)?.label ??
              member.category;
            return (
              <tr
                key={member.id}
                className="border-b border-border last:border-b-0 hover:bg-surface/60"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={member.name} className="h-8 w-8 text-xs" />
                    <span className="font-medium text-foreground">{member.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant="outline">{categoryLabel}</Badge>
                </td>
                <td className="px-5 py-3.5 font-mono text-foreground-secondary">
                  {member.asn}
                </td>
                <td className="px-5 py-3.5">
                  {member.ipv6Support ? (
                    <CheckCircle2 className="h-4 w-4 text-success" aria-label="IPv6 supported" />
                  ) : (
                    <XCircle
                      className="h-4 w-4 text-foreground-secondary"
                      aria-label="IPv6 not supported"
                    />
                  )}
                </td>
                <td className="px-5 py-3.5 text-foreground-secondary">
                  {formatDate(member.memberSince)}
                </td>
                <td className="px-5 py-3.5">
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-secondary hover:text-primary"
                  >
                    Visit <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
