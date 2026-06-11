import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "destructive"
    | "secondary"
    | "success";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
          {
            "bg-danger-500 text-white shadow-sm hover:bg-danger-600 active:bg-danger-700":
              variant === "default",
            "border border-neutral-200 bg-white text-primary-700 hover:border-primary-300 hover:bg-primary-50":
              variant === "outline",
            "text-neutral-600 hover:bg-neutral-100": variant === "ghost",
            "bg-danger-600 text-white hover:bg-danger-700":
              variant === "destructive",
            "bg-neutral-100 text-neutral-900 hover:bg-neutral-200":
              variant === "secondary",
            "bg-primary-600 text-white hover:bg-primary-700":
              variant === "success",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
export { Button };
