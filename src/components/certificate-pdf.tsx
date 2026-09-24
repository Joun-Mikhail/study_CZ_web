"use client";

import type { Certificate } from "@/data/certificates";
import { TRADE_LICENCE_NUMBER } from "@/data/certificates";

const DISCLAIMER = {
  en: "This is a completion certificate, not an official qualification and not a language certificate.",
  ar: "شهادة إتمام دورة — ليست مؤهلاً رسمياً ولا شهادة لغة معتمدة.",
} as const;

export function CertificatePDF({
  cert,
  locale,
}: {
  cert: Certificate;
  locale: "en" | "ar";
}) {
  return (
    <div
      className="w-[794px] min-h-[1123px] mx-auto bg-white text-midnight p-16 flex flex-col"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-[#11457e]">Study</span>{" "}
          <span className="text-[#d42127]">Czechia</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {locale === "ar"
            ? "شهادة إتمام الكورس"
            : "Certificate of Completion"}
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-gray-500 mb-2">
          {locale === "ar" ? "نشهد بأن" : "This certifies that"}
        </p>
        <p className="text-2xl font-bold mb-6">{cert.studentName}</p>

        <p className="text-sm text-gray-500 mb-2">
          {locale === "ar"
            ? "قد أتم بنجاح"
            : "has successfully completed"}
        </p>
        <p className="text-xl font-semibold mb-6">
          {cert.courseTitle[locale]}
        </p>

        <p className="text-sm text-gray-500 mb-1">
          {locale === "ar" ? "بتاريخ" : "on"}
        </p>
        <p className="text-base font-medium mb-10">{cert.completionDate}</p>

        <div className="w-48 border-t border-gray-300 pt-3">
          <p className="text-sm font-medium">{cert.issuerName}</p>
          <p className="text-xs text-gray-400">Study Czechia</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-200 text-xs text-gray-400 space-y-1">
        <p>{DISCLAIMER[locale]}</p>
        <p>
          {locale === "ar" ? "رقم الشهادة:" : "Certificate ID:"}{" "}
          {cert.uniqueId}
        </p>
        <p>
          {locale === "ar" ? "رخصة تجارية:" : "Trade Licence:"}{" "}
          {TRADE_LICENCE_NUMBER}
        </p>
        <p>
          {locale === "ar" ? "تحقق:" : "Verify:"}{" "}
          studyczechia.com/verify/{cert.uniqueId}
        </p>
      </div>
    </div>
  );
}
