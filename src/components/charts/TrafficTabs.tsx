"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GrafanaEmbed } from "@/components/shared/GrafanaEmbed";
import { TRAFFIC_PANELS } from "@/data/traffic-panels";

export function TrafficTabs() {
  return (
    <Tabs defaultValue={TRAFFIC_PANELS[0].id}>
      <div className="-mx-1 overflow-x-auto px-1">
        <TabsList>
          {TRAFFIC_PANELS.map((panel) => (
            <TabsTrigger key={panel.id} value={panel.id}>
              {panel.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {TRAFFIC_PANELS.map((panel) => (
        <TabsContent key={panel.id} value={panel.id}>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-foreground-secondary">
            {panel.sublabel}
          </p>
          <GrafanaEmbed
            src={panel.src}
            title={`NPIX ${panel.label.toLowerCase()} traffic, ${panel.sublabel.toLowerCase()}`}
            className="h-[300px] sm:h-[450px]"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
