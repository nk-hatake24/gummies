// app/layout.tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/sonner"
import { Analytics as CustomAnalytics } from "@/components/shared/analytics"
import { Suspense } from "react"
import "./globals.css"

// --- FONTS ---
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    default: "GUMMIESSHOP — Buy THC & CBD Gummies Online",
    template: "%s | GUMMIESSHOP",
  },
  description:
    "Shop THC & CBD gummies online with fast U.S. shipping, secure checkout, and wholesale pricing options. Pay with crypto where available.",
  keywords: [
    "thc gummies",
    "buy thc gummies",
    "thc gummies online",
    "cbd gummies",
    "delta 9 gummies",
    "hemp derived thc gummies",
    "gummies shop",
    "buy gummies online",
    "wholesale gummies",
    "bulk gummies",
  ],
  authors: [{ name: "GUMMIESSHOP" }],
  creator: "GUMMIESSHOP",
  publisher: "GUMMIESSHOP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "GUMMIESSHOP",
    title: "GUMMIESSHOP — Buy THC & CBD Gummies Online",
    description:
      "Shop THC & CBD gummies online with fast U.S. shipping, secure checkout, and wholesale pricing options.",
    images: [
      {
        url: "/og-image.jpg", // replace with your real OG image in /public
        width: 1200,
        height: 630,
        alt: "GUMMIESSHOP — Buy THC & CBD Gummies Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GUMMIESSHOP — Buy THC & CBD Gummies Online",
    description:
      "Shop THC & CBD gummies online with fast U.S. shipping, secure checkout, and wholesale pricing options.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const chatwayId = process.env.NEXT_PUBLIC_CHATWAY_ID

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Chatway (put in <head> properly) */}
        {chatwayId && (
          <Script
            id="chatway"
            src={`https://cdn.chatway.app/widget.js?id=${chatwayId}`}
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>

      <body className="font-sans antialiased">
        {/* CartProvider inside Suspense (useSearchParams safe) */}
        <Suspense fallback={null}>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" />
          </CartProvider>
        </Suspense>

        {/* CustomAnalytics inside Suspense */}
        <Suspense fallback={null}>
          <CustomAnalytics />
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}