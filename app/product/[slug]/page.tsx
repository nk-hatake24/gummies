// app/product/[slug]/page.tsx

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import PageWrapper from "@/components/shared/page-wrapper"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { getFeaturedFAQs, getProductBySlug, getSiteConfig } from "@/lib/sanity-data"
import { urlFor } from "@/sanity/lib/image"

// Components
import { ProductMainSection } from "@/components/product/product-main-section"
import { ProductSpecs } from "@/components/product/product-specs"
import { ProductComparison } from "@/components/product/Product-comparison"
import { RelatedProducts } from "@/components/product/related-products"
import { ProductBottomCta } from "@/components/product/product-bittom-cta"
import { ProductMoq } from "@/components/product/product-moq"
import { ProductFAQ } from "@/components/product/product-faq"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const productSlug =
    typeof product.slug === "string"
      ? product.slug
      : product.slug?.current || slug

  const mainImage =
    product.images?.[0] ? urlFor(product.images[0]).width(1200).height(630).url() : "/og-image.jpg"

  const title = `${product.name} | Buy Gummies Online | GUMMIESSHOP`
  const description =
    product.shortDescription ||
    `Shop ${product.name} with retail and wholesale options. Fast U.S. shipping on eligible orders.`

  return {
    title,
    description,
    alternates: { canonical: `/product/${productSlug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      images: [mainImage],
      url: `/product/${productSlug}`,
      siteName: "GUMMIESSHOP",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [mainImage],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const [product, { siteConfig }] = await Promise.all([getProductBySlug(slug), getSiteConfig()])
  const featuredFaqs = await getFeaturedFAQs()

  if (!product) notFound()

  const productSlug =
    typeof product.slug === "string" ? product.slug : product.slug?.current || slug

  // Safe offers computation
  const prices =
    Array.isArray(product.variants) && product.variants.length > 0
      ? product.variants
          .map((v: any) => Number(v?.price))
          .filter((n: number) => Number.isFinite(n) && n >= 0)
      : []

  const lowPrice = prices.length ? Math.min(...prices) : undefined
  const highPrice = prices.length ? Math.max(...prices) : undefined

  const productSchema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img: any) => urlFor(img).url()),
    description: product.description || product.shortDescription || "",
    brand: { "@type": "Brand", name: "GUMMIESSHOP" },
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://gummiesshop.us"}/product/${productSlug}`,
  }

  if (prices.length) {
    productSchema.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice,
      highPrice,
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
    }
  }

  return (
    <PageWrapper>
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-6 lg:px-12 mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name, href: `/product/${productSlug}` },
            ]}
          />
        </div>

        <section className="container mx-auto px-6 lg:px-12 mb-20">
          <ProductMainSection product={product} discounts={siteConfig.crypto.discountPercent} />
        </section>

        {product.specs && (
          <section className="container mx-auto px-6 lg:px-12 mb-20">
            <ProductSpecs product={product} />
          </section>
        )}

        {product.comparison && (
          <section className="container mx-auto px-6 lg:px-12 mb-20">
            <ProductComparison productName={product.name} data={product.comparison} />
          </section>
        )}

        {product.moqSection && (
          <section className="container mx-auto px-6 lg:px-12 mb-20">
            <ProductMoq data={product.moqSection} />
          </section>
        )}

        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="container mx-auto px-6 lg:px-12 mb-20">
            <RelatedProducts products={product.relatedProducts} />
          </section>
        )}

        {product.faq && product.faq.length > 0 && <ProductFAQ items={product.faq} />}

        <ProductBottomCta productName={product.name} />
      </div>
    </PageWrapper>
  )
}