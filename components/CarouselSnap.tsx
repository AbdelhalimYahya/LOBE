import type { BaseComponentProps } from "@/types";

/**
 * CarouselSnap component props
 */
export interface CarouselSnapProps extends BaseComponentProps {
  /** Gap between items */
  gap?: number;
}

/**
 * Optional horizontal snap container for mobile scrolling
 * Provides smooth horizontal scrolling with snap points
 */
export default function CarouselSnap({
  children,
  className = "",
  gap = 1.5,
}: CarouselSnapProps) {
  return (
    <div
      className={`overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth ${className}`}
      style={{
        scrollbarGutter: "stable",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div
        className="flex gap-4"
        style={{ gap: `${gap * 0.25}rem` }}
        role="list"
        aria-label="Carousel"
      >
        {children}
      </div>
    </div>
  );
}
