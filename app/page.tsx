// app/page.tsx
import { Metadata } from "next"

import { Hero, BulkIntroSection } from "@/components/home/index"
import { WholesaleCTA } from "@/components/home/wholesale-cta"
import { getHomePageData, getAllCategories, getFeaturedFAQs } from "@/lib/sanity-data"
import { urlFor } from "@/sanity/lib/image"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { FeaturedProducts } from "@/components/home/feature-product/index"
import { WhyChooseUS } from "@/components/home/whyChooseUS"
import { HowToOrderSection } from "@/components/home/DiscountSection"
import { TrustSection } from "@/components/home/trust-section"
import { FAQSection } from "@/components/faq/faq-section"
import { CryptoGuide } from "@/components/home/crypto-guide"
import PageWrapper from "@/components/shared/page-wrapper"
import { AuthoritySection } from "@/components/home/authority-etc"

// --- 1. SEO OPTIMIZATION ---
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData()
  const seo = data?.seo

  const title =
    seo?.metaTitle ||
    "GUMMIESSHOP — Buy THC & CBD Gummies Online | Retail & Wholesale"

  const description =
    seo?.metaDescription ||
    "Shop quality-selected THC & CBD gummies with fast U.S. shipping, secure checkout, and wholesale pricing options. Pay with crypto where available."

  const ogImage = seo?.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).url()
    : "/og-image.jpg"

  return {
    title,
    description,

    alternates: {
      canonical: "/",
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: "GUMMIESSHOP",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

// --- 2. PAGE COMPONENT ---
export default async function HomePage() {
  // SINGLE FETCH (server)
  const data = await getHomePageData()
  const categories = await getAllCategories()
  const featuredFaqs = await getFeaturedFAQs()

  // Safety defaults
  const heroData = data?.heroSection || {}
  const bulkData = data?.bulkSection || {}
  const wholesaleData = data?.wholesaleSection || { minimumOrder: "Contact us" }

  return (
    <PageWrapper>
      <main className="min-h-screen">
        <Hero data={heroData} />
        <BulkIntroSection data={bulkData} />

        <CategoryShowcase categories={categories} />

        <AuthoritySection />
        <FeaturedProducts />
        <WhyChooseUS />
        <HowToOrderSection />

        <WholesaleCTA minimumOrder={wholesaleData.minimumOrder} />

        <TrustSection testimonials={data?.testimonials || []} />
        <FAQSection data={featuredFaqs} />
        <CryptoGuide />
      </main>
    </PageWrapper>
  )
}