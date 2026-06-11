"use client";

import dynamic from "next/dynamic";
import type { DistrictKPI } from "@/lib/types";

const DistrictMapLeaflet = dynamic(
  () => import("./district-map-leaflet").then((m) => m.DistrictMapLeaflet),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <p className="text-sm text-neutral-500">Loading map…</p>
      </div>
    ),
  },
);

interface DistrictMapProps {
  districts: DistrictKPI[];
  onSelect?: (district: DistrictKPI) => void;
}

export function DistrictMap({ districts, onSelect }: DistrictMapProps) {
  return <DistrictMapLeaflet districts={districts} onSelect={onSelect} />;
}
