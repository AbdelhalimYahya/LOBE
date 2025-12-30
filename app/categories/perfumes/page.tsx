// app/categories/fragrance/page.tsx
"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { MainNavbar, HomeFooter, PageHeader } from "@/components";

export default function FragranceCategoryTeaserPage() {
  const [tilt, setTilt] = useState({ x: 10, y: -15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;

      setTilt({
        x: rotateX,
        y: rotateY,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 10, y: -15 });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff7fb] via-[#ffffff] to-[#ffeef5]"
      dir="rtl"
    >
      <MainNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* هيدر بنفس جو صفحة العناية */}
        <section className="mb-6 md:mb-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-pink-500/14 via-purple-500/8 to-fuchsia-500/18 border border-pink-100 shadow-[0_18px_45px_rgba(244,114,182,0.18)]">
            <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-pink-300/25 blur-2xl" />
            <div className="absolute -right-8 bottom-0 w-40 h-40 rounded-full bg-violet-400/25 blur-2xl" />
            <div className="absolute left-1/2 -bottom-16 w-40 h-40 rounded-full bg-rose-300/20 blur-3xl" />

            <div className="relative flex flex-col gap-3 px-4 py-6 md:px-8 md:py-8">
              <PageHeader title="العطور" />
              <p className="text-right text-muted-foreground mb-1 text-sm md:text-base max-w-2xl ml-auto">
                صفحة مخصصة لعالم العطور الفاخرة… نجهّز لك تجربة مختلفة تجمع بين
                الفخامة، والثبات، وروحك المميزة ✨
              </p>
            </div>
          </div>
        </section>

        {/* سكشن التشويق + 3D بسيط */}
        <section className="flex items-center justify-center py-10 md:py-16">
          <div className="w-full flex flex-col items-center gap-8 md:gap-10">
            {/* صندوق 3D */}
            <div
              className="relative w-full max-w-md md:max-w-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-fuchsia-500/10 via-transparent to-pink-500/10 blur-3xl" />

              <div
                className="relative mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-950 to-slate-900 px-6 py-8 md:px-10 md:py-10 border border-white/10 shadow-[0_24px_70px_rgba(15,23,42,0.8)] transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
                }}
              >
                {/* عناصر عطر عائمة */}
                <div className="absolute -top-10 left-6 md:left-10 w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-gradient-to-br from-fuchsia-400 via-pink-400 to-amber-300 shadow-[0_16px_40px_rgba(244,114,182,0.8)] animate-bounce-slow" />
                <div className="absolute -bottom-8 right-4 md:right-10 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-300/40 via-fuchsia-400/40 to-emerald-300/40 blur-xl animate-pulse" />
                <div className="absolute -right-4 top-10 w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-300 via-rose-400 to-pink-500 opacity-80 shadow-[0_14px_35px_rgba(251,191,36,0.6)] animate-float" />

                {/* "زجاجة" عطر وهمية */}
                <div className="relative flex flex-col items-center gap-5 md:gap-6">
                  <div className="relative w-32 h-40 md:w-40 md:h-52">
                    <div className="absolute inset-0 rounded-[1.7rem] bg-gradient-to-b from-slate-100/80 via-slate-50/40 to-slate-100/80 backdrop-blur-xl border border-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.6)]" />
                    <div className="absolute inset-[6px] rounded-[1.4rem] bg-gradient-to-b from-fuchsia-300/20 via-rose-200/8 to-pink-200/30 opacity-90" />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-7 rounded-[16px] bg-gradient-to-b from-slate-100 to-slate-300 border border-white/70 shadow-[0_10px_20px_rgba(15,23,42,0.5)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[45%] rounded-[1.2rem] bg-gradient-to-br from-fuchsia-500/70 via-rose-400/80 to-amber-300/80 shadow-[0_12px_30px_rgba(244,114,182,0.8)]" />
                    <div className="absolute inset-[10px] rounded-[1.4rem] border border-white/50" />
                  </div>

                  {/* النص الرئيسي: قريباً */}
                  <div className="text-center space-y-2 md:space-y-3">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-l from-pink-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                      قريباً
                    </h1>
                    <p className="text-xs md:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                     نعمل حالياً على اختيار مجموعة مميّزة من العطور،خليكم جاهزين لتجربة عطرية مختلفة ✨
                    </p>
                  </div>

                  {/* سطر صغير فيه "مؤشرات" تقدم */}
                  <div className="flex items-center gap-2 justify-center text-[11px] md:text-xs text-slate-400">
                    <span>تجهيز الصفحة</span>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="inline-flex w-2 h-2 rounded-full bg-amber-300/70" />
                      <span className="inline-flex w-2 h-2 rounded-full bg-slate-600/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* سطر بسيط تحت الكرت */}
            <div className="text-center text-[11px] md:text-xs text-muted-foreground">
              تابعينا… سيتم إضافة منتجات العطور قريباً، مع خيارات تصفية وتقييمات
               ✨
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

/* tailwind.css (ضيف هذي الأنيميشنز لو ما عندك شيء مشابه)
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-6px) translateX(3px); }
}
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
.animate-float { animation: float 4s ease-in-out infinite; }
*/
