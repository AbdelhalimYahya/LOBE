"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import type { NavItem } from "@/types";

/**
 * MobileMenu component props
 */
export interface MobileMenuProps {
  /** Navigation items */
  navItems: NavItem[];
  /** CTA button text */
  ctaText: string;
  /** CTA button href */
  ctaHref: string;
  /** Close handler */
  onClose: () => void;
}

/**
 * Mobile menu component
 * Mobile menu with a11y: focus trap, ESC to close, ARIA roles
 */
export default function MobileMenu({
  navItems,
  ctaText,
  ctaHref,
  onClose,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  // Focus trap and ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap - only if Tab is pressed
      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Focus first element when menu opens
    firstFocusableRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute left-0 right-0 top-16 z-50 border-b border-neutral-200 bg-white shadow-lg"
      role="menu"
      aria-label="Mobile navigation menu"
    >
      <nav className="flex flex-col p-4">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            ref={index === 0 ? firstFocusableRef : undefined}
            href={item.href}
            className="py-3 text-base font-medium text-neutral-700 transition-colors hover:text-neutral-900"
            role="menuitem"
            onClick={onClose}
            {...(item.external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {item.label}
          </a>
        ))}
        <div className="mt-4">
          <a href={ctaHref} onClick={onClose} className="block">
            <Button variant="primary" fullWidth>
              {ctaText}
            </Button>
          </a>
        </div>
      </nav>
    </div>
  );
}
