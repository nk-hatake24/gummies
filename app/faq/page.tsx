import { Metadata } from "next"
import { FAQPageContent } from "@/components/faq/faq"
import PageWrapper  from "@/components/shared/page-wrapper"
import { getFAQPageData } from "@/lib/sanity-data"

// 1. Métadonnées classiques
export const metadata: Metadata = {
  title: "FAQ - Wholesale Center | Your Brand Name",
  description: "Find answers about wholesale orders, crypto payments, shipping, and authenticity guarantees.",
}

export default async function FAQPage() {
  const categories = await getFAQPageData()
  // 2. Génération dynamique du schéma JSON-LD pour Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categories.flatMap((cat) => cat.items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    }))),
  }

  return (
    <>
      {/* 3. Injection du script pour les moteurs de recherche */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <PageWrapper>
       
        <FAQPageContent categories={categories} />
       
        
        {/* Tu peux ajouter d'autres sections ici, comme le Contact Form */}
      </PageWrapper>
    </>
  )
}