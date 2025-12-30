import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant, ButtonSize } from "@/types";

/**
 * Button component with proper TypeScript types and accessibility
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button content */
  children: ReactNode;
  /** Whether button is in loading state */
  isLoading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * Reusable button component with proper accessibility
 * Supports keyboard navigation, focus states, and minimum touch target size
 */
export default function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-brand-buttons-status-default text-natural-white hover:bg-brand-buttons-status-hover focus-visible:ring-brand-buttons-status-focus-border disabled:bg-brand-buttons-status-disabled",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus-visible:ring-neutral-400",
    outline: "border border-natural-default-border bg-transparent hover:bg-brand-primary-light-bg hover:border-brand-primary focus-visible:ring-brand-buttons-status-focus-border",
    ghost: "bg-transparent hover:bg-brand-primary-light-bg focus-visible:ring-brand-buttons-status-focus-border",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg min-h-[48px]",
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="sr-only">Loading</span>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
