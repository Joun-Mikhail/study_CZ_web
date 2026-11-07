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
import { CONTACT_EMAIL, FACEBOOK_GROUP_URL, FOUNDER_NAME } from "@/config/contact";
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

// Search Console / Bing Webmaster ownership tags. Optional: set them in
// Netlify's environment variables (they are public tokens, not secrets).
// Verifying through a DNS TXT record works too and needs neither.
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

// One Organization node that the WebSite and the founder both point to, so
// search engines connect the brand name, logo and community into one entity.
const ORG_ID = `${SITE_URL}/#organization`;

export const metadata: Metadata = {
  title: {
    default: "Study in Czechia | Free Universities, Deadlines & Eligibility",
    template: "%s | Study Czechia",
  },
  description:
    "Your complete guide to study in Czech Republic. Explore free programs in Czechia, Charles University, VUT, CTU, and Mendel University. Check deadlines, costs, and eligibility.",
  authors: [{ name: "Study Czechia" }],
  openGraph: {
    siteName: "Study Czechia",
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_URL}/og-cover.jpg`, width: 1200, height: 630, alt: "Study Czechia: your path to studying in the Czech Republic" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og-cover.jpg`],
  },
  icons: {
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: {},
  robots: process.env.CONTEXT === "production" || !process.env.CONTEXT
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false },
  metadataBase: new URL(SITE_URL),
  ...(GOOGLE_VERIFICATION || BING_VERIFICATION
    ? {
        verification: {
          ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
          ...(BING_VERIFICATION ? { other: { "msvalidate.01": BING_VERIFICATION } } : {}),
        },
      }
    : {}),
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
                "@type": "Organization",
                "@id": ORG_ID,
                name: "Study Czechia",
                alternateName: "studyczechia",
                url: `${SITE_URL}/`,
                // The Study Czechia logo (same image as the favicon and app icons).
                logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
                email: CONTACT_EMAIL,
                description:
                  "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
                // Same wording as the footer: the name is close to the official programme's.
                disambiguatingDescription:
                  "Independent, student-run guide. Not affiliated with any Czech embassy, university, or the official Study in Czechia programme (studyin.cz).",
                areaServed: { "@type": "Country", name: "Czech Republic" },
                knowsLanguage: ["en", "ar"],
                // The community the footer links to.
                sameAs: [FACEBOOK_GROUP_URL],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Study Czechia",
                alternateName: "studyczechia",
                url: `${SITE_URL}/`,
                inLanguage: ["en", "ar"],
                publisher: { "@id": ORG_ID },
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
                worksFor: { "@id": ORG_ID },
                alumniOf: { "@type": "CollegeOrUniversity", name: "Brno University of Technology" },
                knowsLanguage: ["ar", "en", "cs"],
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
