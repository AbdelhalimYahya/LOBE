"use client";
import { HomeFooter, MainNavbar } from "@/components";

import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image from "next/image";
import {
  BellIcon,
  blog2,
  blog4,
  blogImage,
  EyeglassesIcon,
  HairDryerIcon,
  productImage1,
  productImage2,
  SunglassesIcon,
  WineIcon,
} from "@/assets";
import { ChevronLeft } from "lucide-react";
import HeroBanner1 from "@/components/home/HeroBanner1";
import HeroBanner2 from "@/components/home/HeroBanner2";
import BottomNavbar from "@/components/BottomNavbar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBanner, setActiveBanner] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");

  // Check login status and auto-switch between banners
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLogin(!!token);

      // Get user name from currentUser
      if (token) {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          try {
            const user = JSON.parse(currentUser);
            setUserName(user.name || "المستخدم");
          } catch {
            setUserName("المستخدم");
          }
        }
      }
    }
  }, []);

  // Auto-switch between banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      name: "العناية",
      icon: EyeglassesIcon,
      category: "commerce",
      href: "/categories/care",
    },
    {
      name: "الشعر",
      icon: HairDryerIcon,
      category: "commerce",
      href: "/categories/hair",
    },
    {
      name: "المكياج",
      icon: SunglassesIcon,
      category: "commerce",
      href: "/categories/makeup",
    },
    {
      name: "العطور",
      icon: WineIcon,
      category: "commerce",
      href: "/categories/perfumes",
    },
  ];

  const mostSearchedProducts = [
    {
      id: 1,
      name: "اسم المنتج",
      company: "الشركة",
      image: productImage1,
      rating: 1,
      badge: "1",
      badgeColor: "bg-status-success",
    },
    {
      id: 2,
      name: "اسم المنتج",
      company: "الشركة",
      image: productImage2,
      rating: 5,
      badge: "5",
      badgeColor: "bg-status-warning",
    },
    {
      id: 3,
      name: "اسم المنتج",
      company: "الشركة",
      image: productImage1,
      rating: 1,
      badge: "1",
      badgeColor: "bg-status-success",
    },
    {
      id: 4,
      name: "اسم المنتج",
      company: "الشركة",
      image: productImage2,
      rating: 5,
      badge: "5",
      badgeColor: "bg-status-warning",
    },
  ];

  const blogArticles = [
    {
      id: 1,
      title: "النياسيناميد لبشرة أكثر صحة!",
      excerpt:
        "النياسيناميد هو شكل من أشكال فيتامين B3، يستخدم بكثرة في مستحضرات العناية بالبشرة لخصائصه المتعددة. يساعد على تقليل ظهور البقع الداكنة والتصبغات، وتحسين ملمس البشرة، وتقليل المسام الواسعة، كما يعمل على توحيد لون البشرة. يتميز بكونه مناسباً لجميع أنواع البشرة، حتى الحساسة منها، ويمكن استخدامه مع معظم المكونات الأخرى دون مشاكل. اكتشفي كيفية دمجه في روتينك اليومي للحصول على بشرة نضرة ومتوهجة.",
      image: blogImage,
      href: "/blog/niacinamide",
    },
    {
      id: 2,
      title: "المكون الذهبي لمكافحة التجاعيد",
      excerpt:
        'الريتينول يُطلق عليه "المكون الذهبي" في عالم العناية بالبشرة. يدخل في أغلب منتجات مكافحة التجاعيد لأنه يساعد على تجديد الخلايا وتحفيز الكولاجين. يعمل على تقليل الخطوط الدقيقة والتجاعيد، وتحسين نعومة البشرة، وتقليل البقع الداكنة. يجب استخدامه بشكل تدريجي وبتراكيز منخفضة في البداية، مع الحرص على استخدام واقي الشمس يومياً. تعرفي على كيفية بناء التسامح مع الريتينول والطريقة الصحيحة لإضافته إلى روتينك الليلي.',
      image: blog2,
      href: "/blog/retinol",
    },
    {
      id: 3,
      title: "اعرف أكثر عن حمض الهيالورونيك",
      excerpt:
        "تعرفي على فوائد حمض الهيالورونيك للبشرة وكيفية استخدامه بشكل صحيح للحصول على أفضل النتائج. هذا المكون الفريد لديه القدرة على الاحتفاظ بكميات كبيرة من الماء، مما يجعله مرطباً قوياً للبشرة. يساعد على ملء الخطوط الدقيقة، وتحسين مرونة البشرة، وإعطائها مظهراً مشرقاً وممتلئاً. يمكن استخدامه بتركيزات مختلفة حسب احتياجات بشرتك، ويفضل تطبيقه على بشرة رطبة لتعزيز امتصاصه. اكتشفي أفضل المنتجات التي تحتوي عليه ونصائح لاستخدامه بشكل فعال.",
      image: blog4,
      href: "/blog/hyaluronic-acid",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-natural-white" dir="rtl">
      {/* Mobile Header - Visible on mobile only */}
      <nav
        className={`flex w-full items-center ${
          isLogin ? "justify-center pt-8" : "justify-between"
        } px-4 py-3 md:hidden flex-shrink-0`}
      >
        {/* Logo - Right side in RTL */}
        <Link href="/" className="flex items-center">
          {isLogin ? (
            <Image
              src={"/logo.png"}
              alt={"logo"}
              width={155}
              height={40}
              priority
              unoptimized
            />
          ) : (
            <Image
              src="/minimal-logo.png"
              alt="Beauty Cops"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
              unoptimized
            />
          )}
        </Link>

        {/* Login Button - Left side in RTL */}
        {isLogin ? (
          <></>
        ) : (
          <Link
            href={"/login"}
            className="px-4 py-2 bg-brand-buttons-status-default text-natural-white rounded-lg hover:bg-brand-buttons-status-hover transition-colors text-sm font-medium whitespace-nowrap"
          >
            تسجيل الدخول
          </Link>
        )}
      </nav>

      {/* Desktop/Tablet Top Navigation - Only visible on tablet and desktop */}
      <MainNavbar isLoggedIn={isLogin} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {isLogin ? (
          <div className="w-full flex items-center justify-between mb-4 md:mb-6">
            <span className="text-lg font-medium text-brand-primary">
              هلا، {userName}👋
            </span>

            <Link
              href="/notifications"
              className="hover:opacity-75 transition-all"
            >
              <Image
                src={BellIcon}
                alt="bell icon"
                width={18.80649757385254}
                height={20.254146575927734}
              />
            </Link>
          </div>
        ) : null}
        {/* Hero Banner Section with Auto-Switch */}
        <div className="relative mb-4 md:mb-6" style={{ minHeight: "200px" }}>
          <div
            className={`transition-opacity duration-1000 ease-in-out ${
              activeBanner === 0
                ? "opacity-100 relative"
                : "opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            <HeroBanner1 />
          </div>
          <div
            className={`transition-opacity duration-1000 ease-in-out ${
              activeBanner === 1
                ? "opacity-100 relative"
                : "opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            <HeroBanner2 />
          </div>
        </div>
        {/* Search Bar Section */}
        <section className="mb-8 lg:mb-12">
          <div className="relative w-full">
            {/* Gradient Border Wrapper */}
            <div
              className="w-full rounded-full p-[1px]"
              style={{
                background:
                  "linear-gradient(102.46deg, rgba(190, 92, 144, 0.45) -30.33%, rgba(249, 206, 185, 0.9) 0.3%, rgba(225, 141, 187, 0.9) 45.57%, rgba(159, 215, 234, 0.9) 91.77%",
              }}
            >
              <div className="flex items-center bg-white rounded-full overflow-hidden pl-2 md:pl-2.5">
                {/* Input Field */}
                <input
                  type="text"
                  placeholder="ابحث باسم المنتج"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg text-natural-primary-text placeholder:text-natural-input-hint h-14 md:h-16"
                  dir="rtl"
                />

                {/* Circular Search Button - Left side in RTL */}
                <button
                  type="button"
                  className="flex-shrink-0 w-[42px] h-[42px] md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(190, 92, 144, 1), rgba(225, 141, 187, 1))",
                  }}
                  aria-label="Search"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-8 lg:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-natural-primary-text">
              تصفح الفئات
            </h2>
            <Link
              href="/categories"
              className="text-sm md:text-base text-brand-primary hover:underline"
            >
              عرض المزيد
            </Link>
          </div>

          {/* Categories grid secion */}
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center group"
              >
                {/* Gradient Border Wrapper */}
                <Link href={category.href} className="w-full relative">
                  <div
                    className="w-full rounded-2xl p-[1px] hover:p-[2px] transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(102.46deg, rgba(190, 92, 144, 0.45) -30.33%, rgba(249, 206, 185, 0.9) 0.3%, rgba(225, 141, 187, 0.9) 45.57%, rgba(159, 215, 234, 0.9) 91.77%",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center aspect-square bg-white rounded-2xl p-2 sm:p-4 md:p-5 lg:p-6 transition-all duration-300">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                        <Image
                          src={category.icon}
                          width={56}
                          height={56}
                          alt={category.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(31%) sepia(96%) saturate(1352%) hue-rotate(290deg) brightness(0.85) contrast(0.9)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Category Name - Below the card */}
                <span className="text-xs sm:text-base md:text-lg font-medium text-natural-primary-text text-center mt-2 sm:mt-3 md:mt-4 transition-colors duration-300 group-hover:text-brand-primary">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Most Searched Products Section */}
        <section className="mb-8 lg:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-natural-primary-text">
              المنتجات الأكثر بحثاً
            </h2>
            <Link
              href="/products"
              className="text-sm md:text-base text-brand-primary hover:underline"
            >
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {mostSearchedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-xl border border-natural-light-border overflow-hidden hover:shadow transition-shadow ${
                  index === 2
                    ? "hidden md:block"
                    : index === 3
                    ? "hidden lg:block"
                    : ""
                }`}
              >
                <div className="relative w-full aspect-[173/166] border-b border-natural-light-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      fill
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>
                  {/* Heart Icon - Top right in RTL */}
                  <button
                    className="absolute top-2 left-2 z-10 size-8  flex items-center justify-center rounded-full bg-white shadow transition-colors"
                    aria-label="Add to favorites"
                  >
                    <Icon
                      name="Heart"
                      size={18}
                      category="games"
                      className="text-brand-primary size-[18px]"
                    />
                  </button>
                </div>
                <div className="p-3">
                  {/* Rating Badge - Bottom left in RTL */}
                  <div
                    className={`mb-1 ${product.badgeColor} text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs`}
                  >
                    {product.badge}
                  </div>
                  <p className="text-sm  text-natural-primary-text font-medium mb-1">
                    {product.company}
                  </p>
                  <p className="text-sm  font-medium text-natural-helper-text">
                    {product.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-natural-primary-text">
              من المدونة
            </h2>
            <Link
              href="/blog"
              className="text-sm md:text-base text-brand-primary hover:underline"
            >
              عرض الكل
            </Link>
          </div>
          <div className="space-y-4 md:space-y-6">
            {blogArticles.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="flex flex-row items-start gap-3 sm:gap-4 md:gap-6 bg-white rounded-xl border border-natural-light-border p-4 md:p-6 hover:shadow transition-shadow"
              >
                {/* Image - Right side in RTL */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    fill
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Content - Left side in RTL */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-natural-primary-text mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-natural-subtext-description mb-2 sm:mb-3 line-clamp-2 lg:line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="text-sm sm:text-base font-medium text-brand-primary inline-flex items-center gap-1">
                    اقرأ المزيد <ChevronLeft className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <HomeFooter />
      {isLogin ? <BottomNavbar /> : null}
    </div>
  );
};

export default Home;
