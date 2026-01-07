"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleBack = () => {
    router.push('/');
  };

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

    if (!name || !email || !phoneNumber || !password || !passwordConfirm) {
      setError("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    if (password !== passwordConfirm) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: phoneNumber,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.detail || "فشل إنشاء الحساب");
        return;
      }

      const data = await response.json();

      // If registration returns token, auto-login
      if (data.token || data.access_token || data.access) {
        if (typeof window !== "undefined") {
          const token = data.token || data.access_token || data.access;
          const user = data.user || data.data;

          if (token) {
            localStorage.setItem("authToken", token);
          }
          if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
          }
        }
        // Auto redirect to home if registration includes login
        router.replace("/");
        return;
      }

      setSuccess("تم إنشاء الحساب بنجاح، سيتم تحويلك لتسجيل الدخول");

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع، الرجاء المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* Mobile Header */}
      <header className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-0 flex-shrink-0">
        <div className="w-full max-w-md relative flex items-center justify-center h-16">
          <h1 className="text-xl font-medium text-natural-primary-text">
            إنشاء حساب
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
              إنشاء حساب جديد
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
            {/* رسائل الخطأ / النجاح */}
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

            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
              {/* الاسم */}
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm md:text-base mb-2 text-right text-natural-primary-text"
                >
                  الاسم
                  <span className="text-status-error mr-0.5">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
                />
              </div>

              {/* البريد */}
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

              {/* رقم الجوال */}
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block text-sm md:text-base mb-2 text-right text-natural-primary-text"
                >
                  رقم الجوال
                  <span className="text-status-error mr-0.5">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="مثال: +9665xxxxxxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
                />
              </div>

              {/* كلمة المرور */}
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

              {/* تأكيد كلمة المرور */}
              <div className="w-full">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm md:text-base mb-2 text-right text-natural-primary-text"
                >
                  تأكيد كلمة المرور
                  <span className="text-status-error mr-0.5">*</span>
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-8 rounded-lg bg-brand-buttons-status-default text-white font-medium disabled:bg-brand-buttons-status-disabled"
            >
              {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-natural-helper-text">
              لديك حساب بالفعل؟{" "}
              <a
                href="/login"
                className="text-brand-primary hover:text-brand-buttons-status-hover"
              >
                تسجيل الدخول
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
