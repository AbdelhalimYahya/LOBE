"use client";

import { useRouter } from "next/navigation";
import Icon from "./Icon";

/**
 * PageHeader component props
 */
export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Back button href (if not provided, uses router.back()) */
  backHref?: string;
  /** Custom className */
  className?: string;
}

/**
 * PageHeader component with back button and title
 * Matches Figma design: 64px height, title left, back button right
 */
export default function PageHeader({
  title,
  backHref,
  className = "",
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header
      className={`flex h-16 w-full items-center justify-between px-4 md:px-6 ${className}`}
      role="banner"
    >
      <h1 className="flex-1 text-base font-medium text-foreground-muted">
        {title}
      </h1>
      <button
        type="button"
        onClick={handleBack}
        className="flex h-6 w-6 items-center justify-center text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        aria-label="Go back"
      >
        <Icon name="CaretRight" size={24} category="arrows" className="text-primary" />
      </button>
    </header>
  );
}

