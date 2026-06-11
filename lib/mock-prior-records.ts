import type { PriorHealthSummary } from "./types";

export const mockPriorRecords: Record<string, PriorHealthSummary> = {
  "pat-001": {
    diabetes: { confirmed: true, hba1c: 7.2, lastTestedAt: "2025-11-15" },
    hypertension: { confirmed: true, lastBpReading: "140/90" },
    previousEyeConditions: ["Cataract (left eye, 2020)"],
    previousSurgeries: ["Cataract surgery — left eye, 2020"],
    currentMedications: ["Metformin 500mg", "Amlodipine 5mg"],
    existingSpectaclePrescription: {
      rightEye: { sph: -1.5, cyl: -0.5, axis: 90 },
      leftEye: { sph: -2.0, cyl: -0.75, axis: 85 },
      prescribedAt: "2024-08-10",
      prescribingProvider: "Dr. K. Rao, GGH Visakhapatnam",
    },
    previousVisualAcuity: {
      rightEye: "6/12",
      leftEye: "6/18",
      measuredAt: "2024-08-10",
    },
  },
  "pat-new-001": {
    diabetes: { confirmed: false },
    hypertension: { confirmed: false },
    previousEyeConditions: [],
    previousSurgeries: [],
    currentMedications: [],
    previousVisualAcuity: {
      rightEye: "6/9",
      leftEye: "6/9",
      measuredAt: "2023-06-01",
    },
  },
};

export function getMockPriorRecords(
  patientId: string,
): PriorHealthSummary | undefined {
  return mockPriorRecords[patientId];
}
