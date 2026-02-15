// app/layout.tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/sonner"
import { Analytics as CustomAnalytics } from "@/components/shared/analytics"
import { Suspense } from "react" // <--- IMPORT IMPORTANT
import "./globals.css"
import { getSiteConfig } from "@/lib/sanity-data"
import { urlFor } from "@/sanity/lib/image"

// --- GESTION DES FONTS ---
// Si ça plante encore, met tout ce bloc en commentaire pour tester
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false, // Parfois utile pour éviter les erreurs de download
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: false,
})
// -------------------------

export const metadata: Metadata = {
  title: {
    default: "Bulk Vape Wholesale USA – Disposable, THC & CBD Vapes",
    template: "%s | Bulk Vapes Wholesale USA | Buy Disposable Vapes in Bulk & Pay with Crypto",
  },
  description: "Buy wholesale disposable vapes, nicotine, THC & CBD vapes in bulk. Fast shipping across the USA. Pay with crypto.",
  keywords: ["bulk vapes", "bulk disposable vapes", "buy vapes in bulk", "bulk vapes for sale", "cheap bulk vapes", "vape", "wholesale vapes", "bulk vapes", "e-cigarettes", "vaporizers", "e-liquid", "vape shop"],
  authors: [{ name: "BULK VAPES" }],
  creator: "BULK VAPES",
  publisher: "BULK VAPES",
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
  siteName: "BULK VAPES",
  title: "Bulk Vape Wholesale USA",
  description: "Buy disposable, THC & CBD vapes in bulk. Fast USA shipping.",
  images: [
    {
      url: "/uwell-caliburn-g3-pod-system-premium.jpg",
      width: 1200,
      height: 630,
      alt: "Bulk Vapes Wholesale USA",
    },
  ],
},
  twitter: {
    card: "summary_large_image",
    title: "Bulk Vapes Wholesale USA | Buy Disposable Vapes in Bulk & Pay with Crypto",
    description: "Premium vape products for retail and wholesale USA.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}


// export async function generateMetadata(): Promise<Metadata> {
//   const config = await getSiteConfig()
//   const seo = config.seo || {}

//   const titleTemplate = `%s | ${config.name || "Bulk Vapes"}`
//   const defaultTitle = seo.metaTitle || `${config.name} | ${config.tagline}`

//   return {
//     title: {
//       default: defaultTitle,
//       template: titleTemplate,
//     },
//     description: seo.metaDescription || config.description,
//     keywords: ["vape", "wholesale vapes", "bulk vapes", "e-cigarettes", "vaporizers", "e-liquid", "vape shop"],
//     authors: [{ name: config.name }],
//     openGraph: {
//       type: "website",
//       locale: "en_US",
//       url: config.url,
//       siteName: config.name,
//       title: defaultTitle,
//       description: seo.metaDescription,
//       images: seo.ogImage ? [urlFor(seo.ogImage).url()] : [],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: defaultTitle,
//       description: seo.metaDescription,
//     },
//   }
// }



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

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
    <script id="chatway" async={true} src={`https://cdn.chatway.app/widget.js?id=${process.env.NEXT_PUBLIC_CHATWAY_ID}`}></script>
    <head>
        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
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
        {/* On enveloppe CartProvider dans Suspense car il utilise peut-être useSearchParams */}
        <Suspense fallback={null}>
            <CartProvider>
            {children}
            <Toaster position="bottom-right" />
            </CartProvider>
        </Suspense>

        {/* CustomAnalytics utilise surement useSearchParams, donc Suspense OBLIGATOIRE ici */}
        <Suspense fallback={null}>
            <CustomAnalytics />
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}