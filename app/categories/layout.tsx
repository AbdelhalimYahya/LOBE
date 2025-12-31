import { Suspense } from "react";
import type { ReactNode } from "react";

export default function CategoriesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

