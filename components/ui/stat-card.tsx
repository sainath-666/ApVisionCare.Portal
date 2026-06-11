import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { cn, formatNumber } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">
            {typeof value === "number" ? formatNumber(value) : value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs",
                trendUp ? "text-primary-600" : "text-danger-500",
              )}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary-50 p-3">
          <Icon className="h-5 w-5 text-primary-600" />
        </div>
      </CardContent>
    </Card>
  );
}
