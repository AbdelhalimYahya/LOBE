import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../Button";
import Image from "next/image";
import { homeHeroImage } from "@/assets";

const HeroBanner1 = () => {
  const router = useRouter();

  return (
    <section className="mb-6 md:mb-8 lg:mb-12">
      <div className="relative overflow-hidden rounded-2xl h-[200px] md:h-[280px] lg:h-[320px] xl:h-[360px] flex items-center">
        <div
          style={{
            background:
              "linear-gradient(102.46deg, rgba(190, 92, 144, 0.45) -30.33%, rgba(249, 206, 185, 0.9) 0.3%, rgba(225, 141, 187, 0.9) 45.57%, rgba(159, 215, 234, 0.9) 91.77%",
          }}
          className=" absolute inset-0 opacity-45"
        ></div>
        <div className="flex flex-row items-center justify-between w-full gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 xl:px-12">
          {/* Text Content*/}
          <div className="flex-1 w-full md:max-w-[60%] lg:max-w-[55%] xl:max-w-[50%] z-10">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-primary mb-4 md:mb-5 lg:mb-6">
              اعرف مكوّنات منتجك واختر بأمان!
            </h1>
            <div className="flex-1 max-w-[186px] md:max-w-none">
              <p className="text-[13px] sm:text-sm md:text-base lg:text-lg xl:text-xl text-brand-primary mb-4 md:mb-5 lg:mb-6 xl:mb-8 md:max-w-[90%] lg:max-w-[85%]">
                ابحث باسم المنتج لتحصل على تحليل فوري لسلامته
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  const token = localStorage.getItem("authToken"); // Simple auth check
                  if (!token) {
                    router.push("/login");
                    return;
                  }
                  const searchInput = document.getElementById("home-search-input");
                  if (searchInput) {
                    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
                    searchInput.focus();
                  }
                }}
                className="!w-fit !px-6 md:!px-8 lg:!px-10 h-[36px] md:h-[44px] lg:h-[48px] text-sm md:text-base lg:text-lg font-[500] rounded-full flex items-center justify-center inline-block"
              >
                جرّب التحليل
              </Button>
            </div>
          </div>
          {/* Image - Right side in RTL */}

          <Image
            src={homeHeroImage}
            width={176}
            height={176}
            alt="home-hero-image"
            className="absolute bottom-0 left-0 sm:left-2 md:left-4 lg:left-6 xl:left-10 sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner1;
