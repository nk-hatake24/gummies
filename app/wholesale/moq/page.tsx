import type { Metadata } from "next"
import { MoqPageContent } from "@/components/wholesale/moq-content"
import { siteConfig } from "@/config/site.config"
import  PageWrapper  from "@/components/shared/page-wrapper"

// 1. SEO Metadata Optimisée
export const metadata: Metadata = {
  title: "Wholesale MOQ Requirements | Minimum Order Quantity",
  description: "Learn about our $500 Minimum Order Quantity (MOQ) for wholesale vape products. Mix and match disposables, e-liquids, and hardware.",
  openGraph: {
    title: "Wholesale MOQ Requirements | BULK VAPES",
    description: "Wholesale pricing requires a $500 minimum order. Find out details on product-specific minimums for disposables and e-liquids.",
    type: "website",
  },
}

export default function MoqPage() {
  
  // 2. SEO Schema.org (JSON-LD)
  // Cela explique aux moteurs de recherche qu'il s'agit d'une page de conditions commerciales
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wholesale MOQ Requirements",
    "description": "Details regarding minimum order quantities for wholesale accounts.",
    "mainEntity": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Wholesale Distribution"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "500.00",
        "priceCurrency": "USD",
        "minPrice": "500.00",
        "description": "Minimum order value required to access wholesale pricing."
      }
    },
    "provider": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <PageWrapper
      
      
      >
        <MoqPageContent />
      </PageWrapper>
    </>
  )
}