import { create } from "zustand";
import type { PriorHealthSummary } from "@/lib/types";

interface EmrState {
  priorRecords: Record<string, PriorHealthSummary>;
  setPriorRecords: (patientId: string, summary: PriorHealthSummary) => void;
  getPriorRecords: (patientId: string) => PriorHealthSummary | undefined;
  clearPriorRecords: (patientId: string) => void;
}

export const useEmrStore = create<EmrState>((set, get) => ({
  priorRecords: {},
  setPriorRecords: (patientId, summary) =>
    set((state) => ({
      priorRecords: { ...state.priorRecords, [patientId]: summary },
    })),
  getPriorRecords: (patientId) => get().priorRecords[patientId],
  clearPriorRecords: (patientId) =>
    set((state) => {
      const next = { ...state.priorRecords };
      delete next[patientId];
      return { priorRecords: next };
    }),
}));
