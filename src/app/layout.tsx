import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { TranslationProvider } from "@/i18n/context";
import Analytics from "@/components/analytics";
import Clarity from "@/components/clarity";
import Umami from "@/components/umami";
import { MotionProvider } from "@/components/motion-provider";
import { OfferExpiryGuard } from "@/components/launch-offer";
import { HreflangDefault } from "@/components/hreflang-default";
import { QuickNav } from "@/components/ui/quick-nav";
import { MotionFallback } from "@/components/motion-fallback";
import { ToastProvider } from "@/components/ui/toast";
import { FOUNDER_NAME } from "@/config/contact";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

export const metadata: Metadata = {
  title: {
    default: "Study Czechia: Study in Czechia Without an Agency",
    template: "%s | Study Czechia",
  },
  description:
    "Free guides, university matching, and cost-of-living tools from a student who lives in Czechia. Personal services: document review, embassy interview prep, and full application support for Arabic-speaking students.",
  authors: [{ name: "Study Czechia" }],
  openGraph: {
    siteName: "Study Czechia",
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Study Czechia" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  alternates: {},
  robots: process.env.CONTEXT === "production" || !process.env.CONTEXT
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${jakarta.variable} ${tajawal.variable} antialiased`} suppressHydrationWarning>
      <head>
        <HreflangDefault />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(/^\\/ar(\\/|$)/.test(location.pathname)){document.documentElement.lang="ar";document.documentElement.dir="rtl"}}catch(e){}})()` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.dataset.theme=t}else if(window.matchMedia&&window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.dataset.theme="light"}}catch(e){}})()` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Study Czechia",
                alternateName: "studyczechia",
                url: SITE_URL,
                potentialAction: {
                  "@type": "SearchAction",
                  target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search/?q={search_term_string}` },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: FOUNDER_NAME,
                jobTitle: "Founder",
                worksFor: { "@type": "Organization", name: "Study Czechia", url: SITE_URL },
                alumniOf: { "@type": "CollegeOrUniversity", name: "Brno University of Technology" },
                knowsLanguage: ["ar", "en", "cs"],
                sameAs: ["https://www.facebook.com/groups/czechiastudents"],
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-screen bg-midnight text-text-primary">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-amber focus:text-white focus:text-sm focus:font-medium">
          Skip to content
        </a>
        <MotionProvider>
        <TranslationProvider>
          <ToastProvider>
            {children}
            <QuickNav />
            <MotionFallback />
            <OfferExpiryGuard />
          </ToastProvider>
        </TranslationProvider>
        </MotionProvider>
        <Umami />
        <Analytics />
        <Clarity />
      </body>
    </html>
  );
}
