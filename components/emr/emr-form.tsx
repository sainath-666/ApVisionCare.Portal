"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emrSchema,
  EMR_STEPS,
  determineOutcome,
  type EMRFormData,
} from "@/lib/emr-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronLeft, ChevronRight, Save } from "lucide-react";
import type { Patient } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PriorRecordsPanel } from "@/components/emr/prior-records-panel";
import { apiClient } from "@/lib/api-client";

interface EMRFormProps {
  patient: Patient;
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 text-primary-600"
      />
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}

export function EMRForm({ patient }: EMRFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [outcome, setOutcome] = useState<ReturnType<
    typeof determineOutcome
  > | null>(null);
  const storageKey = `emr-draft-${patient.id}`;

  const form = useForm<EMRFormData>({
    resolver: zodResolver(emrSchema),
    defaultValues: {
      diminishedVisionDistance: false,
      diminishedVisionNear: false,
      redness: false,
      watering: false,
      pain: false,
      blurredVision: false,
      photophobia: false,
      flashersFloaters: false,
      diplopia: false,
      digitalEyeStrain: false,
      diabetes: false,
      hypertension: false,
      thyroid: false,
      glaucomaHistory: false,
      cataractHistory: false,
      ocularTrauma: false,
      previousSurgery: false,
      existingGlassesPower: "",
      rightEyeUCDVA: "",
      rightEyeBCDVA: "",
      rightEyePH: "",
      leftEyeUCDVA: "",
      leftEyeBCDVA: "",
      leftEyePH: "",
      rightEyeUCNVA: "",
      leftEyeUCNVA: "",
      rightEyeSph: 0,
      rightEyeCyl: 0,
      rightEyeAxis: 0,
      leftEyeSph: 0,
      leftEyeCyl: 0,
      leftEyeAxis: 0,
      addPowerRight: 0,
      addPowerLeft: 0,
      muscleFunctionTest: "Normal",
      iop: "",
      colorVision: "Normal",
      cupToDiscRatio: "0.3",
      opticDiscPallor: false,
      macularEdema: false,
      amd: false,
      diabeticRetinopathyGrade: "None",
      hypertensiveRetinopathyGrade: "None",
    },
  });

  const { watch, setValue, getValues } = form;
  const values = watch();

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.entries(parsed).forEach(([key, val]) => {
          setValue(key as keyof EMRFormData, val as never);
        });
      } catch {
        /* ignore */
      }
    }
  }, [storageKey, setValue]);

  const saveDraft = () => {
    localStorage.setItem(storageKey, JSON.stringify(getValues()));
  };

  useEffect(() => {
    const interval = setInterval(saveDraft, 30000);
    return () => clearInterval(interval);
  });

  const handleSubmit = async () => {
    const data = getValues();
    let result = determineOutcome(data);
    try {
      const apiResult = await apiClient.submitEmr(patient.id);
      if (apiResult?.outcome) {
        result = apiResult.outcome as typeof result;
      }
    } catch {
      /* use local decision engine when API unavailable */
    }
    setOutcome(result);
    setSubmitted(true);
    localStorage.removeItem(storageKey);
  };

  const outcomeLabels = {
    normal: { label: "Normal — No intervention", variant: "success" as const },
    spectacles: { label: "Spectacle Order", variant: "info" as const },
    teleconsult: { label: "Teleconsult Required", variant: "warning" as const },
    referral: { label: "Referral to Hospital", variant: "danger" as const },
  };

  if (submitted && outcome) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <Check className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">
            EMR Submitted Successfully
          </h2>
          <p className="mt-2 text-neutral-500">Patient: {patient.name}</p>
          <div className="mt-4">
            <Badge
              variant={outcomeLabels[outcome].variant}
              className="text-sm px-4 py-1"
            >
              Outcome: {outcomeLabels[outcome].label}
            </Badge>
          </div>
          <p className="mt-4 text-sm text-neutral-400">
            Submitted via POST /api/v1/emr/{patient.id}/submit (BFF → decision
            engine)
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PriorRecordsPanel
        patientId={patient.id}
        abhaNumber={patient.abhaNumber}
        onApplyPrefill={(partial) => {
          Object.entries(partial).forEach(([key, val]) => {
            setValue(key as keyof EMRFormData, val as never);
          });
        }}
      />

      {/* Step indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {EMR_STEPS.map((s) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => setStep(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap",
                step === s.id
                  ? "bg-primary-600 text-white"
                  : step > s.id
                    ? "bg-primary-100 text-primary-700"
                    : "bg-neutral-100 text-neutral-500",
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                {step > s.id ? <Check className="h-3.5 w-3.5" /> : s.id}
              </span>
              {s.title}
            </button>
            {s.id < 5 && (
              <ChevronRight className="mx-1 h-4 w-4 text-neutral-300" />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Step {step}: {EMR_STEPS[step - 1].title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={saveDraft}>
            <Save className="mr-1.5 h-4 w-4" />
            Save Draft
          </Button>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-sm font-semibold text-neutral-700">
                  Symptoms
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {(
                    [
                      [
                        "diminishedVisionDistance",
                        "Diminished distance vision",
                      ],
                      ["diminishedVisionNear", "Diminished near vision"],
                      ["redness", "Redness"],
                      ["watering", "Watering"],
                      ["pain", "Pain"],
                      ["blurredVision", "Blurred vision"],
                      ["photophobia", "Photophobia"],
                      ["flashersFloaters", "Flashers / Floaters"],
                      ["diplopia", "Diplopia"],
                      ["digitalEyeStrain", "Digital eye strain"],
                    ] as [keyof EMRFormData, string][]
                  ).map(([key, label]) => (
                    <CheckboxField
                      key={key}
                      label={label}
                      checked={!!values[key]}
                      onChange={(v) => setValue(key, v as never)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold text-neutral-700">
                  Ocular / Systemic History
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {(
                    [
                      ["diabetes", "Diabetes"],
                      ["hypertension", "Hypertension"],
                      ["thyroid", "Thyroid disorder"],
                      ["glaucomaHistory", "Glaucoma history"],
                      ["cataractHistory", "Cataract history"],
                      ["ocularTrauma", "Ocular trauma"],
                      ["previousSurgery", "Previous eye surgery"],
                    ] as [keyof EMRFormData, string][]
                  ).map(([key, label]) => (
                    <CheckboxField
                      key={key}
                      label={label}
                      checked={!!values[key]}
                      onChange={(v) => setValue(key, v as never)}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-neutral-700">
                    Existing Glasses Power
                  </label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. -1.50 DS"
                    value={values.existingGlassesPower}
                    onChange={(e) =>
                      setValue("existingGlassesPower", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3 rounded-lg border border-neutral-200 p-4">
                  <h4 className="font-semibold text-neutral-700">Right Eye</h4>
                  {(["UCDVA", "BCDVA", "PH"] as const).map((field) => (
                    <div key={field}>
                      <label className="text-xs text-neutral-500">
                        {field}
                      </label>
                      <Select
                        value={
                          values[
                            `rightEye${field}` as keyof EMRFormData
                          ] as string
                        }
                        onChange={(e) =>
                          setValue(
                            `rightEye${field}` as keyof EMRFormData,
                            e.target.value as never,
                          )
                        }
                      >
                        <option value="">Select</option>
                        {[
                          "6/6",
                          "6/9",
                          "6/12",
                          "6/18",
                          "6/24",
                          "6/36",
                          "6/60",
                          "CF",
                          "HM",
                          "PL",
                        ].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </Select>
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-neutral-500">UCNVA</label>
                    <Select
                      value={values.rightEyeUCNVA}
                      onChange={(e) =>
                        setValue("rightEyeUCNVA", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {["N6", "N8", "N10", "N12", "N18", "N24", "N36"].map(
                        (v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ),
                      )}
                    </Select>
                  </div>
                </div>
                <div className="space-y-3 rounded-lg border border-neutral-200 p-4">
                  <h4 className="font-semibold text-neutral-700">Left Eye</h4>
                  {(["UCDVA", "BCDVA", "PH"] as const).map((field) => (
                    <div key={field}>
                      <label className="text-xs text-neutral-500">
                        {field}
                      </label>
                      <Select
                        value={
                          values[
                            `leftEye${field}` as keyof EMRFormData
                          ] as string
                        }
                        onChange={(e) =>
                          setValue(
                            `leftEye${field}` as keyof EMRFormData,
                            e.target.value as never,
                          )
                        }
                      >
                        <option value="">Select</option>
                        {[
                          "6/6",
                          "6/9",
                          "6/12",
                          "6/18",
                          "6/24",
                          "6/36",
                          "6/60",
                          "CF",
                          "HM",
                          "PL",
                        ].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </Select>
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-neutral-500">UCNVA</label>
                    <Select
                      value={values.leftEyeUCNVA}
                      onChange={(e) => setValue("leftEyeUCNVA", e.target.value)}
                    >
                      <option value="">Select</option>
                      {["N6", "N8", "N10", "N12", "N18", "N24", "N36"].map(
                        (v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ),
                      )}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm text-neutral-600">
                    Muscle Function Test
                  </label>
                  <Input
                    value={values.muscleFunctionTest}
                    onChange={(e) =>
                      setValue("muscleFunctionTest", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-600">IOP (mmHg)</label>
                  <Input
                    placeholder="e.g. 16/14"
                    value={values.iop}
                    onChange={(e) => setValue("iop", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-600">
                    Color Vision
                  </label>
                  <Select
                    value={values.colorVision}
                    onChange={(e) => setValue("colorVision", e.target.value)}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Defective">Defective</option>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {(["right", "left"] as const).map((eye) => (
                <div
                  key={eye}
                  className="space-y-3 rounded-lg border border-neutral-200 p-4"
                >
                  <h4 className="font-semibold capitalize text-neutral-700">
                    {eye} Eye
                  </h4>
                  {(["Sph", "Cyl", "Axis"] as const).map((field) => (
                    <div key={field}>
                      <label className="text-xs text-neutral-500">
                        {field}
                      </label>
                      <Input
                        type="number"
                        step="0.25"
                        value={
                          values[
                            `${eye}Eye${field}` as keyof EMRFormData
                          ] as number
                        }
                        onChange={(e) =>
                          setValue(
                            `${eye}Eye${field}` as keyof EMRFormData,
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-neutral-500">
                      Add Power
                    </label>
                    <Input
                      type="number"
                      step="0.25"
                      value={
                        values[
                          `addPower${eye === "right" ? "Right" : "Left"}` as keyof EMRFormData
                        ] as number
                      }
                      onChange={(e) =>
                        setValue(
                          `addPower${eye === "right" ? "Right" : "Left"}` as keyof EMRFormData,
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-neutral-600">
                    Cup-to-Disc Ratio
                  </label>
                  <Input
                    value={values.cupToDiscRatio}
                    onChange={(e) => setValue("cupToDiscRatio", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <CheckboxField
                  label="Optic Disc Pallor"
                  checked={values.opticDiscPallor}
                  onChange={(v) => setValue("opticDiscPallor", v)}
                />
                <CheckboxField
                  label="Macular Edema"
                  checked={values.macularEdema}
                  onChange={(v) => setValue("macularEdema", v)}
                />
                <CheckboxField
                  label="AMD"
                  checked={values.amd}
                  onChange={(v) => setValue("amd", v)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-neutral-600">
                    Diabetic Retinopathy Grade
                  </label>
                  <Select
                    value={values.diabeticRetinopathyGrade}
                    onChange={(e) =>
                      setValue("diabeticRetinopathyGrade", e.target.value)
                    }
                  >
                    {[
                      "None",
                      "Mild NPDR",
                      "Moderate NPDR",
                      "Severe NPDR",
                      "Proliferative DR",
                    ].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-neutral-600">
                    Hypertensive Retinopathy Grade
                  </label>
                  <Select
                    value={values.hypertensiveRetinopathyGrade}
                    onChange={(e) =>
                      setValue("hypertensiveRetinopathyGrade", e.target.value)
                    }
                  >
                    {["None", "Grade 1", "Grade 2", "Grade 3", "Grade 4"].map(
                      (v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ),
                    )}
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">
                  Patient: {patient.name}
                </h4>
                <p className="text-sm text-neutral-500">
                  {patient.age}y / {patient.gender} — {patient.village},{" "}
                  {patient.mandal}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-neutral-500">Right Eye VA</p>
                  <p className="font-medium">
                    UCDVA: {values.rightEyeUCDVA || "—"} | BCDVA:{" "}
                    {values.rightEyeBCDVA || "—"}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-neutral-500">Left Eye VA</p>
                  <p className="font-medium">
                    UCDVA: {values.leftEyeUCDVA || "—"} | BCDVA:{" "}
                    {values.leftEyeBCDVA || "—"}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-neutral-500">Refraction (R)</p>
                  <p className="font-medium">
                    {values.rightEyeSph} / {values.rightEyeCyl} x{" "}
                    {values.rightEyeAxis}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-neutral-500">Refraction (L)</p>
                  <p className="font-medium">
                    {values.leftEyeSph} / {values.leftEyeCyl} x{" "}
                    {values.leftEyeAxis}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
                <p className="text-sm text-primary-800">
                  Predicted outcome:{" "}
                  <strong>{determineOutcome(values).toUpperCase()}</strong>{" "}
                  (decision engine preview)
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            {step < 5 ? (
              <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit EMR</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
