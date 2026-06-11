import type { UserRole } from "./types";

export interface DemoUser {
  role: UserRole;
  name: string;
  title: string;
  district?: string;
}

export const DEMO_USERS: Record<UserRole, DemoUser> = {
  super_admin: {
    role: "super_admin",
    name: "Dr. Anitha Rao",
    title: "State Programme Director (SPMU)",
  },
  nodal_officer: {
    role: "nodal_officer",
    name: "Sri K. Venkateswarlu",
    title: "District Nodal Officer",
    district: "Guntur",
  },
  screening_team: {
    role: "screening_team",
    name: "M. Lakshmi (Optometrist)",
    title: "Screening Team Lead",
    district: "Guntur",
  },
  patient: {
    role: "patient",
    name: "Ravi Teja",
    title: "Citizen",
    district: "Guntur",
  },
};
