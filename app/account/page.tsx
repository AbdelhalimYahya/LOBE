"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const router = useRouter();

  // حالة تسجيل الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null;

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const menuItems = [
    {
      id: "profile",
      label: isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول",
      href: isLoggedIn ? "/profile" : "/login",
      icon: "CaretLeft",
    },
    {
      id: "about",
      label: "عن Beauty Cops",
      href: "/about",
      icon: "CaretLeft",
    },
    {
      id: "rating",
      label: "كيف نقييم المنتجات",
      href: "/rating-system",
      icon: "CaretLeft",
    },
    {
      id: "blog",
      label: "المدونة",
      href: "/blog",
      icon: "CaretLeft",
    },
  ];

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
            الحساب
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

      {/* Desktop/Tablet Top Navigation */}
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
              className="text-base text-brand-primary font-medium"
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
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-center relative mb-12 lg:mb-16">
            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              الحساب
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

          {/* Avatar */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-natural-light-border flex items-center justify-center overflow-hidden">
                <svg
                  width="68"
                  height="82"
                  viewBox="0 0 68 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white mt-[30px] md:scale-125 md:mt-[40px]"
                >
                  <path
                    d="M34 0C24.5 0 17 7.5 17 17C17 26.5 24.5 34 34 34C43.5 34 51 26.5 51 17C51 7.5 43.5 0 34 0ZM34 41C15.5 41 0 48.5 0 58V82H68V58C68 48.5 52.5 41 34 41Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-3 md:gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between h-12 md:h-14 px-4 md:px-6 bg-natural-white border border-natural-light-border rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border"
              >
                <span className="text-base md:text-lg text-natural-primary-text font-normal">
                  {item.label}
                </span>
                <Icon
                  name={item.icon}
                  size={24}
                  category="arrows"
                  className="text-brand-primary stroke-brand-primary md:scale-110"
                />
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-natural-white border-t border-natural-light-border">
        <div className="flex items-center justify-between h-[70px] px-6">
          <Link href="/" className="flex flex-col items-center gap-1 min-w-[50px]">
            <Icon name="House" size={24} category="maps" className="text-natural-input-hint" />
            <span className="text-xs text-natural-input-hint font-normal">الرئيسية</span>
          </Link>

          <Link href="/products" className="flex flex-col items-center gap-1 min-w-[50px]">
            <Icon name="ShoppingBag" size={24} category="commerce" className="text-natural-input-hint" />
            <span className="text-xs text-natural-input-hint font-normal">المنتجات</span>
          </Link>

          <Link href="/favorites" className="flex flex-col items-center gap-1 min-w-[50px]">
            <Icon name="Heart" size={24} category="games" className="text-natural-input-hint" />
            <span className="text-xs text-natural-input-hint font-normal">المفضلة</span>
          </Link>

          <Link href="/account" className="flex flex-col items-center gap-1 min-w-[50px]">
            <Icon name="User" size={24} category="people" className="text-brand-primary" />
            <span className="text-xs text-brand-primary font-normal">الحساب</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
