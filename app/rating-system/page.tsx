"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RatingSystemPage() {
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
    router.push("/account");
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
            كيف نقيم المنتجات
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
      <main className="flex flex-1 flex-col items-center justify-start md:justify-start px-4 md:px-6 lg:px-8 pt-8 md:pt-8 pb-24 md:pb-8 overflow-y-auto scrollbar-right">
        <div className="w-full max-w-[358px] md:max-w-2xl lg:max-w-3xl">
          {/* Desktop/Tablet Header - Only visible on tablet and desktop */}
          <div className="hidden md:flex items-center justify-center relative mb-12 lg:mb-16">
            <h1 className="text-2xl lg:text-3xl font-medium text-natural-primary-text">
              كيف نقيم المنتجات
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
          <div className="flex flex-col gap-6">
            {/* Introduction Text */}
            <div className="flex flex-col gap-4">
              <p className="text-base text-natural-subtext-description leading-relaxed text-right p-4">
                نقيّم كل منتج من خلال تحليل مكوناته الفردية يُراجع كل مكوّن
                علميًا وفق مصدره، وتأثيره الصحي المحتمل، وحجم المعلومات
                المتوفّرة عنه في الأبحاث والدراسات. <br /> يُمنح المنتج درجة
                رقمية من <span className="font-medium">1</span> إلى{" "}
                <span className="font-medium">10</span> تعبّر عن مستوى الأمان.{" "}
                <br /> الهدف هو تقديم تقييم علمي مبسّط يوضّح مدى سلامة المنتج
                قبل استخدامه،
                <span className="font-medium"> وفق المستويات التالية:</span>
              </p>
            </div>

            {/* Safety Scale Section */}
            <div
              className="bg-natural-white rounded-2xl px-4 py-5"
              style={{ boxShadow: "0px 1px 4px 0px #15151533" }}
            >
              <h2 className="text-base font-medium text-natural-primary-text mb-4">
                مقياس الأمان المعتمد لتقييم المنتجات:
              </h2>

              <div className="flex flex-col gap-4">
                {/* Safe Box - Green */}
                <div className="bg-status-light-green rounded-xl px-2 py-4">
                  <div className="flex items-start gap-2">
                    <Icon
                      name="CheckCircle"
                      size={24}
                      category="security"
                      className="text-status-success flex-shrink-0 w-6 h-6 mr-2"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-status-success">
                          1 - 3
                        </p>
                        <p className="text-sm font-medium text-status-success mb-1">
                          آمن
                        </p>
                        <p className="text-xs text-natural-subtext-description">
                          لا يحتوي على مواد معروفة بأنها مثيرة للجدل أو ضارة.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medium Safety Box - Yellow */}
                <div className="bg-status-light-yellow rounded-xl px-2 py-4">
                  <div className="flex items-start gap-2">
                    <Icon
                      name="WarningCircle"
                      size={24}
                      category="security"
                      className="text-status-warning flex-shrink-0 w-6 h-6 mr-2"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-status-warning">
                          4 - 7
                        </p>
                        <p className="text-sm font-medium text-status-warning mb-1">
                          متوسط الآمان
                        </p>
                        <p className="text-xs text-natural-subtext-description">
                          قد يحتوي على مكوّنات يمكن أن تُسبب آثارًا صحية عند
                          الاستخدام المتكرر أو طويل الأمد.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Not Recommended Box - Red */}
                <div className="bg-status-light-red rounded-xl px-2 py-4">
                  <div className="flex items-start gap-2">
                    <Icon
                      name="XCircle"
                      size={24}
                      category="math"
                      className="text-status-error flex-shrink-0 w-6 h-6 mr-2"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-status-error">
                          8 - 10
                        </p>
                        <p className="text-sm font-medium text-status-error mb-1">
                          لا يوصى به
                        </p>
                        <p className="text-xs text-natural-subtext-description">
                          يحتوي على مكوّنات ذات آثار صحية خطيرة أو طويلة المدى.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Methodology Section */}
            <div className="bg-[#F9F9F9] rounded-2xl p-5">
              <h2 className="text-base font-medium text-natural-primary-text mb-6">
                منهجية التحليل:
              </h2>

              <ul className="list-disc mr-4 space-y-6">
                <li>
                  <div className="flex flex-col gap-2">
                    <p className="text-base md:text-base font-medium text-natural-primary-text">
                      الاعتماد على المكوّنات
                    </p>
                    <p className="text-sm text-natural-helper-text leading-relaxed">
                      التقييم مبني على قائمة المكوّنات الفعلية فقط، بغضّ النظر
                      عن العلامة التجارية أو تسويق المنتج. وجود أي مكوّن ضار أو
                      مثير للجدل يرفع مستوى الخطورة في التقييم.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="flex flex-col gap-2">
                    <p className="text-base md:text-base font-medium text-natural-primary-text">
                      المصادر العلمية
                    </p>
                    <p className="text-sm text-natural-helper-text leading-relaxed">
                      تستند عملية التقييم إلى بيانات من جهات وهيئات علمية
                      متخصّصة بسلامة المواد التجميلية.
                    </p>
                  </div>
                </li>

                <li className="flex flex-col gap-2">
                  <p className="text-base md:text-base font-medium text-natural-primary-text">
                    أنواع المخاطر التي يتم تقييمها
                  </p>
                  <ul className="list-disc space-y-1 my-6 leading-relaxed">
                    <li className="text-sm text-natural-helper-text">
                      احتمال التسبّب بالسرطان.
                    </li>
                    <li className="text-sm text-natural-helper-text">
                      اضطراب الهرمونات الطبيعية.
                    </li>
                    <li className="text-sm text-natural-helper-text">
                      التأثير على الصحة الإنجابية.
                    </li>
                    <li className="text-sm text-natural-helper-text">
                      التهيّج والحساسية الجلدية.
                    </li>
                    <li className="text-sm text-natural-helper-text">
                      التأثيرات البيئية الضارّة.
                    </li>
                  </ul>
                </li>

                <li>
                  <div className="flex flex-col gap-2">
                    <p className="text-base md:text-base font-medium text-natural-primary-text">
                      الشفافية
                    </p>
                    <p className="text-sm text-natural-helper-text leading-relaxed">
                      المنتجات التي لا تكشف مكوّناتها بالكامل (مثل استخدام كلمة
                      &quot;عطور&quot; دون تفصيل) تُعتبر أقل أمانًا وتقيّم بدرجة
                      أعلى من الخطورة.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Disclaimer Section */}
            <div
              className="bg-natural-white rounded-2xl p-4"
              style={{ border: "0.5px solid #E5E5E5" }}
            >
              <p className="text-sm text-natural-helper-text leading-relaxed text-right">
                جميع التقييمات مستقلة ومحايدة، وتهدف إلى توضيح درجة الأمان
                العلمي لكل منتج بدقّة ووضوح.
              </p>
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
