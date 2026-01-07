"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status after mount to avoid hydration mismatch
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
      } catch {
        setIsLoggedIn(false);
      }
    };

    // Use setTimeout to avoid synchronous setState
    const timeoutId = setTimeout(checkAuth, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* Mobile Header - Only visible on mobile */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-0 flex-shrink-0"
        role="banner"
      >
        <div className="w-full max-w-[358px] relative flex items-center justify-center h-16">
          <h1 className="text-xl font-medium text-natural-primary-text">
            عن Beauty Cops
          </h1>
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-0 flex h-6 w-6 items-center justify-center text-brand-primary hover:bg-brand-primary-light-bg rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2"
            aria-label="العودة"
          >
            <Icon
              name="CaretRight"
              size={24}
              category="arrows"
              className="text-brand-primary stroke-brand-primary"
            />
          </button>
        </div>
      </header>

      {/* Desktop/Tablet Top Navigation - Only visible on tablet and desktop */}
      <nav className="hidden md:flex w-full items-center justify-center px-6 lg:px-8 py-4 border-b border-natural-light-border flex-shrink-0">
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
            <Link
              href="/"
              className="text-base text-natural-primary-text hover:text-brand-primary transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/products"
              className="text-base text-natural-primary-text hover:text-brand-primary transition-colors"
            >
              المنتجات
            </Link>
            <Link
              href="/favorites"
              className="text-base text-natural-primary-text hover:text-brand-primary transition-colors"
            >
              المفضلة
            </Link>
            <Link
              href="/account"
              className="text-base text-natural-primary-text hover:text-brand-primary transition-colors"
            >
              الحساب
            </Link>
          </div>

          {/* Login/Profile Button */}
          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            className="px-6 py-2 bg-brand-buttons-status-default text-natural-white rounded-lg hover:bg-brand-buttons-status-hover transition-colors text-base font-medium"
          >
            {isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول"}
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-start md:justify-center px-4 md:px-6 lg:px-8 pt-8 md:pt-0 pb-24 md:pb-8 overflow-y-auto">
        <div className="w-full max-w-[358px] md:max-w-2xl lg:max-w-3xl">
          {/* Desktop/Tablet Header - Only visible on tablet and desktop */}
          <div className="hidden md:flex items-center justify-center relative mb-12 lg:mb-16">
            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              عن Beauty Cops
            </h1>
            <button
              type="button"
              onClick={handleBack}
              className="absolute right-0 flex h-8 w-8 items-center justify-center text-brand-primary hover:bg-brand-primary-light-bg rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2"
              aria-label="العودة"
            >
              <Icon
                name="CaretRight"
                size={24}
                category="arrows"
                className="text-brand-primary stroke-brand-primary md:scale-110"
              />
            </button>
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="flex justify-start">
              <Image
                src="/logo.png"
                alt="Beauty Cops"
                width={200}
                height={80}
                className="h-auto w-auto max-w-[200px]"
                priority
                unoptimized
              />
            </div>

            {/* Descriptive Text */}
            <div className="flex flex-col gap-4">
              <p className="text-base text-natural-primary-text leading-relaxed text-right">
                في Beauty Cops نؤمن أن الجمال يبدأ بالمعرفة. منصة ذكية تهدف إلى
                جعل اختياراتك الجمالية أكثر وعيا وأمانا. نحلل مكونات المنتجات
                ونقدم لك توصيات شخصية تساعدك على اختيار ما يناسبك بوعي وثقة.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col gap-4">
              {/* X (Twitter) */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-4 text-base text-natural-primary-text hover:text-brand-primary transition-colors text-right"
              >
                <div className="force-brand-primary flex-shrink-0">
                  <Icon
                    name="XLogo"
                    size={24}
                    category="brands"
                    className="text-brand-primary"
                  />
                </div>
                <span>اكس</span>
              </button>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/beautycops.sa/?igsh=MWRsc3E3M2c2MDhsNw%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-base text-natural-primary-text hover:text-brand-primary transition-colors"
              >
                <div className="force-brand-primary flex-shrink-0">
                  <Icon
                    name="InstagramLogo"
                    size={24}
                    category="brands"
                    className="text-brand-primary"
                  />
                </div>
                <span>انستقرام</span>
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@beautycops.sa?_r=1&_t=ZS-92gAKNDqiKv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-base text-natural-primary-text hover:text-brand-primary transition-colors"
              >
                <div className="force-brand-primary flex-shrink-0">
                  <Icon
                    name="TiktokLogo"
                    size={24}
                    category="brands"
                    className="text-brand-primary"
                  />
                </div>
                <span>تيك توك</span>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/beautycops/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-base text-natural-primary-text hover:text-brand-primary transition-colors"
              >
                <div className="force-brand-primary flex-shrink-0">
                  <Icon
                    name="LinkedinLogo"
                    size={24}
                    category="brands"
                    className="text-brand-primary"
                  />
                </div>
                <span>لينكد ان</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Only visible on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-natural-white border-t border-natural-light-border">
        <div className="flex items-center justify-between h-[70px] px-6">
          {/* الرئيسية */}
          <Link
            href="/"
            className="flex flex-col items-center gap-1 min-w-[50px]"
          >
            <Icon
              name="House"
              size={24}
              category="maps"
              className="text-natural-input-hint"
            />
            <span className="text-xs text-natural-input-hint font-normal">
              الرئيسية
            </span>
          </Link>

          {/* المنتجات */}
          <Link
            href="/products"
            className="flex flex-col items-center gap-1 min-w-[50px]"
          >
            <Icon
              name="ShoppingBag"
              size={24}
              category="commerce"
              className="text-natural-input-hint"
            />
            <span className="text-xs text-natural-input-hint font-normal">
              المنتجات
            </span>
          </Link>

          {/* المفضلة */}
          <Link
            href="/favorites"
            className="flex flex-col items-center gap-1 min-w-[50px]"
          >
            <Icon
              name="Heart"
              size={24}
              category="games"
              className="text-natural-input-hint"
            />
            <span className="text-xs text-natural-input-hint font-normal">
              المفضلة
            </span>
          </Link>

          {/* الحساب */}
          <Link
            href="/account"
            className="flex flex-col items-center gap-1 min-w-[50px]"
          >
            <Icon
              name="User"
              size={24}
              category="people"
              className="text-brand-primary"
            />
            <span className="text-xs text-brand-primary font-normal">
              الحساب
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
