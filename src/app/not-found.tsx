"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  const { locale } = useTranslation();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-brand mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">
            {isAr ? "الصفحة غير موجودة" : "Page not found"}
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            {isAr
              ? "الصفحة اللي بتدور عليها مش موجودة أو تم نقلها."
              : "The page you’re looking for doesn’t exist or has been moved."}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-bg font-medium transition-colors"
          >
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
