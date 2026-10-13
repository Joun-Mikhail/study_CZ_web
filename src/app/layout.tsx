import type { Metadata } from "next";
import { Public_Sans, Zen_Antique, Lalezar, IBM_Plex_Sans_Arabic } from "next/font/google";
import { TranslationProvider } from "@/i18n/context";
import Umami from "@/components/umami";
import { MotionProvider } from "@/components/motion-provider";
import { OfferExpiryGuard } from "@/components/launch-offer";
import { HreflangDefault } from "@/components/hreflang-default";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MotionFallback } from "@/components/motion-fallback";
import { ToastProvider } from "@/components/ui/toast";
import { CursorGlow } from "@/components/cursor-glow";
import { BackToTop } from "@/components/back-to-top";
import { FOUNDER_NAME } from "@/config/contact";
import "./globals.css";

// Text and interface.
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// English display face for headings (one weight). SIL Open Font License.
const zenAntique = Zen_Antique({
  variable: "--font-zen-antique",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Arabic display face for headings (one weight). SIL Open Font License.
// Not preloaded, so English pages don't download it.
const lalezar = Lalezar({
  variable: "--font-lalezar",
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

// Arabic pages. Not preloaded, so English pages don't download it.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
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
    <html lang="en" dir="ltr" className={`${publicSans.variable} ${zenAntique.variable} ${lalezar.variable} ${plexArabic.variable} antialiased`} suppressHydrationWarning>
      <head>
        <HreflangDefault />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(/^\\/ar(\\/|$)/.test(location.pathname)){document.documentElement.lang="ar";document.documentElement.dir="rtl"}}catch(e){}})()` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){}})()` }} />
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
      <body className="min-h-screen bg-bg text-text-primary">
        <a href="#main-content" className="sr-only top-0 start-0 focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand focus:text-bg focus:text-sm focus:font-semibold">
          Skip to content
        </a>
        <MotionProvider>
        <TranslationProvider>
          <ToastProvider>
            {children}
            <WhatsAppFloat />
            <BackToTop />
            <CursorGlow />
            <MotionFallback />
            <OfferExpiryGuard />
          </ToastProvider>
        </TranslationProvider>
        </MotionProvider>
        <Umami />
      </body>
    </html>
  );
}
