"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "next-themes";
import type { ExchangeLocation } from "@/types";

const NEPAL_CENTER: [number, number] = [28.3949, 84.124];

function createPinIcon(color: string) {
  const svg = `
    <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${color}"/>
      <circle cx="15" cy="15" r="6" fill="white"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "npix-map-pin",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  });
}

function FlyToBounds({ locations }: { locations: ExchangeLocation[] }) {
  const map = useMap();
  React.useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
  }, [locations, map]);
  return null;
}

interface NepalMapProps {
  locations: ExchangeLocation[];
  height?: number;
}

export default function NepalMap({ locations, height = 480 }: NepalMapProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const activeIcon = React.useMemo(() => createPinIcon("#0EA5E9"), []);
  const plannedIcon = React.useMemo(() => createPinIcon("#DC143C"), []);

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div
      style={{ height }}
      className="overflow-hidden rounded-xl border border-border"
    >
      <MapContainer
        center={NEPAL_CENTER}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        aria-label="Interactive map of NPIX exchange locations in Nepal"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        <FlyToBounds locations={locations} />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={loc.status === "active" ? activeIcon : plannedIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{loc.name}</p>
                <p className="text-xs text-slate-500">{loc.address}</p>
                <p className="mt-1 text-xs font-medium">
                  {loc.status === "active" ? "Active Facility" : "Planned Expansion"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
