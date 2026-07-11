export interface TrafficPanel {
  id: string;
  label: string;
  sublabel: string;
  src: string;
}

export const TRAFFIC_PANELS: TrafficPanel[] = [
  {
    id: "daily",
    label: "Daily",
    sublabel: "Last 24 Hours",
    src: "https://metrics.npix.net.np/d-solo/adrnvhf/ixp-graphs?orgId=1&from=now-1d&to=now&timezone=browser&refresh=30s&panelId=panel-3",
  },
  {
    id: "weekly",
    label: "Weekly",
    sublabel: "Last 7 Days",
    src: "https://metrics.npix.net.np/d-solo/adrnvhf/ixp-graphs?orgId=1&from=now-7d&to=now&timezone=browser&refresh=30s&panelId=panel-3",
  },
  {
    id: "monthly",
    label: "Monthly",
    sublabel: "Last 30 Days",
    src: "https://metrics.npix.net.np/d-solo/adrnvhf/ixp-graphs?orgId=1&from=now-30d&to=now&timezone=browser&refresh=30s&panelId=panel-3",
  },
  {
    id: "yearly",
    label: "Yearly",
    sublabel: "Last 365 Days",
    src: "https://metrics.npix.net.np/d-solo/adrnvhf/ixp-graphs?orgId=1&from=now-365d&to=now&timezone=browser&refresh=30s&panelId=panel-3",
  },
];
