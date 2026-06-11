"use client";

import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import type { DistrictKPI } from "@/lib/types";
import { ScrollWheelZoomOnHover } from "./scroll-wheel-zoom-on-hover";
import {
  BRAND_BLUE,
  BRAND_GRAY,
  BRAND_RED,
  PRIMARY_600,
} from "@/lib/chart-colors";
import "leaflet/dist/leaflet.css";

interface DistrictMapLeafletProps {
  districts: DistrictKPI[];
  onSelect?: (district: DistrictKPI) => void;
}

function burdenColor(burden: number, max: number): string {
  const ratio = burden / max;
  if (ratio > 0.8) return BRAND_RED;
  if (ratio > 0.6) return PRIMARY_600;
  if (ratio > 0.4) return BRAND_GRAY;
  return BRAND_BLUE;
}

export function DistrictMapLeaflet({
  districts,
  onSelect,
}: DistrictMapLeafletProps) {
  const maxBurden = useMemo(
    () => Math.max(...districts.map((d) => d.diseaseBurden), 1),
    [districts],
  );

  const center = useMemo((): [number, number] => {
    const avgLat = districts.reduce((s, d) => s + d.lat, 0) / districts.length;
    const avgLng = districts.reduce((s, d) => s + d.lng, 0) / districts.length;
    return [avgLat, avgLng];
  }, [districts]);

  return (
    <div className="h-[400px] overflow-hidden rounded-lg">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <ScrollWheelZoomOnHover />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {districts.map((d) => {
          const radius = 8 + (d.diseaseBurden / maxBurden) * 16;
          return (
            <CircleMarker
              key={d.district}
              center={[d.lat, d.lng]}
              radius={radius}
              pathOptions={{
                color: burdenColor(d.diseaseBurden, maxBurden),
                fillColor: burdenColor(d.diseaseBurden, maxBurden),
                fillOpacity: 0.65,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onSelect?.(d),
              }}
            >
              <Tooltip>{d.district}</Tooltip>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{d.district}</p>
                  <p>Screened: {d.screened.toLocaleString()}</p>
                  <p>Disease burden: {d.diseaseBurden}%</p>
                  <p>SLA breaches: {d.slaBreaches}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
