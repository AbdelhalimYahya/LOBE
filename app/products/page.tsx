"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HomeFooter, MainNavbar } from "@/components";
import BottomNavbar from "@/components/BottomNavbar";
import { authenticatedFetch } from "@/lib/auth";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [skincare, setSkincare] = useState<SkincareProduct[]>([]);
  const [makeup, setMakeup] = useState<MakeupProduct[]>([]);
  const [haircare, setHaircare] = useState<HaircareProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      setError(null);
      try {
        const [skincareRes, makeupRes, haircareRes] = await Promise.all([
          authenticatedFetch(`${API_BASE}/v1/skincare/skincare_products/`),
          authenticatedFetch(`${API_BASE}/v1/makeup/makeup_products/`),
          authenticatedFetch(`${API_BASE}/v1/haircare/haircare_products/`),
        ]);

        if (!skincareRes.ok || !makeupRes.ok || !haircareRes.ok) {
          const errorData = await Promise.all([
            skincareRes.json().catch(() => ({})),
            makeupRes.json().catch(() => ({})),
            haircareRes.json().catch(() => ({})),
          ]);
          console.error("Product fetch errors:", errorData);
          throw new Error("فشل في تحميل المنتجات");
        }

        const skincareData = await skincareRes.json();
        const makeupData = await makeupRes.json();
        const haircareData = await haircareRes.json();

        setSkincare(extractList<SkincareProduct>(skincareData));
        setMakeup(extractList<MakeupProduct>(makeupData));
        setHaircare(extractList<HaircareProduct>(haircareData));
      } catch (err) {
        console.error("خطأ في جلب المنتجات:", err);
        setError("فشل تحميل المنتجات. حاول مرة أخرى.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  const allProducts: AllProducts[] = useMemo(
    () => [...skincare, ...makeup, ...haircare],
    [skincare, makeup, haircare]
  );

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
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-lg animate-pulse bg-pink-300" />
                  <p className="text-natural-helper-text">جاري تحميل المنتجات...</p>
                </div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-natural-helper-text">لا توجد منتجات تطابق البحث</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {paginatedProducts.map((product) => {
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
