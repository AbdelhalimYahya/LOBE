import type { NavItem } from "@/types";

/**
 * Footer component props
 */
export interface FooterProps {
  /** Footer links organized by category */
  linkGroups?: Array<{
    title: string;
    links: NavItem[];
  }>;
  /** Copyright text */
  copyright?: string;
  /** Social media links */
  socialLinks?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

/**
 * Footer component
 * Center layout; grid for columns on md+, stacked on mobile
 */
export default function Footer({
  linkGroups = [],
  copyright = `© ${new Date().getFullYear()} Beauty Cops. All rights reserved.`,
  socialLinks = [],
}: FooterProps) {
  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        {/* Link Groups Grid */}
        {linkGroups.length > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors hover:text-white"
                        {...(link.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="mb-8 flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-neutral-400 transition-colors hover:text-white"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8 text-center text-sm">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
