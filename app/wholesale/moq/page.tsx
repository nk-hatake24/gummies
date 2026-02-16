// app/wholesale/moq/page.tsx  (ou app/wholesale/moq/page.tsx selon ton routing)
import type { Metadata } from "next"
import Script from "next/script"
import PageWrapper from "@/components/shared/page-wrapper"
import { MoqPageContent } from "@/components/wholesale/moq-content"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Wholesale MOQ Requirements | Minimum Order Quantity | GUMMIESSHOP",
  description:
    "Learn about our $500 Minimum Order Quantity (MOQ) for wholesale gummies. Mix and match eligible products to meet the minimum order value.",
  alternates: {
    canonical: "/wholesale/moq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Wholesale MOQ Requirements | GUMMIESSHOP",
    description:
      "Wholesale pricing requires a $500 minimum order. See how minimums work and how to mix eligible products to meet MOQ.",
    type: "website",
    url: "/wholesale/moq",
    siteName: "GUMMIESSHOP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale MOQ Requirements | GUMMIESSHOP",
    description:
      "Wholesale gummies pricing requires a $500 minimum order. Learn how MOQ works for wholesale accounts.",
  },
}

export default function MoqPage() {
  const siteUrl = siteConfig.url || process.env.NEXT_PUBLIC_SITE_URL || "https://gummiesshop.us"
  const pageUrl = `${siteUrl.replace(/\/$/, "")}/wholesale/moq`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Wholesale MOQ Requirements",
    description: "Details regarding minimum order quantities for wholesale accounts.",
    url: pageUrl,
    mainEntity: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Wholesale Gummies Distribution",
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "500.00",
        priceCurrency: "USD",
        minPrice: "500.00",
        description: "Minimum order value required to access wholesale pricing.",
      },
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name || "GUMMIESSHOP",
      url: siteUrl,
    },
  }

  return (
    <PageWrapper>
      <Script
        id="moq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MoqPageContent />
    </PageWrapper>
  )
}