"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import BottomNavbar from "@/components/BottomNavbar";
import { blog1, blog2, blog3, blogImage } from "@/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeFooter, MainNavbar } from "@/components";

const Blog = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const blogArticles = [
    {
      id: 1,
      title: "النياسيناميد لبشرة أكثر صحة!",
      excerpt:
        "النياسيناميد هو شكل من أشكال فيتامين B3، يُستخدم بكثرة في مستحضرات العناية بالبشرة لخصائصه المتعددة. يساعد على تقليل ظهور البقع الداكنة والتصبغات، وتحسين ملمس البشرة، وتقليل المسام الواسعة، كما يعمل على توحيد لون البشرة...",
      image: blog1,
      href: "/blog/niacinamide",
    },
    {
      id: 2,
      title: "المكوّن الذهبي لمكافحة التجاعيد",
      excerpt:
        'الريتينول يُطلق عليه "المكون الذهبي" في عالم العناية بالبشرة. يدخل في أغلب منتجات مكافحة التجاعيد لأنه يساعد على تجديد الخلايا وتحفيز الكولاجين. يعمل على تقليل الخطوط الدقيقة والتجاعيد، وتحسين نعومة البشرة...',
      image: blog2,
      href: "/blog/retinol",
    },
    {
      id: 3,
      title: "اعرف أكثر عن حمض الهيالورونيك",
      excerpt:
        "تعرفي على فوائد حمض الهيالورونيك للبشرة وكيفية استخدامه بشكل صحيح للحصول على أفضل النتائج. هذا المكون الفريد لديه القدرة على الاحتفاظ بكميات كبيرة من الماء، مما يجعله مرطباً قوياً للبشرة...",
      image: blog3,
      href: "/blog/hyaluronic-acid",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-natural-white" dir="rtl">
      {/* Mobile Header - Only visible on mobile */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 pt-8 pb-0 flex-shrink-0"
        role="banner"
      >
        <div className="w-full max-w-[358px] relative flex items-center justify-center h-16">
          <h1 className="text-xl font-medium text-natural-primary-text">
            المدونة
          </h1>
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-0 flex size-fit items-center justify-center text-brand-primary opacity-80 hover:opacity-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2"
            aria-label="العودة"
          >
            <ChevronRight className="text-brand-primary size-6" />
          </button>
        </div>
      </header>

      {/* Desktop/Tablet Top Navigation - Only visible on tablet and desktop */}
      <MainNavbar isLoggedIn={true} />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto ">
          {/* Introductory Text */}
          <p className="text-base font-medium md:text-lg lg:text-xl text-brand-primary mb-8 text-center">
            استكشف محتوى يواكب عالم الجمال والعناية، يجمع بين المعلومة الموثوقة
            والنصيحة المبسطة.
          </p>

          {/* Blog Posts - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="block bg-natural-white rounded-2xl border border-natural-light-border overflow-hidden hover:shadow transition-shadow p-2"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-video  overflow-hidden rounded-xl">
                  <Image
                    fill
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Text Content Section */}
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-bold text-natural-primary-text mb-4 line-clamp-1">
                    {article.title}
                  </h2>
                  <p className="text-sm md:text-base  text-natural-subtext-description mb-4 md:mb-6 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base font-medium text-brand-primary inline-flex items-center gap-1 md:gap-2 hover:underline">
                      اقرأ المزيد
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <HomeFooter />
      {/* Bottom Navigation - Mobile only */}
      <BottomNavbar />
    </div>
  );
};

export default Blog;
