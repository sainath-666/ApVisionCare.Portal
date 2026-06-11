import { Badge } from "@/components/ui/badge";

type BadgeVariant = NonNullable<React.ComponentProps<typeof Badge>["variant"]>;

const STATUS_MAP: Record<string, { label: string; variant: BadgeVariant }> = {
  draft: { label: "Draft", variant: "secondary" },
  submitted: { label: "Submitted", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  normal: { label: "Normal", variant: "success" },
  spectacles: { label: "Spectacles", variant: "default" },
  teleconsult: { label: "Teleconsult", variant: "warning" },
  referral: { label: "Referral", variant: "danger" },
  scheduled: { label: "Scheduled", variant: "secondary" },
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  manufacturing: { label: "Manufacturing", variant: "warning" },
  qa: { label: "QA", variant: "warning" },
  dispatched: { label: "Dispatched", variant: "default" },
  delivered: { label: "Delivered", variant: "success" },
  waiting: { label: "Waiting", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "danger" },
  critical: { label: "Critical", variant: "danger" },
  high: { label: "High", variant: "warning" },
  routine: { label: "Routine", variant: "secondary" },
  verified: { label: "Verified", variant: "success" },
  suspended: { label: "Suspended", variant: "danger" },
  onboarding: { label: "Onboarding", variant: "warning" },
  idle: { label: "Idle", variant: "secondary" },
  offline: { label: "Offline", variant: "danger" },
};

export function StatusBadge({ status }: { status: string }) {
  const entry = STATUS_MAP[status] ?? {
    label: status,
    variant: "secondary" as BadgeVariant,
  };
  return <Badge variant={entry.variant}>{entry.label}</Badge>;
}
