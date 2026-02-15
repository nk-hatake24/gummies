// app/page.tsx
import { Metadata } from "next";

import { Hero, BulkIntroSection } from "@/components/home/index" // Import the updated components
import { WholesaleCTA } from "@/components/home/wholesale-cta"
// ... other imports ...
import { getHomePageData, getAllCategories, getFeaturedFAQs } from "@/lib/sanity-data"; // The function from Step 1
import { urlFor } from "@/sanity/lib/image"; // Assuming you have this helper
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/feature-product/index";
import { WhyChooseUS } from "@/components/home/whyChooseUS";
import { HowToOrderSection } from "@/components/home/DiscountSection";
import { TrustSection } from "@/components/home/trust-section";
import { FAQSection } from "@/components/faq/faq-section"
import { CryptoGuide } from "@/components/home/crypto-guide";
import  PageWrapper  from "@/components/shared/page-wrapper";
import { AuthoritySection } from "@/components/home/authority-etc";

// --- 1. SEO OPTIMIZATION ---
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData()
  const seo = data?.seo

  const title =
    seo?.metaTitle ||
    "Bulk Vape Wholesale USA – Disposable, THC & CBD Vapes"

  const description =
    seo?.metaDescription ||
    "Buy disposable, THC & CBD vapes in bulk at wholesale prices. Fast USA shipping. Pay with crypto."

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
      siteName: "BULK VAPES",
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
  // SINGLE FETCH: This runs on the server, once.
  const data = await getHomePageData();
  const categories = await getAllCategories();

  // Safety: Create empty objects if data is missing to prevent crashes
  const heroData = data?.heroSection || {};
  const bulkData = data?.bulkSection || {};
  const wholesaleData = data?.wholesaleSection || { minimumOrder: "Contact us" };
   const featuredFaqs = await getFeaturedFAQs();
  return (
    <PageWrapper>
      
      <main className="min-h-screen">
        
        {/* Pass data down as props */}
        <Hero data={heroData} />
        <BulkIntroSection data={bulkData} />
        
        
        <CategoryShowcase categories={categories} />
        
        <AuthoritySection />
        <FeaturedProducts />
        <WhyChooseUS/>
        <HowToOrderSection />
        
        {/* Pass the new wholesale string */}
        <WholesaleCTA minimumOrder={wholesaleData.minimumOrder} />
        
        <TrustSection testimonials={data?.testimonials || []} />
        <FAQSection data={featuredFaqs} />
        <CryptoGuide/>
        
      </main>
      
    </PageWrapper>
  )
}