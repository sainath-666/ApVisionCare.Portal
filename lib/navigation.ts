import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Brain,
  ClipboardCheck,
  FileText,
  Glasses,
  LayoutDashboard,
  ListChecks,
  Map,
  ScrollText,
  Send,
  Settings,
  ShieldCheck,
  Stethoscope,
  Store,
  Tent,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import type { UserRole } from "./types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const portalNav: Record<UserRole, NavItem[]> = {
  super_admin: [
    {
      label: "Dashboard",
      href: "/portal/super-admin/dashboard",
      icon: LayoutDashboard,
    },
    { label: "Districts", href: "/portal/super-admin/districts", icon: Map },
    { label: "Users", href: "/portal/super-admin/users", icon: Users },
    { label: "Camps", href: "/portal/super-admin/camps", icon: Tent },
    { label: "Vendors", href: "/portal/super-admin/vendors", icon: Store },
    {
      label: "AI Insights",
      href: "/portal/super-admin/ai-insights",
      icon: Brain,
    },
    { label: "Reports", href: "/portal/super-admin/reports", icon: FileText },
    {
      label: "Audit Log",
      href: "/portal/super-admin/audit",
      icon: ShieldCheck,
    },
    {
      label: "Settings",
      href: "/portal/super-admin/settings",
      icon: Settings,
    },
  ],
  nodal_officer: [
    {
      label: "Dashboard",
      href: "/portal/nodal-officer/dashboard",
      icon: LayoutDashboard,
    },
    { label: "Teams", href: "/portal/nodal-officer/teams", icon: Users },
    { label: "Camps", href: "/portal/nodal-officer/camps", icon: Tent },
    {
      label: "Approvals",
      href: "/portal/nodal-officer/approvals",
      icon: ClipboardCheck,
    },
    { label: "Referrals", href: "/portal/nodal-officer/referrals", icon: Send },
    {
      label: "Spectacles",
      href: "/portal/nodal-officer/spectacles",
      icon: Glasses,
    },
    { label: "Vendors", href: "/portal/nodal-officer/vendors", icon: Store },
  ],
  screening_team: [
    {
      label: "Dashboard",
      href: "/portal/screening-team/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Register Patient",
      href: "/portal/screening-team/register",
      icon: UserPlus,
    },
    {
      label: "Today's Patients",
      href: "/portal/screening-team/patients",
      icon: ListChecks,
    },
    {
      label: "Teleconsult",
      href: "/portal/screening-team/teleconsult/TC-2041",
      icon: Video,
    },
  ],
  patient: [
    {
      label: "Dashboard",
      href: "/portal/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Prescriptions",
      href: "/portal/patient/prescriptions",
      icon: ScrollText,
    },
    {
      label: "My Spectacles",
      href: "/portal/patient/spectacles",
      icon: Glasses,
    },
    {
      label: "Referrals",
      href: "/portal/patient/referrals",
      icon: ArrowRightLeft,
    },
    {
      label: "Teleconsult",
      href: "/portal/patient/teleconsult",
      icon: Stethoscope,
    },
  ],
};

export const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin (SPMU)",
  nodal_officer: "Nodal Officer · District",
  screening_team: "Screening Team",
  patient: "Patient / Citizen",
};

export const roleHomePath: Record<UserRole, string> = {
  super_admin: "/portal/super-admin/dashboard",
  nodal_officer: "/portal/nodal-officer/dashboard",
  screening_team: "/portal/screening-team/dashboard",
  patient: "/portal/patient/dashboard",
};
