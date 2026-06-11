import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/assets/images/apvision.png";

export function Logo({
  className,
  showText = true,
  subtitle = true,
  variant = "default",
  roleLabel,
}: {
  className?: string;
  showText?: boolean;
  subtitle?: boolean;
  variant?: "default" | "sidebar";
  roleLabel?: string;
}) {
  const isSidebar = variant === "sidebar";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          isSidebar ? "bg-white" : "bg-transparent",
        )}
      >
        <Image
          src={LOGO_SRC}
          alt="AP Vision Care"
          width={36}
          height={36}
          className={cn(
            "object-contain",
            isSidebar ? "size-7" : "size-9 rounded-lg",
          )}
          priority
        />
      </div>
      {showText && (
        <div className="min-w-0 leading-tight">
          <p
            className={cn(
              "font-bold tracking-tight",
              isSidebar ? "text-sm text-white" : "text-foreground",
            )}
          >
            AP Vision Care
          </p>
          {isSidebar && roleLabel ? (
            <p className="text-xs text-primary-200">{roleLabel}</p>
          ) : (
            subtitle && (
              <p className="text-[11px] text-muted-foreground">
                Govt. of Andhra Pradesh
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
