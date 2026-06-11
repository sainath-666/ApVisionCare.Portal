"use client";

import { useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import type { Camp, CampType } from "@/lib/types";
import { formatDate, percent } from "@/lib/utils";

const TYPE_LABEL: Record<CampType, string> = {
  village: "Village",
  tribal: "Tribal",
  urban_slum: "Urban Slum",
  school: "School",
  industrial: "Industrial",
};

const SUMMARY_CARDS = [
  { label: "Total Camps", key: "total", color: "text-primary-700" },
  { label: "Active", key: "active", color: "text-primary-700" },
  { label: "Scheduled", key: "scheduled", color: "text-neutral-700" },
  { label: "Completed", key: "completed", color: "text-neutral-700" },
] as const;

export function CampsView({ camps }: { camps: Camp[] }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = camps.filter((c) => {
    const matchQ = `${c.name} ${c.district} ${c.village}`
      .toLowerCase()
      .includes(q.toLowerCase());
    const matchS = status === "all" || c.status === status;
    return matchQ && matchS;
  });

  const summaryCounts = {
    total: camps.length,
    active: camps.filter((c) => c.status === "active").length,
    scheduled: camps.filter((c) => c.status === "scheduled").length,
    completed: camps.filter((c) => c.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-20 -mx-4 border-b border-neutral-100 bg-background/95 px-4 pb-4 pt-1 backdrop-blur-sm lg:-mx-6 lg:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {SUMMARY_CARDS.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <p className={`text-3xl font-bold ${s.color}`}>
                  {summaryCounts[s.key]}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search camps…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="sm:w-48"
        >
          <option value="all">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => {
          const prog = percent(c.screenedCount, c.patientCount);
          return (
            <Card key={c.id} className="transition-shadow hover:shadow-md">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold leading-tight">{c.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{c.id}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <Badge variant="secondary">{TYPE_LABEL[c.type]}</Badge>
                <div className="space-y-1.5 text-sm text-neutral-500">
                  <p className="flex items-center gap-2">
                    <MapPin className="size-3.5 shrink-0" />
                    {c.village}, {c.mandal}, {c.district}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="size-3.5 shrink-0" />
                    {formatDate(c.scheduledDate)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="size-3.5 shrink-0" />
                    {c.teamName}
                  </p>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-neutral-500">Screened</span>
                    <span className="font-medium text-neutral-900">
                      {c.screenedCount}/{c.patientCount}
                    </span>
                  </div>
                  <Progress
                    value={prog}
                    indicatorClassName={
                      c.status === "completed" ? "bg-primary-600" : undefined
                    }
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-neutral-500">
          No camps match your filters.
        </p>
      )}
    </div>
  );
}
