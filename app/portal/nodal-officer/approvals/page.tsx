"use client";

import { useState } from "react";
import { Check, FileCheck2, X } from "lucide-react";
import { EmrSummary } from "@/components/emr/emr-summary";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { emrs } from "@/lib/mock-data";
import type { EMRStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const DISTRICT = "Guntur";

export default function ApprovalsPage() {
  const initial = emrs.filter(
    (e) => e.district === DISTRICT && e.status === "submitted",
  );
  const [decisions, setDecisions] = useState<Record<string, EMRStatus>>({});
  const [selectedId, setSelectedId] = useState<string | null>(
    initial[0]?.id ?? null,
  );
  const [note, setNote] = useState("");

  const queue = initial.filter((e) => !decisions[e.id]);
  const selected = emrs.find((e) => e.id === selectedId) ?? null;

  function decide(status: EMRStatus) {
    if (!selected) return;
    setDecisions((d) => ({ ...d, [selected.id]: status }));
    setNote("");
    const next = queue.find((e) => e.id !== selected.id);
    setSelectedId(next?.id ?? null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescription Approvals"
        description="Review submitted EMRs and approve or reject the screening outcome"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Queue</CardTitle>
            <CardDescription>{queue.length} awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {queue.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-neutral-500">
                <FileCheck2 className="size-8 text-primary-600" />
                All caught up!
              </div>
            )}
            {queue.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedId(e.id)}
                className={cn(
                  "w-full rounded-lg border p-3 text-left transition-colors",
                  selectedId === e.id
                    ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                    : "hover:bg-neutral-100",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{e.patientName}</p>
                  <StatusBadge status={e.outcome} />
                </div>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {e.id} · {e.campName}
                </p>
              </button>
            ))}

            {Object.keys(decisions).length > 0 && (
              <div className="pt-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Recently decided
                </p>
                {Object.entries(decisions).map(([id, status]) => {
                  const e = emrs.find((x) => x.id === id)!;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between rounded-md px-1 py-1.5 text-sm"
                    >
                      <span className="text-neutral-500">{e.patientName}</span>
                      <StatusBadge status={status} />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          {selected ? (
            <>
              <CardHeader>
                <CardTitle>{selected.patientName}</CardTitle>
                <CardDescription>
                  {selected.id} · {selected.campName} ·{" "}
                  {selected.screeningTeamName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <EmrSummary emr={selected} />
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a note for the screening team (optional)…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button
                      variant="success"
                      className="flex-1"
                      onClick={() => decide("approved")}
                    >
                      <Check />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => decide("rejected")}
                    >
                      <X />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex h-full items-center justify-center py-20 text-sm text-neutral-500">
              Select an EMR from the queue to review.
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
