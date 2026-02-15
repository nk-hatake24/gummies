// app/wholesale/page.tsx
import PageWrapper from "@/components/shared/page-wrapper"
import WholesaleContent from "./page.client"
import { getWholesalePageData } from "@/lib/sanity-wholesalepage"
import type { Metadata } from "next"  

export const metadata: Metadata = {
  title: "Vape Wholesale USA | Bulk Vape Distributor | BULK VAPES",
  description:
    "Leading vape wholesale distributor in the USA. Bulk pricing, low MOQ, fast shipping, and long-term supply solutions for retailers and commercial buyers.",

  alternates: {
    canonical: "/wholesale",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Vape Wholesale USA | BULK VAPES Distributor",
    description:
      "Bulk vape supply for retailers. Competitive pricing, reliable fulfillment, and scalable wholesale solutions.",
    url: "/wholesale",
    siteName: "BULK VAPES",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vape Wholesale USA | BULK VAPES",
    description:
      "Wholesale vape distributor offering bulk pricing and commercial supply solutions.",
  },
}

export default async function WholesalePage() {
  <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  name: "BULK VAPES",
  url: "https://bulkvapes.us/wholesale",
  description:
    "Wholesale vape distributor serving retailers and commercial buyers across the USA.",
  areaServed: "US",
  makesOffer: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD"
  }
})}
</script>

  // Récupération des données depuis Sanity (Page + FAQ)
  const wholesaleData = await getWholesalePageData()

  return (
    <PageWrapper>
       {/* On passe toutes les données au composant Client */}
       <WholesaleContent data={wholesaleData} />
    </PageWrapper>
  )
}