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

export const metadata: Metadata = {
  title: {
    default: "Study in Czechia | Your Trusted Bridge to Czech University Life",
    template: "%s | Study in Czechia",
  },
  description:
    "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
  keywords: [
    "study in czechia",
    "study abroad",
    "universities",
    "application guide",
    "cost of living",
  ],
  authors: [{ name: "Study in Czechia" }],
  openGraph: {
    title: "Study in Czechia",
    description:
      "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
    url: "https://study-in-czechia.example",
    siteName: "Study in Czechia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Study in Czechia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Czechia",
    description:
      "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${tajawal.variable} antialiased`}>
      <body className="min-h-screen bg-midnight text-text-primary">
        <TranslationProvider>
          {children}
        </TranslationProvider>
        {/* Analytics placeholder component (client) */}
        <Analytics />
      </body>
    </html>
  );
}
