/**
 * Shared constants for the Beauty Cops application
 */

// App metadata
export const APP_NAME = "Beauty Cops";
export const APP_DESCRIPTION = "Your beauty destination";

// Default navigation items (can be overridden)
export const DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Image optimization
export const IMAGE_QUALITY = 85;
export const IMAGE_SIZES = {
  mobile: "(max-width: 640px) 100vw",
  tablet: "(max-width: 1024px) 50vw",
  desktop: "33vw",
} as const;

