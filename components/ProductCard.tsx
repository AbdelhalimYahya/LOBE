import Image from "next/image";
import type { Product } from "@/types";
import type { BaseComponentProps } from "@/types";
import Badge from "./Badge";
import RatingStars from "./RatingStars";

/**
 * ProductCard component props
 */
export interface ProductCardProps extends BaseComponentProps {
  /** Product data */
  product: Product;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Responsive product card component
 * Uses aspect ratio for images, proper accessibility, and responsive design
 */
export default function ProductCard({
  product,
  onClick,
  className = "",
}: ProductCardProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Image container with aspect ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute left-2 top-2 z-10">
            <Badge>{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-base font-semibold text-neutral-900 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="mb-2 text-sm text-neutral-600 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Rating */}
        {product.rating !== undefined && (
          <div className="mb-2">
            <RatingStars
              rating={product.rating}
              showNumber={!!product.reviewCount}
            />
            {product.reviewCount !== undefined && (
              <span className="ml-1 text-xs text-neutral-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-neutral-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Optional click overlay */}
      {onClick && (
        <button
          onClick={onClick}
          className="absolute inset-0 z-20"
          aria-label={`View ${product.name}`}
          type="button"
        />
      )}
    </article>
  );
}
