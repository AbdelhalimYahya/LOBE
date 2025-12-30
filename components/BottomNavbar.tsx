"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const BottomNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", key: "home", label: "الرئيسية", icon: "House", iconCategory: "maps" as const },
    { href: "/products", key: "products", label: "المنتجات", icon: "ShoppingBag", iconCategory: "commerce" as const },
    { href: "/favorites", key: "favorites", label: "المفضلة", icon: "Heart", iconCategory: "games" as const },
    { href: "/account", key: "account", label: "الحساب", icon: "User", iconCategory: "people" as const },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden sticky bottom-0 left-0 right-0 bg-natural-white border-t border-natural-light-border">
      <div className="flex items-center justify-between h-[90px] px-6">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`flex flex-col items-center gap-1 min-w-[50px] ${
              isActive(item.href)
                ? "text-brand-primary"
                : "text-natural-input-hint"
            } hover:text-brand-primary transition-all`}
          >
            <Icon
              name={item.icon}
              size={24}
              category={item.iconCategory}
            />
            <span className="text-xs font-normal">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
