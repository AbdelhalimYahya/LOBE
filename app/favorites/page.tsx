"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MainNavbar } from "@/components";
import Link from "next/link";
import { favouriteBanner } from "@/assets";
import { ChevronRight } from "lucide-react";
import BottomNavbar from "@/components/BottomNavbar";
import { authenticatedFetch } from "@/lib/auth";

interface FavoriteProduct {
  id: number;
  category: "skincare" | "makeup" | "hair";
  name: string;
  brand_name: string | null;
  image_url?: string | null;
  safety_score?: number | null;
}

export default function FavoritesPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    // Safely read from localStorage to hydrate state from storage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    }
  }, []);
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      if (typeof window !== "undefined") {
        const storedFavorites = localStorage.getItem("favoriteProducts");
        if (storedFavorites) {
          try {
            const favoritesData: Array<{
              id: number;
              category: "skincare" | "makeup" | "hair";
              name: string;
              brand_name: string | null;
            }> = JSON.parse(storedFavorites);

            // Fetch image data from API for each favorite product
            const productsWithImages = (await Promise.all(
              favoritesData.map(async (fav) => {
                try {
                  const pathSegment = fav.category === "hair" ? "haircare" : fav.category;
                  const res = await authenticatedFetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${pathSegment}/${pathSegment}_products/${fav.id}/`
                  );

                  if (res.ok) {
                    const data = await res.json();
                    return {
                      ...fav,
                      image_url: data.image_url || null,
                      safety_score: data.safety_score || null,
                    } as FavoriteProduct;
                  }
                } catch (error) {
                  console.error(`Error fetching product ${fav.id}:`, error);
                }
                return { ...fav } as FavoriteProduct;
              })
            )) as FavoriteProduct[];

            setFavoriteProducts(productsWithImages);
          } catch (error) {
            console.error("Error loading favorites from localStorage:", error);
          }
        }
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  // Listen for storage changes and custom events to sync across tabs/pages
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleFavoritesUpdate = async () => {
        const storedFavorites = localStorage.getItem("favoriteProducts");
        if (storedFavorites) {
          try {
            const favoritesData: Array<{
              id: number;
              category: "skincare" | "makeup" | "hair";
              name: string;
              brand_name: string | null;
            }> = JSON.parse(storedFavorites);

            // Fetch image data from API for each favorite product
            const productsWithImages = (await Promise.all(
              favoritesData.map(async (fav) => {
                try {
                  const pathSegment = fav.category === "hair" ? "haircare" : fav.category;
                  const res = await authenticatedFetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${pathSegment}/${pathSegment}_products/${fav.id}/`
                  );

                  if (res.ok) {
                    const data = await res.json();
                    return {
                      ...fav,
                      image_url: data.image_url || null,
                      safety_score: data.safety_score || null,
                    } as FavoriteProduct;
                  }
                } catch (error) {
                  console.error(`Error fetching product ${fav.id}:`, error);
                }
                return { ...fav } as FavoriteProduct;
              })
            )) as FavoriteProduct[];

            setFavoriteProducts(productsWithImages);
          } catch (error) {
            console.error("Error loading favorites from update event:", error);
            setFavoriteProducts([]);
          }
        } else {
          setFavoriteProducts([]);
        }
      };

      window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
      return () => {
        window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      };
    }
  }, []);

  // Get safety score badge color based on score
  const getSafetyScoreColor = (score: number | null | undefined): string => {
    if (!score) return "#CCCCCC"; // Gray for no score
    if (score >= 8) return "#F10101"; // Red
    if (score >= 4) return "#FFBF13"; // Yellow
    return "#22B07D"; // Green
  };

  // Remove product from favorites
  const handleRemoveFromFavorites = (productId: number, category: string) => {
    setFavoriteProducts((prev) => {
      const updated = prev.filter(
        (product) => !(product.id === productId && product.category === category)
      );
      // Save to localStorage
      if (typeof window !== "undefined") {
        const updatedData = updated.map((product) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { image_url, safety_score, ...rest } = product;
          return rest;
        });
        localStorage.setItem("favoriteProducts", JSON.stringify(updatedData));
        // Trigger a custom event to notify other tabs/pages
        window.dispatchEvent(new Event("favoritesUpdated"));
      }
      return updated;
    });
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-natural-white"
      dir="rtl"
    >
      {/* Mobile Header - Only visible on mobile */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 sm:px-6 pt-8 pb-0 flex-shrink-0"
        role="banner"
      >
        <div className="w-full flex items-center justify-between h-16">
          <button
            type="button"
            onClick={handleBack}
            className=" flex h-fit w-fit items-center justify-center  text-brand-primary opacity-90 hover:opacity-100 transition-all"
            aria-label="العودة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium text-natural-primary-text">
            المفضلة
          </h1>

          <p className="w-6 opacity-0"></p>
        </div>
      </header>

      {/* Desktop/Tablet Top Navigation - Only visible on tablet and desktop */}
      <MainNavbar isLoggedIn={isLoggedIn} />

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col items-center ${favoriteProducts.length === 0 ? "justify-center" : "justify-start"
          } px-4 sm:px-6 lg:px-8 pt-8 md:py-6 lg:py-8 pb-24 md:pb-8 overflow-y-auto scrollbar-right`}
      >
        <div className="w-full md:max-w-7xl">
          {/* Content Container */}
          <div
            className={`flex flex-col ${favoriteProducts.length === 0
              ? "flex-1 justify-center"
              : "gap-5 md:gap-8 lg:gap-10"
              }`}
          >
            {/* Promotional Banner - Only show when there are favorite products */}
            {favoriteProducts.length > 0 && (
              <div className="relative w-full h-[138px] md:h-[200px] lg:h-[300px] rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                  src={favouriteBanner}
                  alt="صمّمي روتينك الخاص بمنتجاتك المفضلة!"
                  fill
                  className="object-cover rounded-xl md:rounded-2xl"
                />
                {/* Overlay Text */}
                <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-start pl-4 md:pl-12 lg:pl-16">
                  <div className="flex flex-col gap-3 md:gap-4 items-start pr-3 md:pr-6">
                    {/* Coming Soon Badge */}
                    <div className="bg-[#d682b0]">
                      <span className="text-white text-sm md:text-base lg:text-lg font-normal whitespace-nowrap pr-[1px]">
                        قريبــــًا!✨
                      </span>
                    </div>
                    {/* Main Text */}
                    <div className="text-right max-w-[148px] md:max-w-none">
                      <p className="text-natural-primary-text text-base md:text-lg lg:text-xl font-normal leading-tight">
                        صمّمي روتينك الخاص بمنتجاتك المفضلة!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Favorite Products List */}
            {!loading && favoriteProducts.length > 0 ? (
              <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6">
                {favoriteProducts.map((product) => (
                  <div
                    key={`${product.category}-${product.id}`}
                    className="bg-natural-white border-[0.5px] border-natural-light-border rounded-2xl md:rounded-xl md:border md:border-natural-light-border shadow-[0_10px_30px_rgba(194,194,194,0.2)] md:shadow-none md:hover:shadow p-[13px] md:p-0 flex items-center md:flex-col gap-2 md:gap-0 transition-shadow overflow-hidden"
                  >
                    {/* Product Image Section - Mobile */}
                    <div className="md:hidden relative flex-shrink-0 w-[76px] h-[76px] rounded-xl overflow-hidden bg-natural-white">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                          sizes="76px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>

                    {/* Product Image Section - Desktop */}
                    <Link
                      href={product.category === "hair" ? "/coming-soon" : `/products/${product.id}?category=${product.category}`}
                      className="hidden md:block relative w-full aspect-[173/166] border-b border-natural-light-border overflow-hidden"
                    >
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}

                      {/* Heart Icon - Top Left (Desktop/Tablet) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFromFavorites(product.id, product.category);
                        }}
                        className="absolute top-2 left-2 size-8 rounded-full items-center justify-center bg-white shadow hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2 z-10 flex"
                        aria-label={`إزالة ${product.name} من المفضلة`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3313 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9738 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5Z"
                            fill="#CC68A1"
                          />
                        </svg>
                      </button>
                    </Link>

                    {/* Product Information Section */}
                    <div className="flex-1 md:w-full flex flex-col gap-1 min-w-0 px-2 md:p-3">
                      {/* Safety Score Badge */}
                      <div className="flex justify-start items-start mb-0.5 md:mb-1">
                        <div
                          className="rounded-full w-5 h-5 md:w-5 md:h-5 flex items-center justify-center font-bold text-xs"
                          style={{
                            backgroundColor: getSafetyScoreColor(
                              product.safety_score
                            ),
                          }}
                        >
                          <span className="text-white text-[10px] md:text-xs font-medium md:font-bold leading-none">
                            {product.safety_score ?? "—"}
                          </span>
                        </div>
                      </div>

                      {/* Brand Name */}
                      <p className="text-natural-primary-text text-sm md:text-sm font-medium md:font-medium text-right leading-tight md:mb-1">
                        {product.brand_name || "بدون ماركة"}
                      </p>

                      {/* Product Name */}
                      <p className="text-[#757575] md:text-natural-helper-text text-sm md:text-sm font-normal md:font-medium text-right leading-tight">
                        {product.name}
                      </p>
                    </div>

                    {/* Heart Icon - Mobile (Right side) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveFromFavorites(product.id, product.category)}
                      className="md:hidden flex-shrink-0 self-center p-1 hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2 rounded"
                      aria-label={`إزالة ${product.name} من المفضلة`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3313 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9738 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5Z"
                          fill="#CC68A1"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : !loading && isLoggedIn ? (
              // Logged in but no favorites
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center gap-8 max-w-[358px] w-full">
                  {/* Heart Icon and Text Container */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Large Heart Icon */}
                    <div className="flex items-center justify-center">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "var(--Primary, #CC68A1)" }}
                      >
                        <path
                          d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3313 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9738 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5Z"
                          stroke="var(--Primary, #CC68A1)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Empty State Text */}
                    <p className="text-[#555555] text-base md:text-lg font-normal max-w-[358px] w-full">
                      أضف منتجاتك المفضلة أو تصفّح لاكتشاف المزيد
                    </p>
                  </div>

                  {/* Browse Products Button */}
                  <Link
                    href="/products"
                    className="w-full max-w-[358px] px-6 py-3 text-natural-white rounded-lg hover:opacity-90 transition-opacity text-base font-medium text-center"
                    style={{ backgroundColor: "var(--Primary, #CC68A1)" }}
                  >
                    تصفح المنتجات
                  </Link>
                </div>
              </div>
            ) : (
              // Not logged in state
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center gap-8 max-w-[358px] w-full">
                  {/* Lock-Heart Icon and Text Container */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Lock-Heart Icon */}
                    <div className="flex items-center justify-center">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23 42H14C12.9391 42 11.9217 41.5786 11.1716 40.8284C10.4214 40.0783 10 39.0609 10 38V26C10 24.9391 10.4214 23.9217 11.1716 23.1716C11.9217 22.4214 12.9391 22 14 22H34C34.76 22 35.468 22.212 36.074 22.58M16 22V14C16 11.8783 16.8429 9.84344 18.3431 8.34315C19.8434 6.84285 21.8783 6 24 6C26.1217 6 28.1566 6.84285 29.6569 8.34315C31.1571 9.84344 32 11.8783 32 14V22"
                          stroke="var(--Primary, #CC68A1)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M36 43.9999L42.7 37.4319C43.1109 37.0332 43.4377 36.5562 43.6612 36.0291C43.8847 35.502 44.0003 34.9355 44.0012 34.363C44.0022 33.7905 43.8884 33.2236 43.6666 32.6957C43.4448 32.1679 43.1196 31.6899 42.71 31.2899C41.8748 30.4716 40.7527 30.0123 39.5834 30.0101C38.4142 30.0078 37.2904 30.4628 36.452 31.2779L36.004 31.7179L35.558 31.2779C34.7228 30.4602 33.6012 30.0013 32.4324 29.999C31.2637 29.9968 30.1403 30.4514 29.302 31.2659C28.891 31.6644 28.564 32.1413 28.3404 32.6683C28.1167 33.1953 28.0009 33.7618 27.9998 34.3343C27.9986 34.9068 28.1122 35.4738 28.3338 36.0017C28.5554 36.5295 28.8806 37.0077 29.29 37.4079L36 43.9999Z"
                          stroke="var(--Primary, #CC68A1)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Not Logged In Text */}
                    <p className="text-[#555555] text-base md:text-lg font-normal max-w-[358px] w-full">
                      سجّل دخولك للوصول إلى قائمتك المفضلة
                    </p>
                  </div>

                  {/* Login Button */}
                  <Link
                    href="/login"
                    className="w-full max-w-[358px] px-6 py-3 text-natural-white rounded-lg hover:opacity-90 transition-opacity text-base font-medium text-center"
                    style={{ backgroundColor: "var(--Primary, #CC68A1)" }}
                  >
                    دخول
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Only visible on mobile */}
      <BottomNavbar />
    </div>
  );
}
