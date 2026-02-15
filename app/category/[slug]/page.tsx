import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PageWrapper  from "@/components/shared/page-wrapper"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { getCategoryPageData, getAllCategories } from "@/lib/sanity-data" 
import { PortableText } from "@portabletext/react" 
import { urlFor } from "@/sanity/lib/image"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

// Génération statique des URLs (inchangé)
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: any) => ({
    slug: category.slug,
  }))
}



export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const { slug } = await params
  const { category } = await getCategoryPageData(slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  if (!category) {
    return {
      title: "Category Not Found | BULK VAPES",
      robots: { index: false },
    }
  }

  const title =
    category.seo?.metaTitle ||
    `${category.name} Wholesale | Bulk ${category.name} Supply`

  const description =
    category.seo?.metaDescription ||
    `Buy ${category.name.toLowerCase()} in bulk at wholesale prices. Fast USA shipping for retailers and distributors.`

  const ogImage = category.seo && 'ogImage' in category.seo && category.seo.ogImage
    ? urlFor(category.seo.ogImage).width(1200).height(630).url()
    : "/og-category.jpg"

  return {
    title,
    description,

    alternates: {
      canonical: `${baseUrl}/category/${category.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      url: `${baseUrl}/category/${category.slug}`,
      title,
      description,
      siteName: "BULK VAPES",
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


export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // CORRECTION ICI : On utilise Promise.all pour récupérer EN PARALLÈLE :
  // 1. Les données de la catégorie actuelle (titre, produits, etc.)
  // 2. La liste de TOUTES les catégories (pour le menu filtre à gauche)
  const [{ category, products }, allCategories] = await Promise.all([
    getCategoryPageData(slug),
    getAllCategories()
  ]);

  if (!category) notFound()

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
                { label: category.name, href: `/category/${category.slug}` },
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

        {/* Products Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-64 flex-shrink-0">
                
                {/* CORRECTION DES PROPS ICI */}
                <ProductFilters 
                    categories={allCategories}      // On passe la liste complète (Array)
                    currentCategory={category.slug} // On passe le slug actif (String)
                />

              </aside>
              
              <div className="flex-1">
                {/* 
                   Correction mineure : Assure-toi que la prop s'appelle 'initialProducts' (minuscule 'i') 
                   si c'est ce que tu as défini dans ton composant ProductsGrid précédent 
                */}
                <ProductsGrid initialProducts={products} />
              </div>
            </div>
          </div>
        </section>

        {/* Section SEO (inchangé) */}
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