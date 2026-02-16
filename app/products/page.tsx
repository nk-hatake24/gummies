import type { Metadata } from "next"
import PageWrapper from "@/components/shared/page-wrapper"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { FAQSection } from "@/components/faq/faq-section"
import { getAllProducts, getAllCategories, getFeaturedFAQs } from "@/lib/sanity-data"

export const metadata: Metadata = {
  title: "Shop THC & CBD Gummies | Retail & Wholesale Products | GUMMIESSHOP",
  description:
    "Browse our full catalog of THC & CBD gummies for retail and wholesale buyers. Curated selection, bulk pricing options, and fast U.S. fulfillment on eligible orders.",

  alternates: {
    canonical: "/products",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Shop THC & CBD Gummies | GUMMIESSHOP",
    description:
      "Explore gummies for retail and wholesale buyers — curated categories, bulk options, and reliable fulfillment across eligible U.S. destinations.",
    url: "/products",
    siteName: "GUMMIESSHOP",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop THC & CBD Gummies | GUMMIESSHOP",
    description:
      "Browse THC & CBD gummies for retail and wholesale. Bulk pricing options available.",
  },
}

// Optional (cache)
export const revalidate = 3600 // 1 hour

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()])
  const featuredFaqs = await getFeaturedFAQs()

  return (
    <PageWrapper>
      <div className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-secondary/30">
          <div className="max-w-[1400px] mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
              ]}
            />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-6">
              All Gummies
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Discover our curated selection of gummies for retail and wholesale — with clear product details,
              category filters, and bulk-friendly options.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-64 flex-shrink-0">
                <ProductFilters categories={categories} />
              </aside>

              <div className="flex-1">
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