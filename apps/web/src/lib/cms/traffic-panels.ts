import type { TrafficPanel } from "@/data/traffic-panels";

export interface ApiTrafficPanel {
  id: string;
  label: string;
  sublabel: string;
  embedUrl: string;
}

export function toTrafficPanel(panel: ApiTrafficPanel): TrafficPanel {
  return { id: panel.id, label: panel.label, sublabel: panel.sublabel, src: panel.embedUrl };
}
