"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { getMockPriorRecords } from "@/lib/mock-prior-records";
import { useEmrStore } from "@/lib/stores/emr-store";
import type { PriorHealthSummary } from "@/lib/types";
import type { EMRFormData } from "@/lib/emr-schema";
import { FileText, RefreshCw } from "lucide-react";

interface PriorRecordsPanelProps {
  patientId: string;
  abhaNumber?: string;
  onApplyPrefill: (partial: Partial<EMRFormData>) => void;
}

export function PriorRecordsPanel({
  patientId,
  abhaNumber,
  onApplyPrefill,
}: PriorRecordsPanelProps) {
  const stored = useEmrStore((s) => s.priorRecords[patientId]);
  const setPriorRecords = useEmrStore((s) => s.setPriorRecords);
  const [summary, setSummary] = useState<PriorHealthSummary | undefined>(
    stored,
  );
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = (await apiClient.fetchPriorRecords(
        patientId,
      )) as PriorHealthSummary;
      setSummary(data);
      setPriorRecords(patientId, data);
    } catch {
      const mock = getMockPriorRecords(patientId);
      if (mock) {
        setSummary(mock);
        setPriorRecords(patientId, mock);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!summary && abhaNumber) {
      fetchRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, abhaNumber]);

  const applyToForm = () => {
    if (!summary) return;
    const partial: Partial<EMRFormData> = {
      diabetes: summary.diabetes.confirmed,
      hypertension: summary.hypertension.confirmed,
      previousSurgery: summary.previousSurgeries.length > 0,
      cataractHistory: summary.previousEyeConditions.some((c) =>
        c.toLowerCase().includes("cataract"),
      ),
      glaucomaHistory: summary.previousEyeConditions.some((c) =>
        c.toLowerCase().includes("glaucoma"),
      ),
    };
    if (summary.existingSpectaclePrescription) {
      const rx = summary.existingSpectaclePrescription;
      partial.rightEyeSph = rx.rightEye.sph;
      partial.rightEyeCyl = rx.rightEye.cyl;
      partial.rightEyeAxis = rx.rightEye.axis;
      partial.leftEyeSph = rx.leftEye.sph;
      partial.leftEyeCyl = rx.leftEye.cyl;
      partial.leftEyeAxis = rx.leftEye.axis;
    }
    if (summary.previousVisualAcuity) {
      partial.rightEyeUCDVA = summary.previousVisualAcuity.rightEye;
      partial.leftEyeUCDVA = summary.previousVisualAcuity.leftEye;
    }
    onApplyPrefill(partial);
    setApplied(true);
  };

  if (!abhaNumber) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-4 text-sm text-neutral-500">
          Link ABHA to fetch prior health records (M3 HIU consent flow).
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary-200 bg-primary-50/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Prior Health Records (ABDM M3)
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchRecords}
          disabled={loading}
        >
          <RefreshCw
            className={`mr-1 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {!summary && !loading && (
          <p className="text-neutral-500">No prior records loaded.</p>
        )}
        {loading && <p className="text-neutral-500">Fetching from HIU…</p>}
        {summary && (
          <>
            <div className="flex flex-wrap gap-2">
              {summary.diabetes.confirmed && (
                <Badge variant="warning">
                  Diabetes
                  {summary.diabetes.hba1c
                    ? ` HbA1c ${summary.diabetes.hba1c}%`
                    : ""}
                </Badge>
              )}
              {summary.hypertension.confirmed && (
                <Badge variant="warning">Hypertension</Badge>
              )}
              {summary.previousEyeConditions.map((c) => (
                <Badge key={c} variant="info">
                  {c}
                </Badge>
              ))}
            </div>
            {summary.currentMedications.length > 0 && (
              <p>
                <span className="text-neutral-500">Medications:</span>{" "}
                {summary.currentMedications.join(", ")}
              </p>
            )}
            {summary.existingSpectaclePrescription && (
              <p>
                <span className="text-neutral-500">Last Rx:</span> R{" "}
                {summary.existingSpectaclePrescription.rightEye.sph}/
                {summary.existingSpectaclePrescription.rightEye.cyl}×
                {summary.existingSpectaclePrescription.rightEye.axis}, L{" "}
                {summary.existingSpectaclePrescription.leftEye.sph}/
                {summary.existingSpectaclePrescription.leftEye.cyl}×
                {summary.existingSpectaclePrescription.leftEye.axis}
              </p>
            )}
            <Button
              size="sm"
              onClick={applyToForm}
              disabled={applied}
              className="w-full sm:w-auto"
            >
              {applied ? "Applied to EMR" : "Apply to EMR Form"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
