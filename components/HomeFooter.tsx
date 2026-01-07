"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

/**
 * HomeFooter component props
 */
export interface HomeFooterProps {
  /** Logo source path */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Descriptive text about the platform */
  description?: string;
  /** Social media links */
  socialLinks?: Array<{
    name: string;
    href: string;
    iconName: "LinkedinLogo" | "XLogo" | "TiktokLogo" | "InstagramLogo";
  }>;
  /** Contact address */
  address?: string;
  /** Contact email */
  email?: string;
}

/**
 * HomeFooter component
 * Mobile-first design with vertical stacking, responsive for larger screens
 * Matches the Beauty Cops footer design with light background and pink/purple accents
 */
export default function HomeFooter({
  logo = "/logo.png",
  logoAlt = "Beauty Cops Logo",
  description = "منصة تساعدك على فهم مكونات منتجات الجمال والعناية، من خلال تحليلات علمية مبسطة وتوصيات ذكية لاختيار ما يناسبك بثقة.",
  socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/beautycops.sa/?igsh=MWRsc3E3M2c2MDhsNw%3D%3D#", iconName: "InstagramLogo" },
    { name: "TikTok", href: "https://www.tiktok.com/@beautycops.sa?_r=1&_t=ZS-92gAKNDqiKv", iconName: "TiktokLogo" },
    { name: "X (Twitter)", href: "#", iconName: "XLogo" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/beautycops/", iconName: "LinkedinLogo" },
  ],
  address = "شارع العليا، حي الغدير, الرياض 13311 - المملكة العربية السعودية",
  email = "Info@BeautyCops.com",
}: HomeFooterProps) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#F9F9F9] text-natural-primary-text"
      role="contentinfo"
      dir="rtl"
    >
      <div className="container mx-auto px-8 py-8 md:py-12 lg:px-8">
        {/* Logo Section */}
        <div className="mb-6 flex sm:justify-center md:mb-8">
          {logo && (
            <Image
              src={logo}
              alt={logoAlt}
              width={200}
              height={60}
              className="h-auto w-auto max-w-[200px] md:max-w-[240px]"
              priority={false}
            />
          )}
        </div>

        {/* Description Text */}
        <div className="mb-8 text-start sm:text-center md:mb-10">
          <p className="mx-auto max-w-2xl sm:!text-center text-sm leading-relaxed text-natural-primary-text md:text-base lg:text-lg">
            {description}
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="mb-8 flex sm:justify-center gap-4 md:mb-10 md:gap-6">
          {socialLinks.map((social) => {
            // Handle Twitter/X link to navigate to home page
            if (social.name === "X (Twitter)") {
              return (
                <button
                  key={social.name}
                  onClick={() => router.push('/')}
                  aria-label={social.name}
                  className="hover:opacity-80 cursor-pointer transition-all"
                >
                  <div className="force-brand-primary hover:opacity-80 cursor-pointer transition-all">
                    <Icon
                      name={social.iconName}
                      size={24}
                      category="brands"
                      className="text-brand-primary md:w-6 md:h-6"
                    />
                  </div>
                </button>
              );
            }

            return (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="hover:opacity-80 cursor-pointer transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="force-brand-primary hover:opacity-80 cursor-pointer transition-all">
                  <Icon
                    name={social.iconName}
                    size={24}
                    category="brands"
                    className="text-brand-primary md:w-6 md:h-6"
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="mb-8 space-y-4 md:mb-10 md:space-y-5">
          {/* Address */}
          <div className="flex items-start sm:justify-center gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <div className="force-brand-primary">
                <Icon
                  name="MapPin"
                  size={20}
                  category="maps"
                  className="text-brand-primary md:w-6 md:h-6"
                />
              </div>
            </div>
            <p className="text-right text-sm text-natural-primary-text md:text-base">
              {address}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center sm:justify-center gap-3 md:gap-4">
            <div className="flex-shrink-0">
              {/* Envelope icon - simple SVG since it's not in the icon set */}
              <svg
                className="h-5 w-5 text-brand-primary md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <a
              href={`mailto:${email}`}
              className="text-sm text-natural-primary-text transition-colors hover:text-brand-primary md:text-base"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-natural-light-border pt-6 text-center md:pt-8">
          <p className="text-sm text-[#7F7F7F] md:text-base">
            <span>جميع الحقوق محفوظة</span>{" "}
            <span>© {currentYear} Beauty Cops.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
