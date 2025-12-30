"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("الرجاء إدخال البريد الإلكتروني");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("البريد الإلكتروني غير صحيح");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/password/reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.detail || data?.email?.[0] || "فشل إرسال رابط إعادة التعيين");
        return;
      }

      setSuccess("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
      setEmail("");

      setTimeout(() => {
        router.push("/forgot-password/success");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع، الرجاء المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  };

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
            نسيت كلمة المرور
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

      {/* Main Content - Mobile: top-aligned, Tablet/Desktop: centered */}
      <main className="flex flex-1 items-start md:items-center justify-center px-4 md:px-6 lg:px-8 pt-24 md:pt-0 pb-8 md:pb-0 overflow-y-auto">
        <div className="w-full max-w-[358px] md:max-w-lg lg:max-w-xl">
          {/* Tablet/Desktop Header - Only visible on tablet and desktop */}
          <div className="hidden md:flex items-center justify-center relative mb-12 lg:mb-16">
            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              نسيت كلمة المرور
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

          <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
            {/* Error and Success Messages */}
            {error && (
              <p className="text-status-error text-sm mb-4 text-right">
                {error}
              </p>
            )}
            {success && (
              <p className="text-status-success text-sm mb-4 text-right">
                {success}
              </p>
            )}

            {/* Form Container */}
            <div className="flex flex-col gap-6 md:gap-7 lg:gap-11">
              {/* Description and Input Section */}
              <div className="flex flex-col gap-11">
                {/* Description Text */}
                <div className="w-full">
                  <p className="text-base text-natural-primary-text font-normal text-center leading-relaxed">
                    أدخل بريدك الإلكتروني وسنرسل لك رابطًا
                    <br className="md:hidden" /> لإعادة تعيين كلمة المرور.
                  </p>
                </div>

                {/* Email Input */}
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm md:text-base font-normal text-natural-primary-text mb-2 text-right"
                  >
                    البريد الإلكتروني
                    <span className="text-status-error mr-0.5">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 md:h-12 px-4 md:px-5 text-base text-natural-primary-text placeholder:text-sm placeholder:text-natural-input-hint bg-natural-white border border-natural-light-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-buttons-status-focus-border focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 md:h-12 rounded-lg bg-brand-buttons-status-default text-natural-white font-medium text-base transition-opacity hover:bg-brand-buttons-status-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2 disabled:bg-brand-buttons-status-disabled disabled:cursor-not-allowed shadow-sm"
              >
                {isLoading ? "جاري التحميل..." : "إرسال رابط إعادة التعيين"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

