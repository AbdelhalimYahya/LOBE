"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BottomNavbar from "@/components/BottomNavbar";
import { MainNavbar } from "@/components";
import { blog1, blog2, blog3 } from "@/assets";
import { ChevronRight } from "lucide-react";

interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  content: {
    intro: string;
    sections: {
      heading: string;
      content: string | string[];
    }[];
    conclusion: string;
  };
  nextArticle?: {
    slug: string;
    title: string;
  };
}

const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: "niacinamide",
    title: "النياسيناميد لبشرة أكثر صحة!",
    date: "30 سبتمبر 2025",
    image: blog1,
    content: {
      intro:
        "النياسيناميد هو شكل من أشكال فيتامين B3، يُستخدم بكثرة في مستحضرات العناية بالبشرة لخصائصه المتعددة.",
      sections: [
        {
          heading: "ما هو النياسيناميد؟",
          content:
            "النياسيناميد هو شكل من أشكال فيتامين B3 القابل للذوبان في الماء، والمعروف أيضاً باسم النيكوتيناميد. يُستخدم بكثرة في مستحضرات العناية بالبشرة نظراً لفعاليته العالية وسلامة استخدامه. يساعد على تحسين ملمس البشرة وتوحيد لونها، كما يعمل على تقليل ظهور البقع الداكنة والتصبغات.",
        },
        {
          heading: "الفوائد الأساسية:",
          content: [
            "تقليل ظهور البقع الداكنة والتصبغات وتحسين لون البشرة",
            "تحسين ملمس البشرة وتقليل المسام الواسعة",
            "ترطيب البشرة وتعزيز حاجزها الطبيعي",
            "تقليل الالتهابات والاحمرار، خاصة للبشرة الحساسة",
          ],
        },
        {
          heading: "هل يناسب جميع أنواع البشرة؟",
          content:
            "نعم، يتميز النياسيناميد بكونه مناسباً لجميع أنواع البشرة، حتى الحساسة منها. يمكن استخدامه مع معظم المكونات الأخرى دون مشاكل، مما يجعله خياراً مثالياً لإضافته إلى روتينك اليومي. يُنصح باستخدامه بتراكيز تتراوح بين 5% إلى 10% للحصول على أفضل النتائج.",
        },
        {
          heading: "ملاحظات الاستخدام:",
          content: [
            "يمكن استخدامه صباحاً ومساءً، لكن يُفضل استخدامه مرتين يومياً للحصول على أفضل النتائج",
            "ينصح بتطبيقه بعد التنظيف والترطيب، وقبل استخدام واقي الشمس في الصباح",
            "يمكن دمجه مع معظم المكونات الأخرى مثل حمض الهيالورونيك والريتينول",
          ],
        },
      ],
      conclusion:
        "النياسيناميد هو مكون رائع للعناية بالبشرة يمكن أن يحسن بشكل كبير من صحة ومظهر بشرتك. اكتشفي كيفية دمجه في روتينك اليومي للحصول على بشرة نضرة ومتوهجة.",
    },
    nextArticle: {
      slug: "retinol",
      title: "المكوّن الذهبي لمكافحة التجاعيد",
    },
  },
  {
    id: 2,
    slug: "retinol",
    title: "المكوّن الذهبي لمكافحة التجاعيد",
    date: "25 سبتمبر 2025",
    image: blog2,
    content: {
      intro:
        'الريتينول يُطلق عليه "المكون الذهبي" في عالم العناية بالبشرة. يدخل في أغلب منتجات مكافحة التجاعيد لأنه يساعد على تجديد الخلايا وتحفيز الكولاجين.',
      sections: [
        {
          heading: "ما هو الريتينول؟",
          content:
            "الريتينول هو أحد أشكال فيتامين A، ويُعد من أقوى المكونات الفعالة في مكافحة علامات التقدم في السن. يعمل على تسريع عملية تجديد الخلايا وتحفيز إنتاج الكولاجين، مما يساعد على تقليل الخطوط الدقيقة والتجاعيد.",
        },
        {
          heading: "الفوائد الأساسية:",
          content: [
            "تقليل الخطوط الدقيقة والتجاعيد وتحسين نعومة البشرة",
            "تحفيز إنتاج الكولاجين وتحسين مرونة البشرة",
            "تقليل البقع الداكنة وتحسين لون البشرة",
            "تنعيم ملمس البشرة وتقليل المسام",
          ],
        },
        {
          heading: "كيفية استخدام الريتينول:",
          content:
            "يجب استخدام الريتينول بشكل تدريجي وبتراكيز منخفضة في البداية. ابدأي باستخدامه مرتين أسبوعياً، ثم زيدي تدريجياً إلى ثلاث أو أربع مرات أسبوعياً. يُستخدم فقط في المساء لأنه يزيد من حساسية البشرة للشمس. يجب الحرص على استخدام واقي الشمس يومياً عند استخدام الريتينول.",
        },
        {
          heading: "ملاحظات مهمة:",
          content: [
            "يُستخدم فقط في المساء، وليس في الصباح",
            "يجب استخدام واقي الشمس يومياً عند استخدام الريتينول",
            "ابدأي بتركيز منخفض (0.25% - 0.5%) وزيّدي تدريجياً",
            "تجنبي دمجه مع مكونات قوية أخرى في نفس الوقت مثل حمض الجليكوليك",
          ],
        },
      ],
      conclusion:
        "الريتينول هو مكون قوي وفعال يمكن أن يحسن بشكل كبير من مظهر بشرتك. مع الاستخدام الصحيح والصبر، يمكنك الحصول على بشرة أكثر نعومة وشباباً.",
    },
    nextArticle: {
      slug: "hyaluronic-acid",
      title: "اعرف أكثر عن حمض الهيالورونيك",
    },
  },
  {
    id: 3,
    slug: "hyaluronic-acid",
    title: "اعرف أكثر عن حمض الهيالورونيك",
    date: "20 سبتمبر 2025",
    image: blog3,
    content: {
      intro:
        "تعرفي على فوائد حمض الهيالورونيك للبشرة وكيفية استخدامه بشكل صحيح للحصول على أفضل النتائج. هذا المكون الفريد لديه القدرة على الاحتفاظ بكميات كبيرة من الماء.",
      sections: [
        {
          heading: "ما هو حمض الهيالورونيك؟",
          content:
            "حمض الهيالورونيك هو مادة طبيعية موجودة في جسم الإنسان، وتحديداً في الجلد والأنسجة الضامة. لديه قدرة فريدة على الاحتفاظ بكميات كبيرة من الماء - يمكنه الاحتفاظ بوزن من الماء يصل إلى 1000 مرة من وزنه، مما يجعله مرطباً قوياً للبشرة.",
        },
        {
          heading: "الفوائد الأساسية:",
          content: [
            "ترطيب عميق للبشرة وملء الخطوط الدقيقة",
            "تحسين مرونة البشرة وملمسها",
            "تقليل ظهور التجاعيد والخطوط الدقيقة",
            "تهدئة البشرة وتقليل الالتهابات",
          ],
        },
        {
          heading: "كيفية استخدامه:",
          content:
            "يمكن استخدام حمض الهيالورونيك صباحاً ومساءً. يُطبق بعد التنظيف وقبل المرطب. يُفضل استخدامه على بشرة رطبة قليلاً لتحسين امتصاصه. يمكن دمجه مع معظم المكونات الأخرى دون مشاكل.",
        },
        {
          heading: "نصائح الاستخدام:",
          content: [
            "يُطبق على بشرة رطبة قليلاً لتحسين الفعالية",
            "يمكن استخدامه صباحاً ومساءً",
            "يُفضل استخدامه قبل المرطب في روتينك",
            "يأتي بأحجام جزيئية مختلفة - استخدمي الأنواع منخفضة الوزن الجزيئي للاختراق العميق",
          ],
        },
      ],
      conclusion:
        "حمض الهيالورونيك هو مرطب قوي وفعال يمكن أن يحسن بشكل كبير من مستوى ترطيب بشرتك. مع الاستخدام الصحيح، يمكنك الحصول على بشرة رطبة ونضرة.",
    },
    nextArticle: {
      slug: "niacinamide",
      title: "النياسيناميد لبشرة أكثر صحة!",
    },
  },
];

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.id as string;

  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-natural-white"
        dir="rtl"
      >
        <h1 className="text-2xl font-bold text-natural-primary-text mb-4">
          المقال غير موجود
        </h1>
        <button
          onClick={() => router.push("/blog")}
          className="text-brand-primary hover:underline"
        >
          العودة إلى المدونة
        </button>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col bg-natural-white" dir="rtl">
      {/* Mobile Header - Only visible on mobile */}
      <header
        className="flex md:hidden w-full items-center justify-center px-4 sm:px-6 pt-8 pb-0 flex-shrink-0"
        role="banner"
      >
        <div className="w-full  relative flex items-center justify-center h-16">
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
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <article className="w-full sm:max-w-2xl lg:max-w-4xl mx-auto">
          {/* Article Title */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-primary mb-6 md:mb-8 leading-tight">
            {article.title}
          </h2>

          {/* Feature Image */}
          <div className="relative w-full aspect-video md:aspect-[16/9] mb-4 md:mb-6 overflow-hidden rounded-xl">
            <Image
              fill
              src={article.image}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Date */}
          <p className="text-sm md:text-base text-natural-subtext-description mb-6 md:mb-8 text-right">
            {article.date}
          </p>

          {/* Article Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Introduction */}
            <p className="text-base md:text-lg text-natural-primary-text leading-relaxed mb-6 md:mb-8">
              {article.content.intro}
            </p>

            {/* Sections */}
            {article.content.sections.map((section, index) => (
              <div key={index} className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-natural-primary-text">
                  {section.heading}
                </h3>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc list-outside space-y-3 md:space-y-4 pr-6 md:pr-8">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-base md:text-lg text-natural-subtext-description leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base md:text-lg text-natural-subtext-description leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div className="space-y-4 md:space-y-5 mt-6 md:mt-8">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-natural-primary-text">
                الخلاصة:
              </h3>
              <p className="text-base md:text-lg text-natural-subtext-description leading-relaxed">
                {article.content.conclusion}
              </p>
            </div>
          </div>

          {/* Next Article Button */}
          {article.nextArticle && (
            <div className="mt-8 md:mt-12">
              <Link
                href={`/blog/${article.nextArticle.slug}`}
                className="flex items-center justify-center w-full py-3 md:py-4 border-2 border-brand-primary text-brand-primary rounded-xl font-medium text-base md:text-lg hover:bg-brand-primary-light-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-buttons-status-focus-border focus-visible:ring-offset-2"
              >
                المقالة التالية
              </Link>
            </div>
          )}
        </article>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNavbar />
    </div>
  );
}
