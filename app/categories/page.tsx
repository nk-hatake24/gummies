// app/categories/page.tsx
import type { Metadata } from "next"
import { CategoriesGrid } from "@/components/categories/catergories-grid"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import  PageWrapper  from "@/components/shared/page-wrapper"
import { CategoryComparison } from "@/components/categories/CategoriesComparison"
import { getAllCategories, getComparisonTable, getSiteConfig } from "@/lib/sanity-data" // On réutilise ton fetcher optimisé
import Script from "next/script"

// ==========================================
// 1. GÉNÉRATION DES MÉTADONNÉES (Serveur)
// ==========================================
export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getSiteConfig()
  const siteName = siteConfig?.name || "BULK VAPES"
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  return {
    title: "Wholesale Vape Categories | Bulk Disposable, THC & CBD Vapes",
    description:
      "Browse wholesale vape categories including disposable vapes, nicotine, THC, CBD & THCA products. Bulk supply for retailers and distributors.",

    alternates: {
      canonical: `${baseUrl}/categories`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      url: `${baseUrl}/categories`,
      title: "Wholesale Vape Categories | Bulk Disposable, THC & CBD Vapes",
      description:
        "Explore bulk vape categories for wholesale buyers and distributors.",
      siteName,
    },

    twitter: {
      card: "summary_large_image",
      title: "Wholesale Vape Categories | BULK VAPES",
      description:
        "Bulk disposable, THC & CBD vape categories for wholesale buyers.",
    },
  }
}

export default async function CategoriesPage() {
  // 1. FETCH DES DONNÉES SANITY
   const [categories, comparisonData] = await Promise.all([
    getAllCategories(),
    getComparisonTable()
  ]);
  

  // 2. SCHEMA JSON-LD DYNAMIQUE (SEO CRITIQUE)
  // On map les vraies catégories Sanity dans le schema Google
  const itemListElement = categories.map((cat: any, index: number) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/category/${cat.slug}`,
    "name": cat.name
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Categories",
    "description": "Directory of all vape product categories available for wholesale.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/categories`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${process.env.NEXT_PUBLIC_SITE_URL}` },
        { "@type": "ListItem", "position": 2, "name": "Categories", "item": `${process.env.NEXT_PUBLIC_SITE_URL}/categories` }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": itemListElement // <--- C'est ici que c'est dynamique maintenant
    }
  }

  return (
    <PageWrapper>
      <Script
        id="categories-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="min-h-screen bg-background pt-24 pb-12 px-6 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
          ]}
        />
        
        {/* Tu devras modifier CategoriesGrid pour accepter "categories={categories}" comme prop, 
            exactement comme on a fait pour CategoryShowcase */}
        <CategoriesGrid categories={categories} /> 
     
      </section>
      <CategoryComparison data={comparisonData} />
    </PageWrapper>
  )
}