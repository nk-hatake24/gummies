import type { Metadata } from "next"
import Script from "next/script"
import { FAQPageContent } from "@/components/faq/faq"
import PageWrapper from "@/components/shared/page-wrapper"
import { getFAQPageData } from "@/lib/sanity-data"

export const metadata: Metadata = {
  title: "FAQ | GUMMIESSHOP Help Center",
  description:
    "Find answers about gummies orders, wholesale inquiries, shipping, payments (including crypto where available), and general store policies.",
  alternates: {
    canonical: "/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "FAQ | GUMMIESSHOP Help Center",
    description:
      "Answers about gummies orders, wholesale inquiries, shipping, payments, and general store policies.",
    url: "/faq",
    siteName: "GUMMIESSHOP",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | GUMMIESSHOP Help Center",
    description:
      "Answers about gummies orders, wholesale inquiries, shipping, payments, and general store policies.",
  },
}

export default async function FAQPage() {
  const categories = await getFAQPageData()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat: any) =>
      (cat.items || []).map((item: any) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  }

  return (
    <PageWrapper>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FAQPageContent categories={categories} />
      {/* Optional: add contact form / CTA here */}
    </PageWrapper>
  )
}