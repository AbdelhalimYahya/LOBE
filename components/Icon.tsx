"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { BaseComponentProps } from "@/types";
import {
  allArrowIcons,
  allBrandIcons,
  allCommerceIcons,
  allDesignIcons,
  allDevelopmentIcons,
  allEducationIcons,
  allGamesIcons,
  allHealthIcons,
  allMapsIcons,
  allMathIcons,
  allOfficeIcons,
  allPeopleIcons,
  allSecurityIcons,
  allTimeIcons,
  allWeatherIcons,
} from "@/lib/design-tokens";

/**
 * Icon name type - all available icons from design tokens
 */
export type IconName =
  | (typeof allArrowIcons)[number]
  | (typeof allBrandIcons)[number]
  | (typeof allCommerceIcons)[number]
  | (typeof allDesignIcons)[number]
  | (typeof allDevelopmentIcons)[number]
  | (typeof allEducationIcons)[number]
  | (typeof allGamesIcons)[number]
  | (typeof allHealthIcons)[number]
  | (typeof allMapsIcons)[number]
  | (typeof allMathIcons)[number]
  | (typeof allOfficeIcons)[number]
  | (typeof allPeopleIcons)[number]
  | (typeof allSecurityIcons)[number]
  | (typeof allTimeIcons)[number]
  | (typeof allWeatherIcons)[number];

/**
 * Icon size options
 */
export type IconSize = "sm" | "md" | "lg" | "xl" | number;

/**
 * Props for the Icon component
 */
export interface IconProps extends BaseComponentProps {
  /** Name of the icon (matches the SVG filename without extension) */
  name: IconName | string;
  /** Size of the icon */
  size?: IconSize;
  /** Custom className for additional styling */
  className?: string;
  /** Whether to use inline SVG (loads SVG content) or as Image component */
  inline?: boolean;
  /** Alt text for accessibility (only used when inline is false) */
  alt?: string;
  /** Icon category - determines which directory to load from */
  category?:
    | "arrows"
    | "brands"
    | "commerce"
    | "design"
    | "development"
    | "education"
    | "games"
    | "health"
    | "maps"
    | "math"
    | "office"
    | "people"
    | "security"
    | "time"
    | "weather";
}

/**
 * Size mapping for predefined sizes
 */
const sizeMap: Record<Extract<IconSize, string>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * Reusable Icon component
 * Supports both inline SVG (with currentColor support) and Image component usage
 *
 * @example
 * ```tsx
 * // Inline SVG (recommended for theming)
 * <Icon name="ArrowRight" size="md" />
 * <Icon name="CaretUp" size={24} className="text-primary-500" />
 *
 * // Image component (for static icons)
 * <Icon name="ArrowsMerge" size="lg" inline={false} />
 * ```
 */
export default function Icon({
  name,
  size = "md",
  className = "",
  inline = true,
  alt = `${name} icon`,
  category = "arrows",
}: IconProps) {
  const sizeValue = typeof size === "number" ? size : sizeMap[size];
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Auto-detect category based on icon name
  const detectedCategory:
    | "arrows"
    | "brands"
    | "commerce"
    | "design"
    | "development"
    | "education"
    | "games"
    | "health"
    | "maps"
    | "math"
    | "office"
    | "people"
    | "security"
    | "time"
    | "weather" =
    category === "arrows" ||
    category === "brands" ||
    category === "commerce" ||
    category === "design" ||
    category === "development" ||
    category === "education" ||
    category === "games" ||
    category === "health" ||
    category === "maps" ||
    category === "math" ||
    category === "office" ||
    category === "people" ||
    category === "security" ||
    category === "time" ||
    category === "weather"
      ? category
      : (allBrandIcons as readonly string[]).includes(name)
      ? "brands"
      : (allCommerceIcons as readonly string[]).includes(name)
      ? "commerce"
      : (allDesignIcons as readonly string[]).includes(name)
      ? "design"
      : (allDevelopmentIcons as readonly string[]).includes(name)
      ? "development"
      : (allEducationIcons as readonly string[]).includes(name)
      ? "education"
      : (allGamesIcons as readonly string[]).includes(name)
      ? "games"
      : (allHealthIcons as readonly string[]).includes(name)
      ? "health"
      : (allMapsIcons as readonly string[]).includes(name)
      ? "maps"
      : (allMathIcons as readonly string[]).includes(name)
      ? "math"
      : (allOfficeIcons as readonly string[]).includes(name)
      ? "office"
      : (allPeopleIcons as readonly string[]).includes(name)
      ? "people"
      : (allSecurityIcons as readonly string[]).includes(name)
      ? "security"
      : (allTimeIcons as readonly string[]).includes(name)
      ? "time"
      : (allWeatherIcons as readonly string[]).includes(name)
      ? "weather"
      : "arrows";

  // Map category names to directory names (for categories with underscores)
  const categoryToDirectoryMap: Record<string, string> = {
    weather: "weather_nature",
    health: "health_wellness",
    maps: "maps_travel",
    math: "math_finance",
    office: "office_editing",
    security: "security_warnings",
  };
  const iconDirectory =
    categoryToDirectoryMap[detectedCategory] || detectedCategory;

  // Load SVG content for inline usage
  useEffect(() => {
    if (!inline) {
      setLoading(false);
      return;
    }

    const iconPath = `/icons/${iconDirectory}/${name}.svg`;

    fetch(iconPath)
      .then((res) => res.text())
      .then((text) => {
        // For brand icons, preserve brand colors; for arrows, commerce, design, development, education, games, health, maps, math, office, people, security, time, and weather, use currentColor
        const shouldPreserveColors = detectedCategory === "brands";
        const optimized = shouldPreserveColors
          ? text
              .replace(/width="[^"]*"/g, "") // Remove hardcoded width for brand icons too
              .replace(/height="[^"]*"/g, "") // Remove hardcoded height for brand icons too
              .replace(/width='[^']*'/g, "") // Remove hardcoded width (single quotes)
              .replace(/height='[^']*'/g, "") // Remove hardcoded height (single quotes)
          : text
              .replace(/fill="#[^"]*"/g, 'fill="currentColor"')
              .replace(/stroke="#[^"]*"/g, 'stroke="currentColor"')
              .replace(/fill='#[^']*'/g, "fill='currentColor'")
              .replace(/stroke='#[^']*'/g, "stroke='currentColor'")
              .replace(/width="[^"]*"/g, "") // Remove hardcoded width
              .replace(/height="[^"]*"/g, "") // Remove hardcoded height
              .replace(/width='[^']*'/g, "") // Remove hardcoded width (single quotes)
              .replace(/height='[^']*'/g, ""); // Remove hardcoded height (single quotes)
        setSvgContent(optimized);
        setLoading(false);
      })
      .catch(() => {
        // If SVG not found, fallback to Image component
        setLoading(false);
      });
  }, [name, inline, iconDirectory, detectedCategory]);

  // Use Image component if inline is false or if SVG failed to load
  if (!inline || (!svgContent && !loading)) {
    return (
      <Image
        src={`/icons/${iconDirectory}/${name}.svg`}
        alt={alt}
        width={sizeValue}
        height={sizeValue}
        className={className}
      />
    );
  }

  // Render inline SVG with currentColor support
  if (loading || !svgContent) {
    return (
      <div
        className={`inline-block flex-shrink-0 ${className}`}
        style={{ width: sizeValue, height: sizeValue }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={`inline-block flex-shrink-0 ${className}`}
      style={{ width: sizeValue, height: sizeValue }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-hidden="true"
      role="img"
    />
  );
}
