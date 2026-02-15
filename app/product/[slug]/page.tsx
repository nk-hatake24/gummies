// Product Page
// app/product/[slug]/page.tsx

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import  PageWrapper  from "@/components/shared/page-wrapper"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { getFeaturedFAQs, getProductBySlug, getSiteConfig } from "@/lib/sanity-data"
import { urlFor } from "@/sanity/lib/image"

// Components
import { ProductMainSection } from "@/components/product/product-main-section"
import { ProductSpecs } from "@/components/product/product-specs"
import { ProductComparison } from "@/components/product/Product-comparison"
import { RelatedProducts } from "@/components/product/related-products"
import { FAQSection } from "@/components/faq/faq-section"
import { ProductBottomCta } from "@/components/product/product-bittom-cta"
import { ProductMoq } from "@/components/product/product-moq"
import { ProductFAQ } from "@/components/product/product-faq"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const mainImage = product.images?.[0]
    ? urlFor(product.images[0]).url()
    : ""

  return {
    title: `${product.name} | Buy in Bulk | BULK VAPES`,
    description:
      product.shortDescription ||
      `Buy ${product.name} in bulk at wholesale prices. Fast shipping across the USA.`,

    alternates: {
      canonical: `/product/${product.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      title: `${product.name} | BULK VAPES`,
      description: product.shortDescription,
      images: [mainImage],
      url: `/product/${product.slug}`,
      siteName: "BULK VAPES",
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [mainImage],
    },
  }
}


export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  // Fetch Produit + Config Site (pour le taux de réduction crypto)
  const [product, { siteConfig }] = await Promise.all([
    getProductBySlug(slug),
    getSiteConfig()
  ]);
   const featuredFaqs = await getFeaturedFAQs()
  if (!product) notFound()

  // SEO: Product Schema (JSON-LD)
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.map((img: any) => urlFor(img).url()),
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Bulk Vapes"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": Math.min(...product.variants.map((v: any) => v.price)),
      "highPrice": Math.max(...product.variants.map((v: any) => v.price)),
      "offerCount": product.variants.length
    }
  }

  return (
    <PageWrapper>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-6 lg:px-12 mb-8">
           <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name, href: "#" }
           ]} />
        </div>

        <section className="container mx-auto px-6 lg:px-12 mb-20">
            {/* On passe le produit ET la config crypto */}
            <ProductMainSection 
                product={product} 
                discounts={siteConfig.crypto.discountPercent} 
            />
        </section>

        {product.specs && (
            <section className="container mx-auto px-6 lg:px-12 mb-20">
                <ProductSpecs product={product} />
            </section>
        )}

       {product.comparison && (<section className="container mx-auto px-6 lg:px-12 mb-20">
             {/* Note: ProductComparison est statique pour l'instant, 
                 mais tu peux le rendre dynamique comme on a fait pour les catégories */}
             <ProductComparison 
          productName={product.name} 
          data={product.comparison} 
       />
        </section>)}

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
        
         {product.faq && product.faq.length > 0 && (
        <ProductFAQ items={product.faq} />
      )}

        <ProductBottomCta productName={product.name} />
      </div>
    </PageWrapper>
  )
}