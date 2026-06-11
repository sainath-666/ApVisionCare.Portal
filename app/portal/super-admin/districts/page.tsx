"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DistrictMap } from "@/components/maps/district-map";
import { DistrictBarChart } from "@/components/charts/district-bar-chart";
import { districtKPIs } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DistrictKPI } from "@/lib/types";

const cardHeaderClass = "px-4 py-3 pb-1";
const cardContentClass = "px-4 pb-4 pt-0";

export default function DistrictsPage() {
  const [selected, setSelected] = useState<DistrictKPI | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <DistrictMap districts={districtKPIs} onSelect={setSelected} />
        <Card>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="text-base">
              {selected ? selected.district : "Select a district"}
            </CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            {selected ? (
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-xs text-neutral-500">Screened</dt>
                  <dd className="text-lg font-bold">
                    {selected.screened.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Spectacles</dt>
                  <dd className="text-lg font-bold">
                    {selected.spectacles.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Referrals</dt>
                  <dd className="text-lg font-bold">
                    {selected.referrals.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Disease Burden</dt>
                  <dd className="text-lg font-bold">
                    {selected.diseaseBurden}%
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Active Camps</dt>
                  <dd className="text-lg font-bold">{selected.camps}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">SLA Breaches</dt>
                  <dd className="text-lg font-bold">{selected.slaBreaches}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-neutral-400">
                Click a district on the map to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className={cardHeaderClass}>
          <CardTitle className="text-base">District Comparison</CardTitle>
        </CardHeader>
        <CardContent className={cardContentClass}>
          <DistrictBarChart data={districtKPIs} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={cardHeaderClass}>
          <CardTitle className="text-base">All Districts</CardTitle>
        </CardHeader>
        <CardContent className={cardContentClass}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Screened</TableHead>
                <TableHead>Spectacles</TableHead>
                <TableHead>Referrals</TableHead>
                <TableHead>Camps</TableHead>
                <TableHead>SLA Breaches</TableHead>
                <TableHead>Burden</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districtKPIs.map((d) => (
                <TableRow key={d.district}>
                  <TableCell className="font-medium">{d.district}</TableCell>
                  <TableCell>{d.screened.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{d.spectacles.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{d.referrals.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{d.camps}</TableCell>
                  <TableCell>
                    <Badge variant={d.slaBreaches > 20 ? "danger" : "warning"}>
                      {d.slaBreaches}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        d.diseaseBurden > 70
                          ? "danger"
                          : d.diseaseBurden > 55
                            ? "warning"
                            : "success"
                      }
                    >
                      {d.diseaseBurden}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
