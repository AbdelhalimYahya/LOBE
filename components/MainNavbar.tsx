"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./Icon";

interface MainNavbarProps {
  isLoggedIn?: boolean; // بنخليه اختياري بس، عشان ما نخرب أي استخدام قديم
}

export default function MainNavbar({ isLoggedIn: isLoggedInProp }: MainNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!isLoggedInProp);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔐 هنا نقرأ حالة تسجيل الدخول من localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    }
  }, [pathname]); // كل ما تغيّر المسار، نشيّك مرّة ثانية

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "الرئيسية", path: "/", requiresAuth: false },
    {
      href: "/products",
      label: "المنتجات",
      path: "/products",
      requiresAuth: false,
    },
    {
      href: "/favorites",
      label: "المفضلة",
      path: "/favorites",
      requiresAuth: true,
    },
    { href: "/blog", label: "المدونة", path: "/blog", requiresAuth: false },
    {
      href: "/notifications",
      label: "الإشعارات",
      path: "/notifications",
      requiresAuth: true,
    },
  ];

  // فلترة الروابط حسب حالة تسجيل الدخول
  const visibleLinks = navLinks.filter(
    (link) => !link.requiresAuth || isLoggedIn
  );

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav
      className="hidden md:flex w-full items-center justify-center px-6 lg:px-8 py-4 border-b border-natural-light-border flex-shrink-0"
      dir="rtl"
    >
      <div className="w-full max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Beauty Cops"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
            unoptimized
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base transition-colors ${
                isActive(link.path)
                  ? "text-brand-primary font-medium"
                  : "text-natural-primary-text hover:text-brand-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Profile Dropdown or Login Button */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2"
              aria-label="الحساب"
              aria-expanded={isDropdownOpen}
            >
              <Icon
                name="User"
                size={24}
                category="people"
                className="text-brand-primary"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-natural-white rounded-lg shadow-lg border border-natural-light-border py-2 z-50">
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm text-natural-primary-text hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  الحساب
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-natural-primary-text hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  الملف الشخصي
                </Link>
                <Link
                  href="/favorites"
                  className="block px-4 py-2 text-sm text-natural-primary-text hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  المفضلة
                </Link>
                <div className="border-t border-natural-light-border my-1"></div>
                <button
                  type="button"
                  className="block w-full text-right px-4 py-2 text-sm text-natural-primary-text hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("currentUser");
                    }
                    router.push("/login");
                  }}
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="px-6 py-2 bg-brand-buttons-status-default text-natural-white rounded-lg hover:bg-brand-buttons-status-hover transition-colors text-base font-medium"
          >
            تسجيل الدخول
          </Link>
        )}
      </div>
    </nav>
  );
}
