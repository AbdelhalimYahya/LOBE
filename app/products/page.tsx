"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HomeFooter, MainNavbar } from "@/components";
import BottomNavbar from "@/components/BottomNavbar";
import { authenticatedFetch } from "@/lib/auth";

export const dynamic = "force-dynamic";

type SkincareProduct = {
  skincare_id: number;
  name: string;
  brand_name: string | null;
  image_url: string | null;
  safety_score: number | null;
};

type MakeupProduct = {
  makeup_id: number;
  name: string;
  brand_name: string | null;
  image_url: string | null;
  safety_score: number | null;
};

type HaircareProduct = {
  haircare_id: number;
  name: string;
  brand_name: string | null;
  image_url: string | null;
  safety_score: number | null;
};

type AllProducts = SkincareProduct | MakeupProduct | HaircareProduct;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

type PaginatedPayload<T> = {
  results: T[];
  next: string | null;
  previous?: string | null;
  count?: number;
  max_pages?: number;
};

function extractList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];

  if (
    payload &&
    typeof payload === "object" &&
    "results" in payload &&
    Array.isArray((payload as Record<string, unknown>).results)
  ) {
    return ((payload as Record<string, unknown>).results as T[]);
  }

  return [];
}

function extractPaginated<T>(payload: unknown): PaginatedPayload<T> | null {
  if (!payload || typeof payload !== "object") return null;

  const obj = payload as Record<string, unknown>;
  if (!Array.isArray(obj.results)) return null;

  const next =
    typeof obj.next === "string" ? obj.next : obj.next === null ? null : null;

  return {
    results: obj.results as T[],
    next,
    previous:
      typeof obj.previous === "string"
        ? obj.previous
        : obj.previous === null
        ? null
        : undefined,
    count: typeof obj.count === "number" ? obj.count : undefined,
    max_pages: typeof obj.max_pages === "number" ? obj.max_pages : undefined,
  };
}

async function fetchPaginatedOnce<T>(
  url: string
): Promise<{ items: T[]; next: string | null; count?: number; maxPages?: number }> {
  const res = await authenticatedFetch(url);
  if (!res.ok) {
    if (res.status === 400 || res.status === 404) {
      const data = await res.json().catch(() => null);
      console.warn("Pagination invalid page:", url, data);
      return { items: [], next: null };
    }

    const data = await res.json().catch(() => null);
    console.error("Pagination fetch failed:", url, data);
    throw new Error("فشل في تحميل المنتجات");
  }

  const data = (await res.json().catch(() => null)) as unknown;
  const paginated = extractPaginated<T>(data);

  if (paginated) {
    return {
      items: paginated.results,
      next: paginated.next,
      count: paginated.count,
      maxPages: paginated.max_pages,
    };
  }

  return { items: extractList<T>(data), next: null };
}

function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | "dots")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages: (number | "dots")[] = [1];
  const start = Math.max(2, currentPage - 2);
  const end = Math.min(totalPages - 1, currentPage + 2);

  if (start > 2) pages.push("dots");
  pages.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i));
  if (end < totalPages - 1) pages.push("dots");
  pages.push(totalPages);

  return pages;
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const router = useRouter();

  const [pageParam, setPageParam] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return new URLSearchParams(window.location.search).get("page");
    } catch {
      return null;
    }
  });

  const [skincare, setSkincare] = useState<SkincareProduct[]>([]);
  const [makeup, setMakeup] = useState<MakeupProduct[]>([]);
  const [haircare, setHaircare] = useState<HaircareProduct[]>([]);

  const [serverTotalPages, setServerTotalPages] = useState<number>(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  useEffect(() => {
    let cancelled = false;
    const shouldAbort = () => cancelled;

    const fetchMeta = async () => {
      try {
        const backendPageSize = 12;
        const skincareMetaUrl = `${API_BASE}/v1/skincare/skincare_products/?page=1&size=${backendPageSize}`;
        const makeupMetaUrl = `${API_BASE}/v1/makeup/makeup_products/?page=1&size=${backendPageSize}`;
        const haircareMetaUrl = `${API_BASE}/v1/haircare/haircare_products/?page=1&size=${backendPageSize}`;

        const [skincareMeta, makeupMeta, haircareMeta] = await Promise.all([
          fetchPaginatedOnce<SkincareProduct>(skincareMetaUrl),
          fetchPaginatedOnce<MakeupProduct>(makeupMetaUrl),
          fetchPaginatedOnce<HaircareProduct>(haircareMetaUrl),
        ]);

        if (shouldAbort()) return;

        const pagesFrom = (meta: {
          count?: number;
          maxPages?: number;
        }): number | null => {
          if (typeof meta.maxPages === "number" && meta.maxPages > 0) return meta.maxPages;
          if (typeof meta.count === "number") {
            return Math.max(1, Math.ceil(meta.count / backendPageSize));
          }
          return null;
        };

        const skincarePages = pagesFrom(skincareMeta);
        const makeupPages = pagesFrom(makeupMeta);
        const haircarePages = pagesFrom(haircareMeta);

        setServerTotalPages(
          Math.max(1, skincarePages ?? 1, makeupPages ?? 1, haircarePages ?? 1)
        );
      } catch (err) {
        console.error("Failed to fetch pagination meta:", err);
      }
    };

    void fetchMeta();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const read = () => {
      try {
        setPageParam(new URLSearchParams(window.location.search).get("page"));
      } catch {
        setPageParam(null);
      }
    };

    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const shouldAbort = () => cancelled;

    let pageNumberRaw = Number(pageParam || "1");
    if (!Number.isFinite(pageNumberRaw) || pageNumberRaw < 1) pageNumberRaw = 1;
    const requestedPage = pageNumberRaw;

    async function fetchAllProducts() {
      setLoading(true);
      setError(null);
      try {
        const backendPageSize = 12;
        const skincareUrl = `${API_BASE}/v1/skincare/skincare_products/?page=${requestedPage}&size=${backendPageSize}`;
        const makeupUrl = `${API_BASE}/v1/makeup/makeup_products/?page=${requestedPage}&size=${backendPageSize}`;
        const haircareUrl = `${API_BASE}/v1/haircare/haircare_products/?page=${requestedPage}&size=${backendPageSize}`;

        const [skincareFirst, makeupFirst, haircareFirst] = await Promise.all([
          fetchPaginatedOnce<SkincareProduct>(skincareUrl),
          fetchPaginatedOnce<MakeupProduct>(makeupUrl),
          fetchPaginatedOnce<HaircareProduct>(haircareUrl),
        ]);

        if (shouldAbort()) return;

        setSkincare(skincareFirst.items);
        setMakeup(makeupFirst.items);
        setHaircare(haircareFirst.items);
      } catch (err) {
        console.error("خطأ في جلب المنتجات:", err);
        if (!shouldAbort()) setError("فشل تحميل المنتجات. حاول مرة أخرى.");
      } finally {
        if (!shouldAbort()) setLoading(false);
      }
    }

    void fetchAllProducts();

    return () => {
      cancelled = true;
    };
  }, [pageParam]);

  const allProducts: AllProducts[] = useMemo(
    () => [...skincare, ...makeup, ...haircare],
    [skincare, makeup, haircare]
  );

  const isInitialLoading = loading && allProducts.length === 0;

  const brandOptions = useMemo(
    () =>
      Array.from(
        new Set(
          allProducts
            .map((p) => p.brand_name)
            .filter((b): b is string => !!b && b.trim().length > 0)
        )
      ),
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (
        searchQuery.trim() &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (selectedBrand !== "all" && product.brand_name !== selectedBrand) {
        return false;
      }

      return true;
    });
  }, [allProducts, searchQuery, selectedBrand]);

  const displayedProducts = filteredProducts;

  let pageNumberRaw = Number(pageParam || "1");
  if (!Number.isFinite(pageNumberRaw) || pageNumberRaw < 1) pageNumberRaw = 1;
  const currentPage = Math.min(pageNumberRaw, serverTotalPages);

  const totalPages = serverTotalPages;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setPageParam(null);
    router.push("/products");
  };

  const getSafetyColorClass = (score: number | null): string => {
    if (score === null) return "bg-gray-300";
    if (score <= 2) return "bg-green-500";
    if (score <= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff7fb] via-[#ffffff] to-[#ffeef5]" dir="rtl">
      <MainNavbar isLoggedIn={true} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-natural-primary-text mb-4">
            جميع المنتجات
          </h1>
          <p className="text-natural-helper-text">
            اكتشف مجموعتنا الكاملة من منتجات الجمال والعناية
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* الفلاتر */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-natural-light-border p-4 md:p-5 space-y-6 sticky top-4">
              <div>
                <label className="block text-sm font-semibold text-natural-primary-text mb-2">
                  البحث
                </label>
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPageParam(null);
                    router.push("/products");
                  }}
                  className="w-full px-3 py-2 border border-natural-light-border rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-natural-primary-text mb-2">
                  الماركة
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setPageParam(null);
                    router.push("/products");
                  }}
                  className="w-full px-3 py-2 border border-natural-light-border rounded-lg text-sm"
                >
                  <option value="all">الكل</option>
                  {brandOptions.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full px-3 py-2 rounded-lg border border-pink-200 bg-white text-pink-600 hover:bg-pink-50 text-sm font-medium transition"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          </aside>

          {/* المنتجات */}
          <section className="flex-1 flex flex-col gap-6">
            {isInitialLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-lg animate-pulse bg-pink-300" />
                  <p className="text-natural-helper-text">جاري تحميل المنتجات...</p>
                </div>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-natural-helper-text">لا توجد منتجات تطابق البحث</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {displayedProducts.map((product) => {
                    const category =
                      "skincare_id" in product
                        ? "skincare"
                        : "makeup_id" in product
                        ? "makeup"
                        : "haircare";
                    const id =
                      ("skincare_id" in product && product.skincare_id) ||
                      ("makeup_id" in product && product.makeup_id) ||
                      ("haircare_id" in product && product.haircare_id) ||
                      0;

                    return (
                      <Link
                        key={`${category}-${id}`}
                        href={`/products/${id}?category=${category}`}
                        className="group relative rounded-3xl bg-white/95 border border-pink-50 shadow-[0_18px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_25px_55px_rgba(244,114,182,0.22)] hover:-translate-y-2 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col overflow-hidden"
                      >
                        <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-[#fff9fc] via-[#fff5f9] to-[#ffe9f3] flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-contain p-3"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}

                          {product.safety_score !== null && (
                            <div
                              className={`absolute top-3 left-3 w-10 h-10 ${getSafetyColorClass(
                                product.safety_score
                              )} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            >
                              {product.safety_score}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 p-3">
                          <p className="text-xs text-natural-helper-text truncate">
                            {product.brand_name || "بدون ماركة"}
                          </p>
                          <h3 className="text-sm font-semibold text-natural-primary-text line-clamp-2 group-hover:text-brand-primary transition-colors">
                            {product.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* الباجينيشن */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {generatePageNumbers(currentPage, totalPages).map(
                      (pageNum, index) =>
                        pageNum === "dots" ? (
                          <span key={`dots-${index}`} className="text-natural-helper-text">
                            ...
                          </span>
                        ) : (
                          <Link
                            key={pageNum}
                            href={`/products?page=${pageNum}`}
                            onClick={() => setPageParam(String(pageNum))}
                            className={`px-3 py-1.5 rounded-lg transition ${
                              currentPage === pageNum
                                ? "bg-brand-primary text-white"
                                : "border border-pink-200 text-pink-600 hover:bg-pink-50"
                            }`}
                          >
                            {pageNum}
                          </Link>
                        )
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <HomeFooter />
      <BottomNavbar />
    </div>
  );
}
