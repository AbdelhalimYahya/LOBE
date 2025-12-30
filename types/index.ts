/**
 * Shared TypeScript types and interfaces for the Beauty Cops project
 */

// Component base props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  category?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Button variants
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// Badge variants
export type BadgeVariant = "default" | "success" | "warning" | "error";

// Section header props
export interface SectionHeaderProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

// Rating props
export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
}

// ---------------------------
// API TYPES (أضيفي هذا الجزء فقط)
// ---------------------------

export type Ingredient = {
  ingredient_id: number;
  name: string;
  risk_score: number | null;
  safety_category: "low" | "medium" | "high" | "unknown";
  description: string | null;
};

export type SkincareProductApi = {
  skincare_id: number;
  name: string;
  image_url: string | null;
  skin_type: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  brand_name: string | null;
  ingredients: Ingredient[];
  safety_score: number | null;
  safety_category: "low" | "medium" | "high" | "unknown";
  amazon_affiliate_url: string | null;
};

export type MakeupProductApi = {
  makeup_id: number;
  name: string;
  image_url: string | null;
  brand_name: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  ingredients: Ingredient[];
  safety_score: number | null;
  safety_category: "low" | "medium" | "high" | "unknown";
  affiliate_links: {
    store: string;
    marketplace: string;
    url: string;
  }[];
};
