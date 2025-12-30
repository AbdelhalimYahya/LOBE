import type { SectionHeaderProps } from "@/types";

/**
 * Reusable section header component
 * Provides consistent typography and spacing for section titles
 */
export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <header className={`mb-8 ${alignStyles[align]} ${className}`}>
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-neutral-600 md:text-xl">{subtitle}</p>
      )}
    </header>
  );
}
