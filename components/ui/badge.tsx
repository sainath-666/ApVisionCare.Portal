import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "secondary";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-primary-100 text-primary-700": variant === "default",
          "bg-primary-50 text-primary-700": variant === "success",
          "bg-neutral-100 text-neutral-700": variant === "warning",
          "bg-danger-100 text-danger-600": variant === "danger",
          "bg-primary-50 text-primary-600": variant === "info",
          "bg-neutral-100 text-neutral-600": variant === "secondary",
        },
        className,
      )}
      {...props}
    />
  );
}
