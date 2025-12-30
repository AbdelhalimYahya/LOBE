"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";
import Button from "./Button";
import type { NavItem } from "@/types";

/**
 * NavbarContainer component props
 */
export interface NavbarContainerProps {
  /** Navigation items */
  navItems?: NavItem[];
  /** Logo source */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
}

/**
 * Main navbar component
 * Desktop: logo left, nav center/right, CTA right (as Figma)
 * Mobile: uses MobileMenu component
 */
export default function NavbarContainer({
  navItems = [],
  logo,
  logoAlt = "Logo",
  ctaText = "Get Started",
  ctaHref = "#",
}: NavbarContainerProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          {logo ? (
            <a href="/" className="flex items-center" aria-label="Home">
              <img src={logo} alt={logoAlt} className="h-8 w-auto" />
            </a>
          ) : (
            <a
              href="/"
              className="text-xl font-bold text-neutral-900"
              aria-label="Home"
            >
              Beauty Cops
            </a>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
              {...(item.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href={ctaHref}>
            <Button variant="primary" size="sm">
              {ctaText}
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-6 w-6 text-neutral-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          navItems={navItems}
          ctaText={ctaText}
          ctaHref={ctaHref}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
