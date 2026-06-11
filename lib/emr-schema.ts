import { z } from "zod";

export const emrSchema = z.object({
  diminishedVisionDistance: z.boolean().default(false),
  diminishedVisionNear: z.boolean().default(false),
  redness: z.boolean().default(false),
  watering: z.boolean().default(false),
  pain: z.boolean().default(false),
  blurredVision: z.boolean().default(false),
  photophobia: z.boolean().default(false),
  flashersFloaters: z.boolean().default(false),
  diplopia: z.boolean().default(false),
  digitalEyeStrain: z.boolean().default(false),
  diabetes: z.boolean().default(false),
  hypertension: z.boolean().default(false),
  thyroid: z.boolean().default(false),
  glaucomaHistory: z.boolean().default(false),
  cataractHistory: z.boolean().default(false),
  ocularTrauma: z.boolean().default(false),
  previousSurgery: z.boolean().default(false),
  existingGlassesPower: z.string().default(""),
  rightEyeUCDVA: z.string().min(1, "Required"),
  rightEyeBCDVA: z.string().default(""),
  rightEyePH: z.string().default(""),
  leftEyeUCDVA: z.string().min(1, "Required"),
  leftEyeBCDVA: z.string().default(""),
  leftEyePH: z.string().default(""),
  rightEyeUCNVA: z.string().default(""),
  leftEyeUCNVA: z.string().default(""),
  rightEyeSph: z.coerce.number().default(0),
  rightEyeCyl: z.coerce.number().default(0),
  rightEyeAxis: z.coerce.number().min(0).max(180).default(0),
  leftEyeSph: z.coerce.number().default(0),
  leftEyeCyl: z.coerce.number().default(0),
  leftEyeAxis: z.coerce.number().min(0).max(180).default(0),
  addPowerRight: z.coerce.number().default(0),
  addPowerLeft: z.coerce.number().default(0),
  muscleFunctionTest: z.string().default("Normal"),
  iop: z.string().default(""),
  colorVision: z.string().default("Normal"),
  cupToDiscRatio: z.string().default(""),
  opticDiscPallor: z.boolean().default(false),
  macularEdema: z.boolean().default(false),
  amd: z.boolean().default(false),
  diabeticRetinopathyGrade: z.string().default("None"),
  hypertensiveRetinopathyGrade: z.string().default("None"),
});

export type EMRFormData = z.infer<typeof emrSchema>;

export const EMR_STEPS = [
  { id: 1, title: "Symptoms & History", fields: ["symptoms", "history"] },
  { id: 2, title: "Vision Assessment", fields: ["vision"] },
  { id: 3, title: "Refraction", fields: ["refraction"] },
  { id: 4, title: "Fundus / Retinal", fields: ["fundus"] },
  { id: 5, title: "Review & Submit", fields: ["review"] },
] as const;

export function determineOutcome(
  data: EMRFormData,
): "normal" | "spectacles" | "teleconsult" | "referral" {
  const drGrade = data.diabeticRetinopathyGrade;
  if (
    drGrade.includes("Moderate") ||
    drGrade.includes("Severe") ||
    drGrade.includes("Proliferative")
  ) {
    return "referral";
  }
  if (data.macularEdema || data.opticDiscPallor) {
    return "referral";
  }
  const parseVA = (va: string) => {
    const match = va.match(/6\/(\d+)/);
    return match ? parseInt(match[1]) : 6;
  };
  const rightBad = parseVA(data.rightEyeUCDVA) > 18;
  const leftBad = parseVA(data.leftEyeUCDVA) > 18;
  if (rightBad || leftBad) {
    if (data.diabetes || data.hypertension) return "teleconsult";
    return "spectacles";
  }
  return "normal";
}
