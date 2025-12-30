"use client";

import type React from "react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordPageContent />
    </Suspense>
  );
}

function ResetPasswordPageContent() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validateResetLink = useCallback(
    async (uidParam: string, tokenParam: string) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/password/reset/confirm/${uidParam}/${tokenParam}/`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          setError("رابط إعادة تعيين كلمة المرور غير صحيح أو منتهي الصلاحية");
        }
      } catch (err) {
        console.error(err);
        setError("حدث خطأ في التحقق من الرابط");
      }
    },
    [API_BASE_URL]
  );

  useEffect(() => {
    const read = () => {
      try {
        const sp = new URLSearchParams(window.location.search);
        const uidParam = sp.get("uid");
        const tokenParam = sp.get("token");

        if (!uidParam || !tokenParam) {
          setError("رابط إعادة تعيين كلمة المرور غير صحيح أو منتهي الصلاحية");
          setUid(null);
          setToken(null);
          return;
        }

        setError(null);
        setUid(uidParam);
        setToken(tokenParam);

        validateResetLink(uidParam, tokenParam);
      } catch {
        setError("رابط إعادة تعيين كلمة المرور غير صحيح أو منتهي الصلاحية");
        setUid(null);
        setToken(null);
      }
    };

    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [validateResetLink]);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }
    if (!/[A-Za-z]/.test(pwd)) {
      return "كلمة المرور يجب أن تحتوي على أحرف إنجليزية (A-Z أو a-z)";
    }
    if (!/\d/.test(pwd)) {
      return "كلمة المرور يجب أن تحتوي على أرقام (0-9)";
    }
    if (!/^[A-Za-z\d@!#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]+$/.test(pwd)) {
      return "كلمة المرور تحتوي على أحرف غير مسموحة";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword || !confirmPassword) {
      setError("الرجاء تعبئة جميع الحقول");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!uid || !token) {
      setError("بيانات الرابط غير صحيحة");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/password/reset/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password1: newPassword,
          new_password2: confirmPassword,
          uid: uid,
          token: token,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.detail || data?.non_field_errors?.[0] || "فشل تحديث كلمة المرور");
        return;
      }

      setSuccess("تم تحديث كلمة المرور بنجاح");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
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
            إعادة تعيين كلمة المرور
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
              إعادة تعيين كلمة المرور
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
              {/* Description and Inputs Section */}
              <div className="flex flex-col gap-11">
                {/* Description Text */}
                <div className="w-full">
                  <p className="text-base text-natural-primary-text font-normal text-center">
                    أنشئ كلمة مرور جديدة لحسابك.
                  </p>
                </div>

                {/* Password Inputs */}
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-4">
                  {/* New Password Input */}
                  <div className="w-full">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm md:text-base font-normal text-natural-primary-text mb-2 text-right"
                    >
                      كلمة المرور الجديدة
                      <span className="text-status-error mr-0.5">*</span>
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      placeholder="أدخل كلمة المرور الجديدة"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full h-11 md:h-12 px-4 md:px-5 text-base text-natural-primary-text placeholder:text-sm placeholder:text-natural-input-hint bg-natural-white border border-natural-light-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-buttons-status-focus-border focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="w-full">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm md:text-base font-normal text-natural-primary-text mb-2 text-right"
                    >
                      كلمة المرور الجديدة
                      <span className="text-status-error mr-0.5">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="أعد إدخال كلمة المرور"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full h-11 md:h-12 px-4 md:px-5 text-base text-natural-primary-text placeholder:text-sm placeholder:text-natural-input-hint bg-natural-white border border-natural-light-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-buttons-status-focus-border focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !!error}
                className="w-full h-11 md:h-12 rounded-lg bg-brand-buttons-status-default text-natural-white font-medium text-base transition-opacity hover:bg-brand-buttons-status-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2 disabled:bg-brand-buttons-status-disabled disabled:cursor-not-allowed shadow-sm"
              >
                {isLoading ? "جاري التحميل..." : "تحديث كلمة المرور"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

