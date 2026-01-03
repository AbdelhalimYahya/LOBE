"use client";

import React from "react";
import Link from "next/link";
import { MainNavbar } from "@/components";
import BottomNavbar from "@/components/BottomNavbar";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-natural-white" dir="rtl">
            {/* Mobile Header */}
            <header className="flex md:hidden w-full items-center justify-center px-4 sm:px-6 pt-8 pb-0 flex-shrink-0">
                <div className="w-full max-w-[358px] relative flex items-center justify-center h-16">
                    <h1 className="text-xl font-medium text-natural-primary-text">عذراً</h1>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="absolute right-0 flex h-fit w-fit items-center justify-center text-brand-primary opacity-90 hover:opacity-100 transition-all"
                        aria-label="العودة"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Desktop Navbar */}
            <MainNavbar isLoggedIn={true} />

            {/* Content */}
            <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
                <div className="w-full max-w-md mx-auto text-center space-y-6">
                    <div className="w-24 h-24 mx-auto bg-[#FFF5FB] rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">✨</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-natural-primary-text">
                        سيتوفر المنتج قريباً
                    </h1>

                    <p className="text-natural-helper-text text-base md:text-lg leading-relaxed">
                        نعمل حالياً على توفير رابط الشراء لهذا المنتج. يرجى التحقق مرة أخرى في وقت لاحق.
                    </p>

                    <button
                        onClick={() => router.back()}
                        className="mt-8 px-8 py-3 bg-brand-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                        العودة للمنتج
                    </button>
                </div>
            </main>

            <BottomNavbar />
        </div>
    );
}
