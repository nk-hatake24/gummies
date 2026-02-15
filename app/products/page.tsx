import type { Metadata } from "next"
import PageWrapper  from "@/components/shared/page-wrapper"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { FAQSection } from "@/components/faq/faq-section"
// Import des fetchers Sanity
import { getAllProducts, getAllCategories, getFeaturedFAQs } from "@/lib/sanity-data"



export const metadata: Metadata = {
  title: "Wholesale Vape Products | Buy Disposable Vapes in Bulk | BULK VAPES",
  description:
    "Browse our full catalog of wholesale vape products including disposable vapes, nicotine, THC & CBD vapes. Bulk pricing available for retailers.",

  alternates: {
    canonical: "/products",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Wholesale Vape Products | BULK VAPES",
    description:
      "Bulk disposable vapes, nicotine, THC & CBD products for wholesale buyers.",
    url: "/products",
    siteName: "BULK VAPES",
  },

  twitter: {
    card: "summary_large_image",
    title: "Wholesale Vape Products | BULK VAPES",
    description:
      "Buy disposable vapes in bulk. Wholesale pricing for retailers.",
  },
}

// Pour forcer la régénération dynamique si nécessaire (optionnel selon config cache)
export const revalidate = 3600; // 1 heure

export default async function ProductsPage() {
  // 1. Fetch en parallèle (Performance critique)
  // On ne veut pas attendre les produits pour lancer la requête catégories
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories()
  ]);

   const featuredFaqs = await getFeaturedFAQs()
  return (
    <PageWrapper>
      <div className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-secondary/30">
          <div className="max-w-[1400px] mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
              ]}
            />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-6">All Products</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Discover our curated selection of premium products for retail and wholesale.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-64 flex-shrink-0">
                {/* 2. On passe les catégories dynamiques (Sanity) */}
                <ProductFilters categories={categories} />
              </aside>

              <div className="flex-1">
                {/* 3. On passe les produits dynamiques (Sanity) */}
                <ProductsGrid initialProducts={products} />
              </div>
            </div>
          </div>
        </section>
        <FAQSection data={featuredFaqs} />
      </div>
    </PageWrapper>
  )
}