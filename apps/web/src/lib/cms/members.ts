import type { Member } from "@/types";
import { cmsFetch } from "./config";

export interface ApiMember {
  id: string;
  name: string;
  asn: string;
  website: string | null;
  ipAddress: string | null;
  ipv6Address: string | null;
  datahubIp: string | null;
  datahubIpv6: string | null;
  category: "regular" | "special";
  logoAsset: { url: string } | null;
}

export interface MemberStats {
  totalMembers: number;
  uniqueAsns: number;
  datahubEnabled: number;
  ipv4Sessions: number;
  ipv6Sessions: number;
}

/** Maps the API's member shape back onto the original frontend `Member`
 *  contract so every existing component keeps working unchanged. */
export function toMember(m: ApiMember): Member {
  return {
    id: m.id,
    name: m.name,
    asn: m.asn,
    website: m.website ?? "",
    ipAddress: m.ipAddress ?? "",
    ipv6Address: m.ipv6Address ?? undefined,
    datahub: m.datahubIp ?? "",
    datahubIpv6: m.datahubIpv6 ?? undefined,
    category: m.category,
    logo: m.logoAsset?.url,
  };
}

export async function getMembers(): Promise<Member[]> {
  const rows = await cmsFetch<ApiMember[]>("/api/v1/members");
  return rows.map(toMember);
}

export async function getMemberStats(): Promise<MemberStats> {
  return cmsFetch<MemberStats>("/api/v1/members/stats");
}

/** Special members with a logo, de-duplicated by website — mirrors the
 *  legacy `uniqueSpecialMembers()` helper that used to run over the
 *  static MEMBERS array (e.g. Packet Clearing House has two rows sharing
 *  one website/logo, and should only be shown once). */
export function uniqueSpecialMembers(members: Member[]): Member[] {
  const seen = new Set<string>();
  return members
    .filter((member) => member.category === "special" && member.logo)
    .filter((member) => {
      if (seen.has(member.website)) return false;
      seen.add(member.website);
      return true;
    });
}
