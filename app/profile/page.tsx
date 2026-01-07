"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { getAuthToken } from "@/lib/auth";

type ProfileData = {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  skin_type: string | null;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skinType, setSkinType] = useState<string | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const SKIN_TYPES = [
    { value: "normal", label: "عادية" },
    { value: "dry", label: "جافة" },
    { value: "oily", label: "دهنية" },
    { value: "combination", label: "مختلطة" },
    { value: "sensitive", label: "حساسة" },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
    }
    router.push("/login");
  };

  // تحميل بيانات المستخدم
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem("currentUser")
            : null;

        if (!stored) {
          router.push("/login");
          return;
        }

        const parsed = JSON.parse(stored) as ProfileData;

        // عرض بيانات localStorage أولاً
        setProfile(parsed);
        setName(parsed.name || "");
        setPhoneNumber(parsed.phone_number || "");
        setSkinType(parsed.skin_type || "");

        // ثم جلب أحدث البيانات من API
        const token = getAuthToken();
        if (token) {
          const res = await fetch(`${API_BASE_URL}/auth/user/`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const freshData = await res.json();
            const profileData: ProfileData = {
              user_id: freshData.user_id || freshData.id || parsed.user_id,
              name: freshData.name || freshData.username || parsed.name,
              email: freshData.email || parsed.email,
              phone_number: freshData.phone_number || freshData.phone || parsed.phone_number || "",
              skin_type: freshData.skin_type || parsed.skin_type,
            };

            setProfile(profileData);
            setName(profileData.name);
            setPhoneNumber(profileData.phone_number);
            setSkinType(profileData.skin_type || "");

            // تحديث localStorage بالبيانات الحديثة
            if (typeof window !== "undefined") {
              localStorage.setItem("currentUser", JSON.stringify(profileData));
            }
          }
        }
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل بيانات الملف الشخصي");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [router, API_BASE_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setError(null);
    setSuccess(null);

    // Validation: Check if phone number is empty
    if (!phoneNumber.trim()) {
      setError("يرجى إدخال رقم الجوال");
      return;
    }

    try {
      setIsSaving(true);

      const token = getAuthToken();
      if (!token) {
        setError("جلسة انتهت صلاحيتها. الرجاء تسجيل الدخول مجددا");
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/auth/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: phoneNumber,
          skin_type: skinType || null,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.detail || "فشل تحديث الملف الشخصي بيانات الدخول خاطئة");
        return;
      }

      // Update local state with new values
      const updated = {
        ...profile,
        phone_number: phoneNumber,
        skin_type: skinType,
      };

      setProfile(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(updated));
      }

      setSuccess("تم حفظ التغييرات بنجاح");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء حفظ البيانات");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-natural-white"
        dir="rtl"
      >
        <p className="text-natural-primary-text">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-natural-white"
        dir="rtl"
      >
        <p className="text-natural-primary-text">
          لا توجد بيانات مستخدم. يرجى تسجيل الدخول مرة أخرى.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* هيدر للموبايل */}
      <header className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-0 flex-shrink-0">
        <div className="w-full max-w-[358px] relative flex items-center justify-center h-16">
          <h1 className="text-xl font-medium text-natural-primary-text">
            الملف الشخصي
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

      <main className="flex flex-1 flex-col items-center justify-start md:justify-center px-4 md:px-6 lg:px-8 pt-8 md:pt-0 pb-24 md:pb-8 overflow-y-auto">
        <div className="w-full max-w-[358px] md:max-w-2xl lg:max-w-3xl">
          {/* هيدر للديسكتوب */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={handleBack}
              className="flex h-8 w-8 items-center justify-center text-brand-primary hover:bg-brand-primary-light-bg rounded-lg transition-colors"
              aria-label="العودة"
            >
              <Icon
                name="CaretRight"
                size={24}
                category="arrows"
                className="text-brand-primary stroke-brand-primary md:scale-110"
              />
            </button>

            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              الملف الشخصي
            </h1>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-status-error border border-status-error rounded-lg hover:bg-status-error/5"
            >
              تسجيل الخروج
            </button>
          </div>

          {/* رسائل الحالة */}
          {error && (
            <p className="text-status-error text-sm mb-4 text-right">{error}</p>
          )}
          {success && (
            <p className="text-status-success text-sm mb-4 text-right">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* الاسم */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-normal text-natural-primary-text mb-2 text-right"
              >
                الاسم
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
              />
            </div>

            {/* البريد (عرض فقط) */}
            <div>
              <label className="block text-sm font-normal text-natural-primary-text mb-2 text-right">
                البريد الإلكتروني
              </label>
              <div className="w-full h-12 px-4 flex items-center border border-natural-light-border rounded-lg bg-gray-50 text-natural-helper-text">
                {profile.email}
              </div>
            </div>

            {/* الجوال */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-normal text-natural-primary-text mb-2 text-right"
              >
                رقم الجوال
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-12 px-4 border border-natural-light-border rounded-lg"
              />
            </div>

            {/* نوع البشرة */}
            <div>
              <label
                htmlFor="skinType"
                className="block text-sm font-normal text-natural-primary-text mb-2 text-right"
              >
                نوع البشرة
              </label>
              <select
                id="skinType"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full h-12 px-4 border border-natural-light-border rounded-lg bg-natural-white"
              >
                <option value="">اختر نوع بشرتك (اختياري)</option>
                {SKIN_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full h-12 mt-4 rounded-lg bg-brand-buttons-status-default text-white font-medium disabled:bg-brand-buttons-status-disabled"
            >
              {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="md:hidden w-full h-12 mt-2 rounded-lg border border-status-error text-status-error font-medium hover:bg-status-error/5 transition-colors"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
