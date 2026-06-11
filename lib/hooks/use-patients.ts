"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { patients } from "@/lib/mock-data";
import type { Patient } from "@/lib/types";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: async (): Promise<Patient[]> => {
      try {
        return (await apiClient.get<Patient[]>("/patients")) as Patient[];
      } catch {
        return patients;
      }
    },
  });
}

export function usePatientSearch(params: {
  abha?: string;
  mobile?: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["patients", "search", params],
    queryFn: () =>
      apiClient.searchPatients({
        abha: params.abha,
        mobile: params.mobile,
      }) as Promise<Patient[]>,
    enabled: params.enabled ?? false,
  });
}
