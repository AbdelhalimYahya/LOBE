// app/categories/makeup/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HomeFooter, MainNavbar, PageHeader } from "@/components";
import { authenticatedFetch } from "@/lib/auth";

export const dynamic = "force-dynamic";

type MakeupProduct = {
  makeup_id: number;
  name: string;
  image_url: string | null;
  skin_type: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  brand_name: string | null;
};

type BrandOption = {
  label: string;
  value: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages - 1) pages.push("dots");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export default function MakeupCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <MakeupCategoryPageContent />
    </Suspense>
  );
}

function MakeupCategoryPageContent() {
  const router = useRouter();

  // URL Params State (Source of Truth)
  const [pageParam, setPageParam] = useState<string | null>(null);
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  // Local UI State
  const [searchInput, setSearchInput] = useState("");
  const [minRating, setMinRating] = useState<string>("all");

  // Data State
  const [products, setProducts] = useState<MakeupProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverTotalPages, setServerTotalPages] = useState<number>(1);
  const [brandsList, setBrandsList] = useState<BrandOption[]>([]);
  const [hiddenProducts, setHiddenProducts] = useState<Set<string>>(new Set());

  // 1. Read URL on mount & popstate
  useEffect(() => {
    const read = () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const page = params.get("page");
        setPageParam(page);

        const brand = params.get("brand") || "all";
        setSelectedBrand(brand);

        const search = params.get("search") || "";
        setActiveSearchQuery(search);
        setSearchInput(search); // Sync input
      } catch {
        setPageParam(null);
        setSelectedBrand("all");
        setActiveSearchQuery("");
        setSearchInput("");
      }
    };

    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  // 2. Fetch Brands
  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await authenticatedFetch(`${API_BASE_URL}/v1/makeup/select_brands/`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.results)) {
            setBrandsList(data.results);
          }
        }
      } catch (err) {
        console.error("Failed to fetch brands", err);
      }
    }
    fetchBrands();
  }, []);

  // 3. Fetch Products
  useEffect(() => {
    let isActive = true;

    async function fetchProducts() {
      setLoading(true);
      try {
        const page = Number(pageParam || "1");
        const size = 12;

        let url = `${API_BASE_URL}/v1/makeup/makeup_products/?page=${page}&size=${size}`;
        if (selectedBrand !== "all") {
          url += `&brand=${selectedBrand}`;
        }
        if (activeSearchQuery.trim()) {
          url += `&search=${encodeURIComponent(activeSearchQuery.trim())}`;
        }

        const res = await authenticatedFetch(url);
        if (!isActive) return;

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        if (!isActive) return;

        if (data && Array.isArray(data.results)) {
          setProducts(data.results);

          if (data.count) {
            setServerTotalPages(Math.ceil(data.count / size));
          } else if (data.max_pages) {
            setServerTotalPages(data.max_pages);
          }
        }
      } catch (err) {
        if (!isActive) return;
        console.error("Error fetching makeup products:", err);
        setProducts([]);
      } finally {
        if (isActive) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, [pageParam, selectedBrand, activeSearchQuery]);

  const currentPage = Number(pageParam || "1");

  const buildUrl = (newPage: string | number, newBrand?: string, newSearch?: string) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));

    // Check brand
    const brandVal = newBrand !== undefined ? newBrand : selectedBrand;
    if (brandVal !== "all") params.set("brand", brandVal);

    // Check search
    const searchVal = newSearch !== undefined ? newSearch : searchInput;
    if (searchVal.trim()) params.set("search", searchVal.trim());

    return `?${params.toString()}`;
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPageParam("1");
      setActiveSearchQuery(searchInput);
      router.push(buildUrl(1, undefined, searchInput));
    }
  };

  const handleSearchClick = () => {
    setPageParam("1");
    setActiveSearchQuery(searchInput);
    router.push(buildUrl(1, undefined, searchInput));
  };


  const handleResetFilters = () => {
    setSelectedBrand("all");
    setMinRating("all");
    setSearchInput("");
    setActiveSearchQuery("");
    setPageParam("1");
    router.push("?page=1");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff7fb] via-[#ffffff] to-[#ffeef5]"
      dir="rtl"
    >
      <MainNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
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

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar Filters - ALWAYS RENDERED */}
          <aside className="w-full md:w-64 md:sticky md:top-28 z-10">
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
              </div>

              <div className="flex flex-col gap-2.5">
                {/* Search Filter */}
                <div className="flex flex-col gap-1 text-right">
                  <label className="text-[11px] text-slate-500">
                    بحث
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleSearchKey}
                      placeholder="ابحث عن منتج..."
                      className="w-full rounded-2xl border border-pink-100 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                    />
                    <button
                      onClick={handleSearchClick}
                      className="bg-brand-primary text-white rounded-xl px-2 text-xs hover:bg-pink-600 transition"
                    >
                      🔍
                    </button>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="flex flex-col gap-1 text-right">
                  <label className="text-[11px] text-slate-500">
                    الماركة
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      const newBrand = e.target.value;
                      setSelectedBrand(newBrand);
                      setPageParam("1");
                      router.push(buildUrl(1, newBrand, activeSearchQuery));
                    }}
                    className="w-full rounded-2xl border border-pink-100 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-right outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                  >
                    <option value="all">الكل</option>
                    {brandsList.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter (Disabled) */}
                <div className="flex flex-col gap-1 text-right opacity-50 cursor-not-allowed">
                  <label className="text-[11px] text-slate-500">
                    أقل تقييم (غير متاح حالياً)
                  </label>
                  <select
                    value={minRating}
                    disabled
                    className="w-full rounded-2xl border border-pink-100 bg-white/90 px-3 py-1.5 text-[11px] md:text-xs text-right outline-none bg-gray-100 cursor-not-allowed"
                  >
                    <option value="all">بدون فلتر</option>
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

          {/* Products Grid */}
          <section className="flex-1 flex flex-col gap-6 min-h-[500px]">
            {loading ? (
              <div className="flex items-center justify-center py-16 h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-400 to-fuchsia-400 animate-pulse shadow-[0_20px_40px_rgba(244,114,182,0.35)]" />
                    <div className="absolute inset-0 rounded-2xl border border-white/40 backdrop-blur-sm" />
                  </div>
                  <p className="text-center text-muted-foreground text-sm md:text-base">
                    جاري تحميل منتجات المكياج...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">
                    لا توجد منتجات مطابقة للفلاتر الحالية.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {products.map((product) => {
                      if (hiddenProducts.has(String(product.makeup_id))) return null;

                      return (
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
                                onError={() => {
                                  setHiddenProducts(prev => {
                                    const next = new Set(prev);
                                    next.add(String(product.makeup_id));
                                    return next;
                                  });
                                }}
                                className="relative z-10 max-h-full max-w-full object-contain transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.08] group-hover:-translate-y-1 group-hover:rotate-[1.5deg]"
                              />
                            ) : (
                              <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground w-full h-full">
                                <span>الصورة غير متوفرة</span>
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
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {serverTotalPages > 1 && (
                  <nav className="mt-2 flex justify-center items-center gap-2 text-sm md:text-base">
                    {generatePageNumbers(currentPage, serverTotalPages).map(
                      (item, idx) => {
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
                            href={buildUrl(page, selectedBrand, activeSearchQuery)}
                            onClick={() => setPageParam(String(page))}
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
                      }
                    )}
                  </nav>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}
