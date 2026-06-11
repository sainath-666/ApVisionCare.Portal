import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/lib/types";

interface AuthState {
  demoRole: UserRole | null;
  setDemoRole: (role: UserRole | null) => void;
  clearDemoRole: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      demoRole: null,
      setDemoRole: (role) => set({ demoRole: role }),
      clearDemoRole: () => set({ demoRole: null }),
    }),
    { name: "apvc-auth" },
  ),
);
