"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./Button";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingText?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  confirm?: string;
}

export function SubmitButton({
  children,
  pendingText,
  variant = "primary",
  size = "md",
  className,
  confirm,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) {
          e.preventDefault();
        }
      }}
    >
      {pending ? pendingText ?? "Working…" : children}
    </Button>
  );
}
