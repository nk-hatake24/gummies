import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PageWrapper from "@/components/shared/page-wrapper"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { getCategoryPageData, getAllCategories } from "@/lib/sanity-data"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

// Static params (safe for Sanity slug shapes)
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories
    .map((category: any) => ({
      slug: typeof category.slug === "string" ? category.slug : category.slug?.current,
    }))
    .filter((x: any) => Boolean(x.slug))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const { category } = await getCategoryPageData(slug)

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://gummiesshop.us").replace(/\/$/, "")

  if (!category) {
    return {
      title: "Category Not Found | GUMMIESSHOP",
      robots: { index: false, follow: false },
    }
  }

  const categorySlug =
    typeof category.slug === "string" ? category.slug : category.slug || slug

  const title =
    category.seo?.metaTitle ||
    `${category.name} Gummies | Retail & Wholesale | GUMMIESSHOP`

  const description =
    category.seo?.metaDescription ||
    `Shop ${String(category.name).toLowerCase()} gummies with retail and wholesale options. Curated selection and fast U.S. fulfillment on eligible orders.`

  const ogImage =
    category.seo && "ogImage" in category.seo && category.seo.ogImage
      ? urlFor(category.seo.ogImage).width(1200).height(630).url()
      : "/og-category.jpg"

  const canonicalUrl = `${baseUrl}/category/${categorySlug}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: "GUMMIESSHOP",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: title },
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  const [{ category, products }, allCategories] = await Promise.all([
    getCategoryPageData(slug),
    getAllCategories(),
  ])

  if (!category) notFound()

  const categorySlug =
    typeof category.slug === "string" ? category.slug : category.slug || slug

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
                { label: category.name, href: `/category/${categorySlug}` },
              ]}
            />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-6">
              {category.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {category.description}
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-64 flex-shrink-0">
                <ProductFilters
                  categories={allCategories}
                  currentCategory={categorySlug}
                />
              </aside>

              <div className="flex-1">
                <ProductsGrid initialProducts={products} />
              </div>
            </div>
          </div>
        </section>

        {/* SEO/About */}
        {category.aboutSection && (
          <section className="px-6 lg:px-12 py-16 bg-muted/20 border-t">
            <div className="max-w-[1000px] mx-auto prose dark:prose-invert">
              {category.aboutSection.title && <h2>{category.aboutSection.title}</h2>}
              <PortableText value={category.aboutSection.content || []} />
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  )
}