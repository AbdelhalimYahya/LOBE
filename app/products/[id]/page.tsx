"use client";

import { Suspense, useCallback, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { MainNavbar } from "@/components";
import Link from "next/link";
import { sephoraLogo, amazonLogo, niceoneLogo } from "@/assets";
import BottomNavbar from "@/components/BottomNavbar";
import { ChevronRight } from "lucide-react";
import { authenticatedFetch } from "@/lib/auth";

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ========= أنواع الداتا من الـ API =========

type AffiliateLink = {
  store: string; // normalized store name: amazon/sephora/niceone/...
  marketplace: string | null;
  url: string;
};

type IngredientApi = {
  ingredient_id?: number;
  id?: number;
  name: string;
  risk_score: number | string | null;
  safety_category: string | null;
  description: string | null;
};

type SkincareProductApi = {
  skincare_id: number;
  name: string;
  image_url: string | null;
  skin_type: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  brand_name: string | null;
  affiliate_links?: unknown; // نخليها unknown عشان نطبّعها
  ingredients?: IngredientApi[];
};

type MakeupProductApi = {
  makeup_id: number;
  name: string;
  image_url: string | null;
  skin_type: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  brand_name: string | null;
  affiliate_links?: unknown;
  ingredients?: IngredientApi[];
};

type HairProductApi = {
  haircare_id?: number;
  hair_id?: number;
  name: string;
  image_url: string | null;
  hair_type?: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  brand_name: string | null;
  affiliate_links?: unknown;
  ingredients?: IngredientApi[];
};

// نوع موحّد للواجهة
type UnifiedProduct = {
  id: number;
  category: "skincare" | "makeup" | "hair";
  name: string;
  brand_name: string | null;
  image_url: string | null;
  skin_type: string | null;
  avg_rating: number | null;
  reviews_count: number | null;
  affiliate_links: AffiliateLink[];
};

interface Ingredient {
  id: number;
  name: string;
  safetyScore: number | null;
  description?: string | null;
}

interface Retailer {
  id: string;
  name: string;
  nameAr: string;
  logo: StaticImageData;
  subtitle?: string;
  affiliateUrl?: string | null;
}

type PageProps = {
  params: Promise<{ id: string }>;
};

// ======== Helpers: تطبيع روابط الأفلييت ========

const safeLower = (v: unknown) =>
  String(v ?? "")
    .trim()
    .toLowerCase();

const normalizeStoreName = (raw: unknown): string => {
  const s = safeLower(raw);

  // Aliases شائعة
  if (s.includes("amazon") || s === "amz") return "amazon";
  if (s.includes("sephora")) return "sephora";
  if (s.includes("nice") || s.includes("niceone") || s.includes("nice one"))
    return "niceone";

  // إذا ما عرفناه نخليه مثل ما هو
  return s || "unknown";
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object";

const normalizeAffiliateLinks = (raw: unknown): AffiliateLink[] => {
  // نتوقع raw يكون Array، ولو مو Array نخليه []
  const arr: unknown[] = Array.isArray(raw) ? raw : [];

  const mapped = arr
    .map((x) => {
      // Handle simple string URLs
      if (typeof x === "string") {
        let url = x.trim();
        if (!url) return null;
        if (!/^https?:\/\//i.test(url)) {
          url = "https://" + url;
        }
        return {
          store: "unknown",
          marketplace: null,
          url,
        } as AffiliateLink;
      }

      if (!isRecord(x)) return null;

      // بعض الباكند يرجع: {store, marketplace, url}
      // وبعضه يرجع: {tag, marketplace, affiliate_url}
      const storeRaw =
        x["store"] ?? x["tag"] ?? x["name"] ?? x["provider"] ?? null;
      const urlRaw =
        x["url"] ?? x["affiliate_url"] ?? x["affiliateUrl"] ?? x["link"] ?? null;

      const store = normalizeStoreName(storeRaw);
      let url = typeof urlRaw === "string" ? urlRaw.trim() : "";

      if (!url) return null;

      // Ensure protocol
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      const marketplaceRaw = x["marketplace"] ?? x["mp"] ?? null;

      return {
        store,
        marketplace: typeof marketplaceRaw === "string" ? marketplaceRaw : null,
        url,
      } as AffiliateLink;
    })
    .filter(Boolean) as AffiliateLink[];

  // إزالة التكرارات (نفس url)
  const seen = new Set<string>();
  const unique: AffiliateLink[] = [];
  for (const l of mapped) {
    if (!seen.has(l.url)) {
      seen.add(l.url);
      unique.push(l);
    }
  }
  return unique;
};

const toNumberOrNull = (v: unknown): number | null => {
  if (v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : Number(String(v));
  return Number.isFinite(n) ? n : null;
};

// ======== حساب درجة الأمان الكلية (قريبة من EWG 1–10) ========

const computeOverallSafetyScore = (ingredients: Ingredient[]): number | null => {
  const scores = ingredients
    .map((ing) => ing.safetyScore)
    .filter((s): s is number => s !== null && !Number.isNaN(s));

  if (scores.length === 0) return null;

  const base = Math.max(...scores);
  const highCount = scores.filter((s) => s >= 8).length;
  const mediumCount = scores.filter((s) => s >= 4 && s <= 7).length;

  const penalty =
    0.5 * Math.max(0, highCount - 1) + 0.25 * Math.max(0, mediumCount - 2);

  let finalScore = base + penalty;
  if (finalScore < 1) finalScore = 1;
  if (finalScore > 10) finalScore = 10;

  return Number(finalScore.toFixed(1));
};

// ألوان الدائرة (مكوّن أو منتج) – مقياس 1–10
const getSafetyScoreColor = (score: number | null): string => {
  if (score === null) return "#CCCCCC";
  if (score >= 8) return "#F10101";
  if (score >= 4) return "#FFBF13";
  return "#22B07D";
};

const getSafetyLabel = (score: number | null): string => {
  if (score === null) return "غير متوفر";
  if (score >= 8) return "خطر";
  if (score >= 4) return "متوسط";
  return "آمن";
};

export default function ProductDetailsPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProductDetailsPageContent {...props} />
    </Suspense>
  );
}

function ProductDetailsPageContent({ params }: PageProps) {
  const router = useRouter();
  const [preferredCategory, setPreferredCategory] = useState<
    | "skincare"
    | "makeup"
    | "hair"
    | null
  >(null);

  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);

  useEffect(() => {
    const read = () => {
      try {
        const cat = new URLSearchParams(window.location.search).get("category");
        if (cat === "skincare" || cat === "makeup" || cat === "hair") {
          setPreferredCategory(cat);
          return;
        }
        setPreferredCategory(null);
      } catch {
        setPreferredCategory(null);
      }
    };

    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const [product, setProduct] = useState<UnifiedProduct | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedIngredients, setExpandedIngredients] = useState<Set<number>>(
    new Set()
  );

  const handleBack = () => router.back();

  const toggleIngredient = (ingredientId: number) => {
    setExpandedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(ingredientId)) next.delete(ingredientId);
      else next.add(ingredientId);
      return next;
    });
  };

  // ========= دالة واحدة تجيب المنتج من كاتيجوري معيّنة =========

  const fetchFromCategory = useCallback(async (
    category: "skincare" | "makeup" | "hair"
  ): Promise<{ product: UnifiedProduct; ingredients: Ingredient[] } | null> => {
    const pathSegment = category === "hair" ? "haircare" : category;

    const res = await authenticatedFetch(
      `${API_BASE_URL}/v1/${pathSegment}/${pathSegment}_products/${productId}/`
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`خطأ في جلب بيانات ${category}: ${res.status}`);

    const data: unknown = await res.json();
    const dataObj = isRecord(data) ? data : {};

    let extraLinks: unknown[] = [];
    // Fetch dedicated affiliate links for all categories dynamically
    if (true) {
      try {
        console.log(`Fetching affiliate links for ID: ${productId} [${category}]`);
        const affRes = await authenticatedFetch(
          `${API_BASE_URL}/v1/${pathSegment}/product_affiliate_links/${productId}/`
        );
        console.log(`Affiliate ID: ${productId} Status: ${affRes.status}`);

        if (affRes.ok) {
          // Check content type or text first to avoid JSON parse error on empty body
          const text = await affRes.text();
          console.log("Affiliate Raw Response:", text);

          if (text && text.trim().length > 0) {
            const affData = JSON.parse(text);
            console.log("Affiliate Parsed JSON:", affData);

            if (Array.isArray(affData)) {
              extraLinks = affData;
            } else if (isRecord(affData) && Array.isArray(affData.results)) {
              extraLinks = affData.results as unknown[];
            } else if (isRecord(affData)) {
              // Fallback if it returns a single object? Unlikely but safe to wrap
              extraLinks = [affData];
            }
          } else {
            console.warn("Affiliate response body is empty.");
          }
        } else {
          console.warn("Affiliate fetch failed:", affRes.statusText);
        }
      } catch (err) {
        console.error("Error fetching separate affiliate links:", err);
      }
    }

    console.log("Final Extra Links:", extraLinks);

    const rawLinks =
      dataObj["affiliate_links"] ??
      dataObj["affiliateLinks"] ??
      dataObj["links"] ??
      [];

    // Merge both sources
    const combinedRaw = [
      ...(Array.isArray(rawLinks) ? rawLinks : []),
      ...extraLinks,
    ];

    const affiliateLinks = normalizeAffiliateLinks(combinedRaw);

    if (category === "skincare") {
      const d = data as SkincareProductApi;
      const unified: UnifiedProduct = {
        id: d.skincare_id,
        category,
        name: d.name,
        brand_name: d.brand_name,
        image_url: d.image_url,
        skin_type: d.skin_type,
        avg_rating: d.avg_rating,
        reviews_count: d.reviews_count,
        affiliate_links: affiliateLinks,
      };

      const mappedIngredients: Ingredient[] = (d.ingredients ?? []).map(
        (ing) => ({
          id: ing.ingredient_id ?? ing.id ?? Math.floor(Math.random() * 1e12),
          name: ing.name,
          safetyScore: toNumberOrNull(ing.risk_score),
          description: ing.description,
        })
      );

      return { product: unified, ingredients: mappedIngredients };
    }

    if (category === "makeup") {
      const d = data as MakeupProductApi;
      const unified: UnifiedProduct = {
        id: d.makeup_id,
        category,
        name: d.name,
        brand_name: d.brand_name,
        image_url: d.image_url,
        skin_type: d.skin_type,
        avg_rating: d.avg_rating,
        reviews_count: d.reviews_count,
        affiliate_links: affiliateLinks,
      };

      const mappedIngredients: Ingredient[] = (d.ingredients ?? []).map(
        (ing) => ({
          id: ing.ingredient_id ?? ing.id ?? Math.floor(Math.random() * 1e12),
          name: ing.name,
          safetyScore: toNumberOrNull(ing.risk_score),
          description: ing.description,
        })
      );

      return { product: unified, ingredients: mappedIngredients };
    }

    // hair
    const d = data as HairProductApi;
    const unified: UnifiedProduct = {
      id: d.haircare_id ?? d.hair_id ?? productId,
      category,
      name: d.name,
      brand_name: d.brand_name,
      image_url: d.image_url,
      skin_type: d.hair_type ?? null,
      avg_rating: d.avg_rating,
      reviews_count: d.reviews_count,
      affiliate_links: affiliateLinks,
    };

    const mappedIngredients: Ingredient[] = (d.ingredients ?? []).map((ing) => ({
      id: ing.ingredient_id ?? ing.id ?? Math.floor(Math.random() * 1e12),
      name: ing.name,
      safetyScore: toNumberOrNull(ing.risk_score),
      description: ing.description,
    }));

    return { product: unified, ingredients: mappedIngredients };
  }, [productId]);

  // ========= جلب المنتج =========

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (Number.isNaN(productId)) {
          setError("رقم المنتج غير صالح.");
          setLoading(false);
          return;
        }

        if (!preferredCategory) {
          setError("لا يمكن تحديد فئة المنتج (category مفقودة في الرابط).");
          setProduct(null);
          setIngredients([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const result = await fetchFromCategory(preferredCategory);

        if (!result) {
          setError("هذا المنتج غير موجود في هذه الفئة.");
          setProduct(null);
          setIngredients([]);
          return;
        }

        const foundProduct = result.product;
        const foundIngredients = result.ingredients;

        setProduct(foundProduct);
        setIngredients(foundIngredients);

        // حالة المفضلة
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("favoriteProducts");
          if (stored) {
            try {
              const favorites: Array<{ id: number; category: string }> =
                JSON.parse(stored);
              setIsFavorite(
                favorites.some(
                  (p) =>
                    p.id === foundProduct.id && p.category === foundProduct.category
                )
              );
            } catch {
              setIsFavorite(false);
            }
          } else {
            setIsFavorite(false);
          }
        }
      } catch (err: unknown) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "حدث خطأ أثناء تحميل بيانات المنتج."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, preferredCategory, fetchFromCategory]);

  // ========= مفضلة =========

  const handleToggleFavorite = () => {
    if (!product) return;

    setIsFavorite((prev) => {
      const newValue = !prev;

      if (typeof window !== "undefined") {
        const storedFavorites = localStorage.getItem("favoriteProducts");
        let favoriteProductsData: Array<{
          id: number;
          category: string;
          name: string;
          brand_name: string | null;
        }> = [];

        if (storedFavorites) {
          try {
            favoriteProductsData = JSON.parse(storedFavorites);
          } catch {
            favoriteProductsData = [];
          }
        }

        if (newValue) {
          if (
            !favoriteProductsData.some(
              (p) => p.id === product.id && p.category === product.category
            )
          ) {
            favoriteProductsData.push({
              id: product.id,
              category: product.category,
              name: product.name,
              brand_name: product.brand_name,
            });
          }
        } else {
          favoriteProductsData = favoriteProductsData.filter(
            (p) => !(p.id === product.id && p.category === product.category)
          );
        }

        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProductsData));
        window.dispatchEvent(new Event("favoritesUpdated"));
      }

      return newValue;
    });
  };

  // ✅ درجة الأمان النهائية من المكوّنات
  const safetyScore: number | null = computeOverallSafetyScore(ingredients);

  // ========= المتاجر من affiliate_links =========

  const findAffiliateUrl = (storeWanted: "amazon" | "sephora" | "niceone") => {
    if (!product) return null;

    const wanted = storeWanted;

    // يدعم alias + يحتوي
    const aliases: Record<string, string[]> = {
      amazon: ["amazon", "amz"],
      sephora: ["sephora"],
      niceone: ["niceone", "nice one", "niceonesa", "niceonesa.com"],
    };

    const list = aliases[wanted] ?? [wanted];

    const found = product.affiliate_links.find((l) => {
      const s = safeLower(l.store);
      return list.some((a) => s === a || s.includes(a));
    });

    return found?.url ?? null;
  };

  const retailers: Retailer[] = product
    ? [
      {
        id: "1",
        name: "Sephora",
        nameAr: "سيفورا",
        logo: sephoraLogo,
        subtitle: findAffiliateUrl("sephora") ? "sephora.com" : "غير متوفر",
        affiliateUrl: findAffiliateUrl("sephora"),
      },
      {
        id: "2",
        name: "Amazon",
        nameAr: "أمازون",
        logo: amazonLogo,
        subtitle: findAffiliateUrl("amazon") ? "amazon.sa" : "غير متوفر",
        affiliateUrl: findAffiliateUrl("amazon"),
      },
      {
        id: "3",
        name: "Nice One",
        nameAr: "نايس ون",
        logo: niceoneLogo,
        subtitle: findAffiliateUrl("niceone") ? "niceonesa.com" : "غير متوفر",
        affiliateUrl: findAffiliateUrl("niceone"),
      },
    ]
    : [];

  // ========= UI =========

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-natural-white" dir="rtl">
      {/* هيدر الموبايل */}
      <header className="flex md:hidden w-full items-center justify-center px-4 sm:px-6 pt-8 pb-0 flex-shrink-0">
        <div className="w-full max-w-[358px] relative flex items-center justify-center h-16">
          <h1 className="text-xl font-medium text-natural-primary-text">تفاصيل المنتج</h1>
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-0 flex h-fit w-fit items-center justify-center text-brand-primary opacity-90 hover:opacity-100 transition-all"
            aria-label="العودة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* نافبار الديسكتوب */}
      <MainNavbar isLoggedIn={true} />

      {/* المحتوى */}
      <main className="flex flex-1 flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pt-8 md:pt-8 pb-24 md:pb-8 overflow-y-auto scrollbar-right">
        <div className="w-full md:max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-muted-foreground">جاري تحميل بيانات المنتج...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : !product ? (
            <p className="text-center text-muted-foreground">لم يتم العثور على هذا المنتج.</p>
          ) : (
            <div className="flex flex-col gap-8">
              {/* صورة المنتج */}
              <div
                className="relative w-full md:max-w-2xl lg:max-w-3xl mx-auto h-[358px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-3xl p-[1px]"
                style={{
                  background:
                    "linear-gradient(102.46deg, rgba(190, 92, 144, 0.45) -30.33%, rgba(249, 206, 185, 0.9) 0.3%, rgba(225, 141, 187, 0.9) 45.57%, rgba(159, 215, 234, 0.9) 91.77%)",
                }}
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-2xl md:rounded-3xl p-6 md:p-10"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">لا توجد صورة متاحة لهذا المنتج</span>
                )}

                {/* قلب المفضلة */}
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white backdrop-blur-[4px] md:backdrop-blur-[6px] shadow-[0px_2px_4px_0px_rgba(162,162,162,0.15)] md:shadow-[0px_4px_8px_0px_rgba(162,162,162,0.2)] flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2 z-10"
                  aria-label={
                    isFavorite ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} إلى المفضلة`
                  }
                >
                  {isFavorite ? (
                    <svg width="24" height="24" className="md:w-6 md:h-6 lg:w-7 lg:h-7" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3313 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9738 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5Z"
                        fill="#CC68A1"
                      />
                    </svg>
                  ) : (
                    <svg width="24" height="24" className="md:w-6 md:h-6 lg:w-7 lg:h-7" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3313 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9738 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5Z"
                        stroke="#CC68A1"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* كرت معلومات المنتج + الدائرة الكبيرة */}
              <div
                className="relative w-full md:max-w-full rounded-2xl overflow-hidden p-[1px]"
                style={{
                  background:
                    "linear-gradient(102.46deg, rgba(190, 92, 144, 0.45) -30.33%, rgba(249, 206, 185, 0.9) 0.3%, rgba(225, 141, 187, 0.9) 45.57%, rgba(159, 215, 234, 0.9) 91.77%)",
                }}
              >
                <div className="w-full h-full rounded-2xl bg-natural-white">
                  <div className="p-4 md:p-6 flex md:flex-row justify-between gap-5 md:gap-6">
                    <div className="flex-1 flex flex-col gap-1 text-right">
                      <p className="text-natural-primary-text text-base md:text-lg font-semibold">
                        {product.brand_name ?? "شركة المنتج"}
                      </p>
                      <p className="text-[#555555] font-normal text-sm md:text-base">{product.name}</p>
                      <p className="text-[#A2A2A2] text-xs md:text-sm font-normal">
                        الفئة:{" "}
                        {product.category === "skincare"
                          ? "العناية بالبشرة"
                          : product.category === "makeup"
                            ? "المكياج"
                            : "العناية بالشعر"}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
                        style={{ backgroundColor: getSafetyScoreColor(safetyScore) }}
                      >
                        <span className="text-white text-lg md:text-xl font-medium">{safetyScore ?? 0}</span>
                      </div>
                      <p className="text-sm md:text-base font-medium" style={{ color: getSafetyScoreColor(safetyScore) }}>
                        {getSafetyLabel(safetyScore)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* المكونات */}
              <div
                className="relative w-full md:max-w-full rounded-2xl overflow-hidden p-[1px]"
                style={{
                  background:
                    "linear-gradient(102.46deg, rgba(190, 92, 144, 0.45) -30.33%, rgba(249, 206, 185, 0.9) 0.3%, rgba(225, 141, 187, 0.9) 45.57%, rgba(159, 215, 234, 0.9) 91.77%)",
                }}
              >
                <div className="w-full h-full rounded-2xl bg-natural-white">
                  <div className="p-4 flex flex-col gap-5">
                    <h2 className="text-right text-[#2A2A2A] text-xl font-semibold">المكونات</h2>

                    {ingredients.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-right">
                        لا توجد بيانات مكوّنات مسجلة لهذا المنتج حالياً.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {ingredients.map((ingredient) => {
                          const isExpanded = expandedIngredients.has(ingredient.id);
                          return (
                            <div key={ingredient.id} className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
                              <button
                                type="button"
                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
                                onClick={() => toggleIngredient(ingredient.id)}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="rounded-full w-6 h-6 flex items-center justify-center"
                                    style={{ backgroundColor: getSafetyScoreColor(ingredient.safetyScore) }}
                                  >
                                    <span className="text-white text-xs font-medium">{ingredient.safetyScore ?? "-"}</span>
                                  </div>
                                  <span className="text-sm text-[#2A2A2A]">{ingredient.name}</span>
                                </div>
                                <span
                                  className={`text-xs text-[#C2C2C2] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                >
                                  ▼
                                </span>
                              </button>
                              {ingredient.description && (
                                <div
                                  className={`px-3 pb-3 text-xs text-[#555555] text-right transition-all ${isExpanded ? "max-h-40 mt-1" : "max-h-0 overflow-hidden"
                                    }`}
                                >
                                  {ingredient.description}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* زر متوفر لدى */}
              <button
                type="button"
                onClick={() => {
                  const links = product?.affiliate_links || [];
                  // Prefer retailers but fallback to any link
                  const retailerLink = retailers.find(r => r.affiliateUrl)?.affiliateUrl;
                  const anyLink = links.length > 0 ? links[0].url : null;

                  const targetLink = retailerLink || anyLink;

                  if (targetLink) {
                    window.open(targetLink, "_blank", "noopener,noreferrer");
                  } else {
                    router.push("/coming-soon");
                  }
                }}
                className="w-full rounded-3xl text-white font-medium flex items-center justify-center transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(102deg, rgba(190, 92, 144, 0.5) 0%, rgba(249, 206, 185, 1) 25%, rgba(225, 141, 187, 1) 62%, rgba(159, 215, 234, 1) 99%, rgba(181, 128, 171, 1) 100%)",
                  fontSize: "16px",
                  lineHeight: "24px",
                  padding: "12px 16px",
                }}
              >
                متوفر للشراء لدى ✨
              </button>

              {/* المتاجر */}
              <div
                className="relative w-full md:max-w-full rounded-2xl p-[1px]"
                style={{
                  background:
                    "linear-gradient(102deg, rgba(190, 92, 144, 0.5) 0%, rgba(249, 206, 185, 1) 25%, rgba(225, 141, 187, 1) 62%, rgba(159, 215, 234, 1) 99%, rgba(181, 128, 171, 1) 100%)",
                }}
              >
                <div className="bg-white rounded-[15px] px-4 py-6 flex flex-col">
                  <div className="flex flex-col gap-2">
                    {retailers.map((retailer) => {
                      const clickable = !!retailer.affiliateUrl;

                      const content = (
                        <>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Image
                              src={retailer.logo}
                              alt={retailer.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col gap-1 flex-1 text-right">
                            <span className="font-medium text-[16px] leading-[18px] text-[#2A2A2A]">
                              {retailer.nameAr}
                            </span>
                            <span className="text-[12px] text-[#A2A2A2]">{retailer.subtitle}</span>
                          </div>

                          {clickable && (
                            <span className="text-[12px] text-[#CC68A1] whitespace-nowrap">شراء الآن ↗</span>
                          )}
                        </>
                      );

                      return (
                        <Link
                          key={retailer.id}
                          href={retailer.affiliateUrl || "/coming-soon"}
                          target={retailer.affiliateUrl ? "_blank" : undefined}
                          rel={retailer.affiliateUrl ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 p-2 bg-white rounded-lg border-b border-[#E5E5E5] hover:bg-[#FFF5FB] transition-colors cursor-pointer"
                        >
                          {content}
                        </Link>
                      );
                    })}

                    {/* ✅ لو الروابط جاية بس مو ضمن الثلاثة متاجر، نعرضها هنا */}
                    {product.affiliate_links.length > 0 && (
                      <div className="mt-3 border-t border-[#F2F2F2] pt-3">
                        <p className="text-xs text-[#A2A2A2] text-right mb-2">
                          روابط إضافية (لو ما طابقت أمازون/سيفورا/نايس ون):
                        </p>
                        <div className="flex flex-col gap-2">
                          {product.affiliate_links.map((l, idx) => (
                            <a
                              key={`${l.url}-${idx}`}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#CC68A1] underline text-right break-all"
                            >
                              {l.store} {l.marketplace ? `(${l.marketplace})` : ""} — {l.url}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* كيف يتم التقييم؟ */}
              <div className="relative w-full md:max-w-full rounded-2xl overflow-hidden bg-natural-white border border-[#E5E5E5]">
                <div className="flex flex-col gap-2 p-4">
                  <Link
                    href="/rating-system"
                    className="text-base md:text-lg font-medium"
                    style={{
                      background: "linear-gradient(274deg, #F9CEB9 -13.54%, #CC68A1 98.24%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    كيف يتم التقييم؟
                  </Link>
                  <p className="text-[#555555] text-sm md:text-base">تعرّف أكثر على كيفية تقييم المنتجات</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
}
