import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600",
  secondary: "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
  outline: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:outline-slate-400",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
