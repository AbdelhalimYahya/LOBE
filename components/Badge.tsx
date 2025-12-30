import type { HTMLAttributes } from "react";
import type { BadgeVariant } from "@/types";
import type { BaseComponentProps } from "@/types";

/**
 * Badge component props
 */
export interface BadgeProps
  extends BaseComponentProps,
    HTMLAttributes<HTMLSpanElement> {
  /** Badge variant style */
  variant?: BadgeVariant;
  /** Badge text content */
  children: React.ReactNode;
}

/**
 * Decorative badge component
 * Used for labels, tags, and status indicators
 */
export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-neutral-100 text-neutral-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
      role="status"
      {...props}
    >
      {children}
    </span>
  );
}
