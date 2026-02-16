// app/wholesale/page.tsx
import type { Metadata } from "next"
import Script from "next/script"
import PageWrapper from "@/components/shared/page-wrapper"
import WholesaleContent from "./page.client"
import { getWholesalePageData } from "@/lib/sanity-wholesalepage"

export const metadata: Metadata = {
  title: "Gummies Wholesale USA | Bulk THC & CBD Gummies Distributor | GUMMIESSHOP",
  description:
    "Wholesale gummies distributor in the USA. Bulk pricing, low MOQ, fast fulfillment, and reliable supply for retailers and commercial buyers.",

  alternates: {
    canonical: "/wholesale",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Gummies Wholesale USA | GUMMIESSHOP Distributor",
    description:
      "Bulk THC & CBD gummies supply for retailers. Competitive pricing, reliable fulfillment, and scalable wholesale solutions.",
    url: "/wholesale",
    siteName: "GUMMIESSHOP",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gummies Wholesale USA | GUMMIESSHOP",
    description:
      "Wholesale gummies distributor offering bulk pricing and commercial supply solutions.",
  },
}

export default async function WholesalePage() {
  // Fetch from Sanity (page + FAQ etc.)
  const wholesaleData = await getWholesalePageData()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gummiesshop.us"
  const pageUrl = `${siteUrl.replace(/\/$/, "")}/wholesale`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "GUMMIESSHOP",
    url: pageUrl,
    description:
      "Wholesale gummies distributor serving retailers and commercial buyers across the USA.",
    areaServed: "US",
    makesOffer: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  }

  return (
    <PageWrapper>
      <Script
        id="wholesale-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Pass all data to client component */}
      <WholesaleContent data={wholesaleData} />
    </PageWrapper>
  )
}