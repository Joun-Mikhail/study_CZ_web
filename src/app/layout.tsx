import type { Metadata } from "next";
import { Geist, Tajawal } from "next/font/google";
import { TranslationProvider } from "@/i18n/context";
import Analytics from "@/components/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

export const metadata: Metadata = {
  title: {
    default: "Study in Czechia | Your Trusted Bridge to Czech University Life",
    template: "%s | Study in Czechia",
  },
  description:
    "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
  keywords: [
    "study in czechia",
    "study in czech republic",
    "study abroad",
    "czech universities",
    "application guide",
    "cost of living czechia",
    "scholarships czech republic",
    "arabic students czech",
  ],
  authors: [{ name: "Study in Czechia" }],
  openGraph: {
    title: "Study in Czechia — Your Trusted Bridge to Czech University Life",
    description:
      "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
    url: SITE_URL,
    siteName: "Study in Czechia",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Study in Czechia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Czechia",
    description:
      "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${tajawal.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.dataset.theme=t}else if(window.matchMedia&&window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.dataset.theme="light"}}catch(e){}})()` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Study in Czechia",
              url: SITE_URL,
              description: "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
              areaServed: { "@type": "Country", name: "Czech Republic" },
              inLanguage: ["en", "ar"],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-midnight text-text-primary">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-amber focus:text-white focus:text-sm focus:font-medium">
          Skip to content
        </a>
        <TranslationProvider>
          {children}
        </TranslationProvider>
        {/* Analytics placeholder component (client) */}
        <Analytics />
      </body>
    </html>
  );
}
