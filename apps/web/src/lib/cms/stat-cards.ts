import type { StatDatum } from "@/types";
import { resolveIcon } from "./icons";

export interface ApiStatCard {
  id: string;
  label: string;
  value: number;
  prefix: string | null;
  suffix: string | null;
  decimals: number;
  iconName: string;
  description: string | null;
}

export function toStatDatum(stat: ApiStatCard): StatDatum {
  return {
    id: stat.id,
    label: stat.label,
    value: stat.value,
    prefix: stat.prefix ?? undefined,
    suffix: stat.suffix ?? undefined,
    decimals: stat.decimals,
    description: stat.description ?? undefined,
    icon: resolveIcon(stat.iconName),
  };
}
