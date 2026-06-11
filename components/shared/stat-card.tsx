import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: number;
  hint?: string;
  tone?: "primary" | "accent" | "success" | "warning" | "destructive";
}) {
  const toneClasses: Record<string, string> = {
    primary: "bg-primary-50 text-primary-600",
    accent: "bg-danger-50 text-danger-600",
    success: "bg-primary-50 text-primary-600",
    warning: "bg-neutral-100 text-neutral-600",
    destructive: "bg-danger-50 text-danger-600",
  };

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {(delta !== undefined || hint) && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              {delta !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 font-medium",
                    delta >= 0 ? "text-primary-600" : "text-danger-600",
                  )}
                >
                  {delta >= 0 ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(delta)}%
                </span>
              )}
              {hint && <span className="text-neutral-500">{hint}</span>}
            </div>
          )}
        </div>
        <div className={cn("rounded-lg p-2.5", toneClasses[tone])}>
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
