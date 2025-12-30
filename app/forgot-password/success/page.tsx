"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function ForgotPasswordSuccessPage() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* Mobile Header - Only visible on mobile, no title */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-0 flex-shrink-0"
        role="banner"
      >
        <div className="w-full max-w-[358px] relative flex items-center h-16">
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

      {/* Main Content - Mobile: top-aligned, Tablet/Desktop: centered */}
      <main className="flex flex-1 items-start md:items-center justify-center px-4 md:px-6 lg:px-8 pt-24 md:pt-0 pb-8 md:pb-0 overflow-y-auto">
        <div className="w-full max-w-[358px] md:max-w-lg lg:max-w-xl">
          {/* Tablet/Desktop Header - Only visible on tablet and desktop, no title */}
          <div className="hidden md:flex items-center relative mb-12 lg:mb-16">
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

          {/* Success Card */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-brand-primary-light-bg flex items-center justify-center">
                <Icon
                  name="SealCheck"
                  size={40}
                  category="security"
                  className="text-brand-primary"
                />
              </div>
            </div>

            {/* Success Message */}
            <div className="flex flex-col gap-6">
              <p className="text-base text-natural-primary-text font-normal text-center leading-relaxed py-4">
                تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.
                <br /> تفقّد صندوق الوارد أو البريد الغير
                هام
              </p>

              {/* Back to Login Button */}
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full h-11 md:h-12 rounded-lg bg-brand-buttons-status-default text-natural-white font-medium text-base transition-opacity hover:bg-brand-buttons-status-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2 shadow-sm"
              >
                العودة إلى الصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
