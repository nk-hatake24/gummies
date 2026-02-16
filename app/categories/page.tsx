// app/categories/page.tsx
import type { Metadata } from "next"
import Script from "next/script"
import PageWrapper from "@/components/shared/page-wrapper"
import { CategoriesGrid } from "@/components/categories/catergories-grid"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { CategoryComparison } from "@/components/categories/CategoriesComparison"
import { getAllCategories, getComparisonTable, getSiteConfig } from "@/lib/sanity-data"

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getSiteConfig()
  const siteName = siteConfig?.name || "GUMMIESSHOP"
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig?.url || "https://gummiesshop.us").replace(/\/$/, "")

  const title = "Gummies Categories | THC & CBD Gummies Directory | GUMMIESSHOP"
  const description =
    "Browse gummies categories including THC & CBD gummies and related collections. Retail and wholesale options available for eligible buyers."

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/categories` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${baseUrl}/categories`,
      title,
      description,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function CategoriesPage() {
  const [categories, comparisonData] = await Promise.all([getAllCategories(), getComparisonTable()])

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://gummiesshop.us").replace(/\/$/, "")

  const itemListElement = categories
    .map((cat: any, index: number) => {
      const catSlug = typeof cat.slug === "string" ? cat.slug : cat.slug?.current
      if (!catSlug) return null
      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/category/${catSlug}`,
        name: cat.name,
      }
    })
    .filter(Boolean)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Categories",
    description: "Directory of all gummies categories available on GUMMIESSHOP.",
    url: `${baseUrl}/categories`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
        { "@type": "ListItem", position: 2, name: "Categories", item: `${baseUrl}/categories` },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement,
    },
  }

  return (
    <PageWrapper>
      <Script
        id="categories-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="min-h-screen bg-background pt-24 pb-12 px-6 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
          ]}
        />

        <CategoriesGrid categories={categories} />
      </section>

      <CategoryComparison data={comparisonData} />
    </PageWrapper>
  )
}