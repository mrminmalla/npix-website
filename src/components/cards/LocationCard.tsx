import { MapPin, Server, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ExchangeLocation } from "@/types";
import { cn } from "@/lib/utils";

export function LocationCard({
  location,
  className,
}: {
  location: ExchangeLocation;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{location.name}</h3>
        <Badge variant={location.status === "active" ? "success" : "outline"}>
          {location.status === "active" ? "Active" : "Planned"}
        </Badge>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-foreground-secondary">{location.address}</dd>
        </div>
        <div className="flex items-start gap-2">
          <Server className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-foreground-secondary">{location.capacity}</dd>
        </div>
        <div className="flex items-start gap-2">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <dd>
            <a href={`mailto:${location.contactEmail}`} className="text-foreground-secondary hover:text-secondary">
              {location.contactEmail}
            </a>
          </dd>
        </div>
        <div className="flex items-start gap-2">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <dd>
            <a href={`tel:${location.contactPhone}`} className="text-foreground-secondary hover:text-secondary">
              {location.contactPhone}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
