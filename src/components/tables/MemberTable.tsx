import type { Member } from "@/types";

export function MemberTable({ members }: { members: Member[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left">
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              Name
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              AS
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              IP Address
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-foreground">
              Datahub
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-border last:border-b-0 hover:bg-surface/60"
            >
              <td className="px-5 py-3.5 font-medium">
                {member.website ? (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary hover:underline"
                  >
                    {member.name}
                  </a>
                ) : (
                  <span className="text-foreground">{member.name}</span>
                )}
              </td>
              <td className="px-5 py-3.5 font-mono text-foreground-secondary">
                {member.asn}
              </td>
              <td className="px-5 py-3.5 font-mono text-foreground-secondary">
                {member.ipAddress || <span>&mdash;</span>}
                {member.ipv6Address && (
                  <span className="block text-xs text-foreground-secondary/70">
                    {member.ipv6Address}
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5 font-mono text-foreground-secondary">
                {member.datahub || <span>&mdash;</span>}
                {member.datahubIpv6 && (
                  <span className="block text-xs text-foreground-secondary/70">
                    {member.datahubIpv6}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
