"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the Input component.
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Optional label text above the input */
  label?: string;
  /** Optional icon to display on the left side */
  leftIcon?: ReactNode;
  /** Optional icon to display on the right side */
  rightIcon?: ReactNode;
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Input size */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes for styling */
  className?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
}

/**
 * Input component
 * Matches Figma design: 44px height, 8px border radius, supports icons and labels
 * @param {InputProps} props - The props for the Input component.
 */
export default function Input({
  label,
  leftIcon,
  rightIcon,
  error,
  helperText,
  size = "md",
  className = "",
  labelClassName = "",
  disabled,
  ...props
}: InputProps) {
  const baseStyles =
    "w-full bg-natural-white border border-natural-light-border rounded-lg text-natural-primary-text placeholder:text-natural-input-hint transition-colors focus:outline-none focus:ring-2 focus:ring-brand-buttons-status-focus-border focus:border-brand-buttons-status-focus-border disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-brand-buttons-status-disabled";

  const sizeStyles = {
    sm: "h-10 px-3 text-sm",
    md: "h-11 px-4 text-base", // 44px height as per Figma
    lg: "h-12 px-5 text-lg",
  };

  const iconPadding = {
    sm: {
      left: leftIcon ? "pl-9" : "",
      right: rightIcon ? "pr-9" : "",
    },
    md: {
      left: leftIcon ? "pl-11" : "", // 16px padding + 20px icon + 8px gap
      right: rightIcon ? "pr-11" : "", // 16px padding + 20px icon + 8px gap
    },
    lg: {
      left: leftIcon ? "pl-12" : "",
      right: rightIcon ? "pr-12" : "",
    },
  };

  const generatedId = useId();
  const inputId = props.id || generatedId;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-natural-primary-text mb-2 ${labelClassName}`}
        >
          {label}
          {props.required && (
            <span className="text-status-error ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-input-hint pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-5 h-5">{leftIcon}</div>
          </div>
        )}
        <input
          id={inputId}
          type="text"
          className={`${baseStyles} ${sizeStyles[size]} ${
            iconPadding[size].left
          } ${iconPadding[size].right} ${
            error
              ? "border-status-error focus:ring-status-error focus:border-status-error"
              : ""
          }`}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error || helperText ? `${inputId}-description` : undefined
          }
          {...props}
        />
        {rightIcon && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-5 h-5">{rightIcon}</div>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          id={`${inputId}-description`}
          className={`mt-1.5 text-sm ${
            error ? "text-status-error" : "text-natural-helper-text"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
