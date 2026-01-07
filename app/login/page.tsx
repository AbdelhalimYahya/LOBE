"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.detail || "بيانات الدخول غير صحيحة");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      // Save token and user to localStorage
      // Handle different token field names: token, access_token, etc.
      if (typeof window !== "undefined") {
        const token = data.token || data.access_token || data.access || null;
        if (token) {
          localStorage.setItem("authToken", token);
        }

        const user = data.user || data.data || null;
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      }

      // Redirect to home page
      router.replace("/");    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* Mobile Header */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-0 flex-shrink-0"
        role="banner"
      >
        <div className="w-full max-w-md relative flex items-center justify-center h-16">
          <h1 className="text-xl font-medium text-natural-primary-text">
            تسجيل الدخول
          </h1>
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-0 flex h-6 w-6 items-center justify-center text-brand-primary hover:bg-brand-primary-light-bg rounded-lg transition-colors"
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

      <main className="flex flex-1 items-start md:items-center justify-center px-4 md:px-6 lg:px-8 pt-24 md:pt-0 pb-8 overflow-y-auto">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-center relative mb-12 lg:mb-16">
            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              تسجيل الدخول
            </h1>
            <button
              type="button"
              onClick={handleBack}
              className="absolute right-0 flex h-8 w-8 items-center justify-center text-brand-primary hover:bg-brand-primary-light-bg rounded-lg transition-colors"
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

            {/* Error message */}
            {error && (
              <p className="text-status-error text-sm mb-4 text-right">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-6 md:gap-7 lg:gap-8">

              {/* Email */}
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base mb-2 text-right text-natural-primary-text"
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
                  className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block text-sm md:text-base mb-2 text-right text-natural-primary-text"
                >
                  كلمة المرور
                  <span className="text-status-error mr-0.5">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
                />
              </div>

              <a
                href="/forgot-password"
                className="text-sm text-brand-primary hover:text-brand-buttons-status-hover -mt-2 text-left"
              >
                نسيت كلمة المرور؟
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-8 rounded-lg bg-brand-buttons-status-default text-white font-medium disabled:bg-brand-buttons-status-disabled"
            >
              {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-natural-helper-text">
              ليس لديك حساب؟{" "}
              <a href="/register" className="text-brand-primary hover:text-brand-buttons-status-hover">
                أنشئ حسابًا جديدًا
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
