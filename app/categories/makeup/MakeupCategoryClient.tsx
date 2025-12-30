// app/categories/makeup/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HomeFooter, MainNavbar, PageHeader } from "@/components";
import { authenticatedFetch } from "@/lib/auth";

type MakeupProduct = {
  makeup_id: number;
  name: string;
  image_url: string | null;
  skin_type: string | null; // لو مو موجود في الـ API بيطلع undefined ونعرض "غير محدد"
  avg_rating: number | null;
  reviews_count: number | null;
  brand_name: string | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// لو رابط الميكب مختلف عدّليه هنا
const MAKEUP_ENDPOINT = `${API_BASE_URL}/v1/makeup/makeup_products/`;

async function getMakeupProducts(): Promise<MakeupProduct[]> {
  const res = await authenticatedFetch(MAKEUP_ENDPOINT, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch makeup products", res.status);
    return [];
  }

  const responseData = await res.json();

  // Handle different response formats
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (responseData?.data && Array.isArray(responseData.data)) {
    return responseData.data;
  }

  if (responseData?.results && Array.isArray(responseData.results)) {
    return responseData.results;
  }

  return [];
}

// دالة لتوليد أرقام الصفحات مع ...
function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | "dots")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "dots")[] = [];
  const delta = 1;

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (left > 2) pages.push("dots");

  for (let i = left; i <= right; i) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push("dots");

  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export default function MakeupCategoryClient() {
  const [products, setProducts] = useState<MakeupProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  // ------- حالات الفلاتر -------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSkinType, setSelectedSkinType] = useState<string>("all");
  const [minRating, setMinRating] = useState<string>("all");
  // -----------------------------

  // جلب منتجات الميكب + ترتيب اللي عندها صورة أولاً
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMakeupProducts();

        const sorted = [...data].sort((a, b) => {
          const aHasImage = !!a.image_url;
          const bHasImage = !!b.image_url;
          if (aHasImage === bHasImage) return 0;
          return aHasImage ? -1 : 1;
        });

        setProducts(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // خيارات الفلترة (ماركات / أنواع البشرة) من البيانات نفسها
  const brandOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) => p.brand_name)
            .filter((b): b is string => !!b && b.trim().length > 0)
        )
      ),
    [products]
  );

  const skinTypeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) => p.skin_type)
            .filter((t): t is string => !!t && t.trim().length > 0)
        )
      ),
    [products]
  );

  // ------------------ الفلترة قبل الـ Pagination ------------------
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // بحث بالاسم
      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // فلتر ماركة
      if (selectedBrand !== "all" && product.brand_name !== selectedBrand) {
        return false;
      }

      // فلتر نوع البشرة / الاستخدام
      if (selectedSkinType !== "all" && product.skin_type !== selectedSkinType) {
        return false;
      }

      // فلتر أقل تقييم
      if (minRating !== "all") {
        const min = Number(minRating);
        const rating = product.avg_rating ?? 0;
        if (rating < min) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedBrand, selectedSkinType, minRating]);
  // ----------------------------------------------------------------

  // ------------------ إعدادات الـ Pagination ------------------
  const pageSize = 12;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  const pageParam = searchParams.get("page");
  let pageNumberRaw = Number(pageParam || "1");
  if (!Number.isFinite(pageNumberRaw) || pageNumberRaw < 1) {
    pageNumberRaw = 1;
  }
  const currentPage = Math.min(pageNumberRaw, totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );
  // ------------------------------------------------------------

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedSkinType("all");
    setMinRating("all");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff7fb] via-[#ffffff] to-[#ffeef5]"
      dir="rtl"
    >
      <MainNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* هيدر ثري دي للمكياج */}
        <section className="mb-6 md:mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-pink-500/12 via-rose-400/6 to-fuchsia-400/14 border border-pink-100 shadow-[0_18px_45px_rgba(244,114,182,0.18)]">
            <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-pink-300/25 blur-2xl" />
            <div className="absolute -right-8 bottom-0 w-40 h-40 rounded-full bg-fuchsia-400/25 blur-2xl" />
            <div className="absolute left-1/2 -bottom-16 w-40 h-40 rounded-full bg-rose-300/20 blur-3xl" />

            <div className="relative flex flex-col gap-3 px-4 py-6 md:px-8 md:py-8">
              <PageHeader title="المكياج" />
              <p className="text-right text-muted-foreground mb-1 text-sm md:text-base max-w-2xl ml-auto">
                استكشف مجموعة مختارة من منتجات المكياج لمختلف الإطلالات بمنتجات
                تناسب ذوقك وتكمل جمالك بلمسة أنثوية ناعمة. 💗
              </p>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              {/* لودر ثري دي بسيط */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-400 to-fuchsia-400 animate-pulse shadow-[0_20px_40px_rgba(244,114,182,0.35)]" />
                <div className="absolute inset-0 rounded-2xl border border-white/40 backdrop-blur-sm" />
              </div>
              <p className="text-center text-muted-foreground text-sm md:text-base">
                جاري تحميل منتجات المكياج...
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            لا توجد منتجات مكياج حالياً في قاعدة البيانات.
          </p>
        ) : totalProducts === 0 ? (
          <p className="text-center text-muted-foreground">
            لا توجد منتجات مطابقة للفلاتر الحالية.
          </p>
        ) : (
          <>
            {/* تخطيط المحتوى: فلتر على اليمين + المنتجات على اليسار (في RTL) */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* سايدبار الفلاتر - يطلع يمين في RTL لأنه أول عنصر */}
              <aside className="w-full md:w-64 md:sticky md:top-28">
                <div className="rounded-3xls bg-white/85 backdrop-blur-md border border-pink-50 shadow-[0_16px_35px_rgba(244,114,182,0.18)] px-3.5 py-4 md:px-4 md:py-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col text-right">
                      <h2 className="text-sm font-semibold text-slate-800">
                        تصفية النتائج
                      </h2>
                      <span className="text-[11px] text-slate-400">
                        شوفي المنتجات اللي تناسبك أكثر ✨
                      </span>
                    </div>
                    <span className="text-[11px] md:text-xs rounded-full bg-pink-50 px-2 py-1 text-pink-600">
                      {totalProducts} / {products.length}
                    </span>
                  </div>

                  {/* فلاتر بشكل أنحف */}
                  <div className="flex flex-col gap-2.5">
                    {/* فلتر الماركة */}
                    <div className="flex flex-col gap-1 text-right">
                      <label className="text-[11px] text-slate-500">
                        الماركة
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full rounded-2xl border border-pink-100 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                      >
                        <option value="all">الكل</option>
                        {brandOptions.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* فلتر نوع البشرة / الاستخدام */}
                    <div className="flex flex-col gap-1 text-right">
                      <label className="text-[11px] text-slate-500">
                        نوع البشرة / الاستخدام
                      </label>
                      <select
                        value={selectedSkinType}
                        onChange={(e) => setSelectedSkinType(e.target.value)}
                        className="w-full rounded-2xl border border-pink-100 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                      >
                        <option value="all">الكل</option>
                        {skinTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* فلتر التقييم */}
                    <div className="flex flex-col gap-1 text-right">
                      <label className="text-[11px] text-slate-500">
                        أقل تقييم
                      </label>
                      <select
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        className="w-full rounded-2xl border border-pink-100 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                      >
                        <option value="all">بدون فلتر</option>
                        <option value="4">4+ نجوم</option>
                        <option value="3">3+ نجوم</option>
                        <option value="2">2+ نجوم</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-1 inline-flex items-center justify-center gap-1 rounded-full border border-pink-200 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-pink-600 hover:bg-pink-50 hover:border-pink-300 hover:shadow-[0_10px_25px_rgba(244,114,182,0.28)] hover:-translate-y-[1px] transition-all"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                </div>
              </aside>

              {/* شبكة المنتجات + الباجينيشن */}
              <section className="flex-1 flex flex-col gap-6">
                {/* شبكة المنتجات – كروت ثري دي */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.makeup_id}
                      href={`/products/${product.makeup_id}?category=makeup`}
                      className="group relative rounded-3xl bg-white/95 border border-pink-50 shadow-[0_18px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_25px_55px_rgba(244,114,182,0.22)] hover:-translate-y-2 hover:-rotate-[0.6deg] transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col overflow-hidden"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-pink-500/8 via-fuchsia-400/0 to-rose-400/16" />

                      <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-[#fff9fc] via-[#fff5f9] to-[#ffe9f3] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.28),transparent_60%),radial-gradient(circle_at_bottom,_rgba(217,70,239,0.22),transparent_55%)] transition-opacity duration-300" />

                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="relative z-10 max-h-full max-w-full object-contain transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.08] group-hover:-translate-y-1 group-hover:rotate-[1.5deg]"
                          />
                        ) : (
                          <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground">
                            <div className="w-9 h-9 rounded-2xl border border-pink-200/70 bg-white/80 flex items-center justify-center text-[11px] shadow-[0_10px_20px_rgba(236,72,153,0.35)]">
                              💄
                            </div>
                            <span className="px-2 text-center leading-snug">
                              الصورة غير متوفرة حالياً
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 p-3.5 flex flex-col gap-1.5">
                        <h2 className="font-semibold text-xs md:text-sm text-right line-clamp-2 text-slate-800">
                          {product.name}
                        </h2>

                        <p className="text-[10px] md:text-xs text-right text-muted-foreground">
                          شركة المنتج:{" "}
                          <span className="font-medium text-pink-700">
                            {product.brand_name ?? "غير معروف"}
                          </span>
                        </p>

                        <div className="mt-auto space-y-0.5 text-[10px] md:text-xs text-right text-muted-foreground">
                          <p>
                            نوع البشرة / الاستخدام:{" "}
                            <span className="font-medium text-slate-900">
                              {product.skin_type ?? "غير محدد"}
                            </span>
                          </p>

                          <p className="flex items-center justify-between gap-2">
                            <span>
                              التقييم:{" "}
                              <span className="font-medium text-slate-900">
                                {product.avg_rating ?? "-"}
                              </span>{" "}
                              ({product.reviews_count ?? 0} مراجعات)
                            </span>

                            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-amber-400 via-pink-400 to-fuchsia-500 text-white px-2 py-[3px] text-[10px] shadow-[0_10px_25px_rgba(244,114,182,0.55)] group-hover:scale-105 group-hover:translate-y-[-1px] transition-transform">
                              ⭐
                              <span className="font-semibold">
                                {product.avg_rating ?? "جديد"}
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* شريط التنقّل بين الصفحات */}
                {totalPages > 1 && (
                  <nav className="mt-2 flex justify-center items-center gap-2 text-sm md:text-base">
                    {currentPage > 1 && (
                      <Link
                        href={`?page=1`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white/90 backdrop-blur-sm text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
                      >
                        «
                      </Link>
                    )}

                    {currentPage > 1 && (
                      <Link
                        href={`?page=${currentPage - 1}`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white/90 backdrop-blur-sm text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
                      >
                        ‹
                      </Link>
                    )}

                    {generatePageNumbers(currentPage, totalPages).map((item, idx) => {
                      if (item === "dots") {
                        return (
                          <span
                            key={`dots-${idx}`}
                            className="min-w-[36px] h-9 flex items-center justify-center text-xs md:text-sm text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }

                      const page = item as number;
                      const isActive = page === currentPage;

                      return (
                        <Link
                          key={page}
                          href={`?page=${page}`}
                          className={[
                            "min-w-[36px] h-9 flex items-center justify-center rounded-full border text-xs md:text-sm transition-all",
                            isActive
                              ? "bg-gradient-to-l from-pink-500 via-rose-400 to-fuchsia-500 text-white border-transparent shadow-[0_14px_30px_rgba(244,114,182,0.6)] scale-[1.05] -translate-y-[2px]"
                              : "bg-white/90 backdrop-blur-sm text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-500 hover:shadow-[0_10px_28px_rgba(148,163,184,0.35)] hover:-translate-y-[2px]",
                          ].join(" ")}
                        >
                          {page}
                        </Link>
                      );
                    })}

                    {currentPage < totalPages && (
                      <Link
                        href={`?page=${currentPage + 1}`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white/90 backdrop-blur-sm text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
                      >
                        ›
                      </Link>
                    )}

                    {currentPage < totalPages && (
                      <Link
                        href={`?page=${totalPages}`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white/90 backdrop-blur-sm text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
                      >
                        »
                      </Link>
                    )}
                  </nav>
                )}
              </section>
            </div>
          </>
        )}
      </main>

      <HomeFooter />
    </div>
  );
}
