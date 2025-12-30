"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MainNavbar } from "@/components";
import { ChevronRight } from "lucide-react";

const Notifications = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const notifications = [
    {
      id: 1,
      text: "إشعار تم النقر عليه",
      isRead: true,
    },
    {
      id: 2,
      text: "إشعار لم تتم رؤيته أو النقر عليه بعد",
      isRead: false,
    },
    {
      id: 3,
      text: "إشعار لم تتم رؤيته أو النقر عليه بعد",
      isRead: false,
    },
  ];

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* Mobile Header - Visible on mobile only */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-4 flex-shrink-0"
        role="banner"
      >
        <div className="w-full relative flex items-center justify-center h-16">
          <h1 className="text-xl font-bold text-natural-primary-text">
            الإشعارات
          </h1>
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-0 flex h-fit w-fit items-center justify-center  text-brand-primary opacity-90 hover:opacity-100 transition-all"
            aria-label="العودة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Desktop/Tablet Top Navigation - Only visible on tablet and desktop */}
      <MainNavbar isLoggedIn={true} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-start md:justify-center px-4 md:px-6 lg:px-8 pt-8 md:pt-12 lg:pt-16 pb-24 md:pb-8 overflow-y-auto">
        <div className="w-full max-w-[358px] md:max-w-2xl lg:max-w-3xl">
          {/* Desktop/Tablet Page Title - Only visible on tablet and desktop */}
          <div className="hidden md:flex items-center justify-center relative mb-8 lg:mb-12">
            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              الإشعارات
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center justify-between gap-3 md:gap-5 min-h-[73px] md:min-h-[88px] rounded-lg p-4 md:p-6 border border-natural-light-border shadow-xs transition-all ${
                  !notification.isRead
                    ? "bg-natural-white hover:shadow-sm"
                    : "bg-natural-white hover:bg-gray-50"
                }`}
              >
                {/* Text Content */}
                <p className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl text-natural-primary-text text-right leading-relaxed">
                  {notification.text}
                </p>

                {/* Unread Indicator - Pink Dot */}
                {!notification.isRead && (
                  <div
                    className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 bg-brand-primary rounded-full"
                    aria-label="إشعار غير مقروء"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
