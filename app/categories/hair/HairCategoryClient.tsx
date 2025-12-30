// app/categories/hair/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HomeFooter, MainNavbar, PageHeader } from "@/components";
import { authenticatedFetch } from "@/lib/auth";

type HairProduct = {
  haircare_id: number;
  name: string;
  brand_name: string | null;
  image_url: string | null;
  safety_score: number | null;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const HAIR_ENDPOINT = `${API_BASE}/v1/haircare/haircare_products/`;

async function getHairProducts(): Promise<HairProduct[]> {
  const res = await authenticatedFetch(HAIR_ENDPOINT, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch haircare products", res.status);
    return [];
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return data as HairProduct[];
  }
  if (Array.isArray((data as Record<string, unknown>).results)) {
    return (data as Record<string, unknown>).results as HairProduct[];
  }

  console.error("Unexpected haircare response:", data);
  return [];
}

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
  for (let i = left; i <= right; i) pages.push(i);
  if (right < totalPages - 1) pages.push("dots");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export default function HairCategoryClient() {
  const [products, setProducts] = useState<HairProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  // حالات الفلاتر
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [minSafety, setMinSafety] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHairProducts();

        // نخلي المنتجات اللي عندها صورة تطلع أول
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

  // خيارات الماركات من الداتا
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

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (selectedBrand !== "all" && product.brand_name !== selectedBrand) {
        return false;
      }

      if (minSafety !== "all") {
        const min = Number(minSafety);
        const score = product.safety_score ?? 0;
        if (score < min) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedBrand, minSafety]);

  // Pagination
  const pageSize = 12;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  const pageParam = searchParams.get("page");
  let pageNumberRaw = Number(pageParam || "1");
  if (!Number.isFinite(pageNumberRaw) || pageNumberRaw < 1) pageNumberRaw = 1;
  const currentPage = Math.min(pageNumberRaw, totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setMinSafety("all");
  };

  // لون دائرة الأمان
  const getSafetyColorClass = (score: number | null) => {
    if (score === null) return "bg-slate-300";
    if (score <= 2.0) return "bg-emerald-500"; // آمن
    if (score <= 3.5) return "bg-amber-400"; // متوسط
    return "bg-red-500"; // عالي
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff7fb] via-[#ffffff] to-[#ffeef5]"
      dir="rtl"
    >
      <MainNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* الهيدر الوردي نفس العناية بالبشرة */}
        <section className="mb-6 md:mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-pink-500/12 via-rose-400/6 to-fuchsia-400/14 border border-pink-100 shadow-[0_18px_45px_rgba(244,114,182,0.18)]">
            <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-pink-300/25 blur-2xl" />
            <div className="absolute -right-8 bottom-0 w-40 h-40 rounded-full bg-fuchsia-400/25 blur-2xl" />
            <div className="absolute left-1/2 -bottom-16 w-40 h-40 rounded-full bg-rose-300/20 blur-3xl" />

            <div className="relative flex flex-col gap-3 px-4 py-6 md:px-8 md:py-8">
              <PageHeader title="العناية بالشعر" />
              <p className="text-right text-muted-foreground mb-1 text-sm md:text-base max-w-2xl ml-auto">
                اكتشفي منتجات العناية بالشعر لتحسين صحة شعرك، قوته ولمعانه
                مع عرض درجة أمان كل منتج 🌸
              </p>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-400 to-fuchsia-400 animate-pulse shadow-[0_20px_40px_rgba(244,114,182,0.35)]" />
                <div className="absolute inset-0 rounded-2xl border border-white/40 backdrop-blur-sm" />
              </div>
              <p className="text-center text-muted-foreground text-sm md:text-base">
                جاري تحميل منتجات العناية بالشعر...
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            لا توجد منتجات للعناية بالشعر حالياً في قاعدة البيانات.
          </p>
        ) : totalProducts === 0 ? (
          <p className="text-center text-muted-foreground">
            لا توجد منتجات مطابقة للفلاتر الحالية.
          </p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* سايدبار الفلاتر (يمين في RTL) */}
              <aside className="w-full md:w-64 md:sticky md:top-28">
                <div className="rounded-3xl bg-white/85 backdrop-blur-md border border-pink-50 shadow-[0_16px_35px_rgba(244,114,182,0.18)] px-3.5 py-4 md:px-4 md:py-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col text-right">
                      <h2 className="text-sm font-semibold text-slate-800">
                        تصفية النتائج
                      </h2>
                      <span className="text-[11px] text-slate-400">
                        اختاري المنتجات الأنسب لشعرك ✨
                      </span>
                    </div>
                    <span className="text-[11px] md:text-xs rounded-full bg-pink-50 px-2 py-1 text-pink-600">
                      {totalProducts} / {products.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 text-right">
                    {/* بحث بالاسم */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-slate-500">
                        البحث عن منتج
                      </label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="اكتبي اسم المنتج..."
                        className="w-full rounded-2xl border border-pink-100 bg-white px-3 py-1.5 text-[11px] text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                      />
                    </div>

                    {/* الماركة */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-slate-500">
                        الماركة
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full rounded-2xl border border-pink-100 bg-white px-3 py-1.5 text-[11px] text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                      >
                        <option value="all">الكل</option>
                        {brandOptions.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* أقل درجة أمان */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-slate-500">
                        أقل درجة أمان
                      </label>
                      <select
                        value={minSafety}
                        onChange={(e) => setMinSafety(e.target.value)}
                        className="w-full rounded-2xl border border-pink-100 bg-white px-3 py-1.5 text-[11px] text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                      >
                        <option value="all">بدون فلتر</option>
                        <option value="1">1+ (آمن جداً)</option>
                        <option value="2">2+ (آمن)</option>
                        <option value="3">3+ (متوسط)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-1 inline-flex items-center justify-center gap-1 rounded-full border border-pink-200 bg-white px-3 py-1.5 text-[11px] text-pink-600 hover:bg-pink-50 hover:border-pink-300 hover:shadow-[0_10px_25px_rgba(244,114,182,0.28)] hover:-translate-y-[1px] transition-all"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                </div>
              </aside>

              {/* شبكة المنتجات */}
              <section className="flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {paginatedProducts.map((product) => {
                    const score = product.safety_score;
                    const safetyClass = getSafetyColorClass(score);

                    return (
                      <Link
                        key={product.haircare_id}
                        href={`/products/${product.haircare_id}?category=haircare`}
                        className="group rounded-3xl bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(244,114,182,0.2)] hover:-translate-y-2 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col overflow-hidden border border-pink-50"
                      >
                        <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-[#fff9fc] via-[#fff5f9] to-[#ffe9f3] flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-[1.08] group-hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground">
                              <div className="w-9 h-9 rounded-2xl border border-pink-200/70 bg-white/80 flex items-center justify-center text-[11px] shadow-[0_10px_20px_rgba(236,72,153,0.35)]">
                                💇‍♀️
                              </div>
                              <span className="px-2 text-center leading-snug">
                                الصورة غير متوفرة حالياً
                              </span>
                            </div>
                          )}

                          {/* دائرة درجة الأمان */}
                          <div
                            className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] ${safetyClass}`}
                          >
                            {score ?? "-"}
                          </div>
                        </div>

                        <div className="p-3.5 flex flex-col gap-1.5">
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
                              درجة الأمان:{" "}
                              <span className="font-medium text-slate-900">
                                {score ?? "غير محددة"}
                              </span>
                            </p>
                            <p className="text-[10px] text-slate-500">
                              كلما كانت الدرجة أقل كان المنتج أكثر أمانًا ✨
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* الباجينيشن نفس ستايل العناية بالبشرة */}
                {totalPages > 1 && (
                  <nav className="mt-2 flex justify-center items-center gap-2 text-sm md:text-base">
                    {currentPage > 1 && (
                      <Link
                        href={`?page=1`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
                      >
                        «
                      </Link>
                    )}

                    {currentPage > 1 && (
                      <Link
                        href={`?page=${currentPage - 1}`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
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
                              : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-500 hover:shadow-[0_10px_28px_rgba(148,163,184,0.35)] hover:-translate-y-[2px]",
                          ].join(" ")}
                        >
                          {page}
                        </Link>
                      );
                    })}

                    {currentPage < totalPages && (
                      <Link
                        href={`?page=${currentPage + 1}`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
                      >
                        ›
                      </Link>
                    )}

                    {currentPage < totalPages && (
                      <Link
                        href={`?page=${totalPages}`}
                        className="min-w-[36px] h-9 flex items-center justify-center rounded-full border border-pink-100 bg-white text-xs md:text-sm text-pink-500 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(244,114,182,0.45)] hover:-translate-y-[2px] transition-all"
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
