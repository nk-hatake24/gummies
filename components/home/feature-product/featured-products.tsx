"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Check, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"
import { urlFor } from "@/sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

type ProductVariant = {
  id: string
  price: number
  isWholesale?: boolean
  imageId?: string
}

export type Product = {
  _id: string
  slug: string
  name: string
  images: any[]
  variants: ProductVariant[]
  tags: string[]
  shortDescription: string
  new?: boolean
  bestseller?: boolean
}

export function FeaturedProductsClients({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const cart = useCart()
  const [addingId, setAddingId] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 75%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    const firstVariant =
      product.variants && product.variants.length > 0
        ? product.variants[0]
        : null

    if (!firstVariant) return

    setAddingId(product._id)

    cart.addItem(product, firstVariant, 1)

    toast.success("Added to cart", {
      description: `1 x ${product.name}`,
    })

    setTimeout(() => setAddingId(null), 500)
  }

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const scrollAmount = carouselRef.current.clientWidth * 0.8
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Helper to determine the correct image URL safely
  const getProductImage = (product: Product) => {
    try {
      // 1. Identify the first variant's image ID
      const firstVariant = product.variants?.[0]
      const targetImageId = firstVariant?.imageId

      // 2. Try to find a matching image in the images array
      const variantImage = targetImageId
        ? product.images?.find((img) => img.imageId === targetImageId)
        : null

      // 3. Fallback: Use the specific variant image, or the first image of the product
      const finalImage = variantImage || product.images?.[0]

      // 4. Return the URL if the asset exists
      // We check for 'asset' generally, not just 'asset._ref', to handle expanded assets
      if (finalImage?.asset) {
        return urlFor(finalImage).url()
      }
    } catch (error) {
      console.error("Error generating image URL:", error)
    }
    
    // 5. Ultimate fallback
    return "/placeholder.svg"
  }

  return (
    <section ref={sectionRef} className="py-12 lg:py-24 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Featured Selection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight">
              Bestsellers
            </h2>
          </div>
          <Button variant="ghost" className="group" asChild>
            <Link href="/products">
              View all products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* CONDITIONAL RENDER */}
        {products.length <= 3 ? (
          // NORMAL GRID
          <div
            ref={productsRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10" // Increased gap
          >
            {products.map((product: Product) => {
              const lowestPrice = Math.min(
                ...product.variants.map((variant) => variant.price)
              )
              const isAdding = addingId === product._id
              const imageUrl = getProductImage(product)

              return (
                <Link
                  key={`${product.slug}-${product.variants[0]?.id}`}
                  href={`/product/${product.slug}`}
                  className="product-card group flex flex-col h-full"
                >
                  {/* Changed aspect-square to aspect-[1/1.1] for a taller/larger image area */}
                  <div className="relative aspect-[1/1.1] bg-muted rounded-sm overflow-hidden mb-6">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.new && (
                        <span className="px-3 py-1 text-xs uppercase tracking-wider bg-accent text-accent-foreground rounded-sm">
                          New
                        </span>
                      )}
                      {product.bestseller && (
                        <span className="px-3 py-1 text-xs uppercase tracking-wider bg-foreground text-background rounded-sm">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {product.tags[0]}
                    </p>
                    <h3 className="font-medium text-2xl group-hover:text-accent transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-base text-muted-foreground mt-2 line-clamp-2 mb-6">
                      {product.shortDescription}
                    </p>

                    <div className="mt-auto pt-2 space-y-4">
                      <p className="font-medium text-lg">
                        From {formatCurrency(lowestPrice)}
                      </p>

                      <Button
                        size="lg"
                        className="w-full gap-2 h-14 text-base" // Increased button height
                        disabled={isAdding}
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        {isAdding ? (
                          <>
                            <Check className="h-5 w-5 animate-in zoom-in" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-5 w-5" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          // CAROUSEL MODE
          <div className="relative">
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow hover:bg-background transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              ref={(el) => {
                carouselRef.current = el
                productsRef.current = el
              }}
              className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
            >
              {products.map((product: Product) => {
                const lowestPrice = Math.min(
                  ...product.variants.map((variant) => variant.price)
                )
                const isAdding = addingId === product._id
                const imageUrl = getProductImage(product)

                return (
                  <Link
                    key={`${product.slug}-${product.variants[0]?.id}`}
                    href={`/product/${product.slug}`}
                    // Increased min-width for larger cards in carousel
                    className="product-card group flex flex-col h-full min-w-[380px] md:min-w-[420px]"
                  >
                    <div className="relative aspect-[1/1.1] bg-muted rounded-sm overflow-hidden mb-6">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col flex-grow">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        {product.tags[0]}
                      </p>
                      <h3 className="font-medium text-2xl group-hover:text-accent transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-base text-muted-foreground mt-2 line-clamp-2 mb-6">
                        {product.shortDescription}
                      </p>

                      <div className="mt-auto pt-2 space-y-4">
                        <p className="font-medium text-lg">
                          From {formatCurrency(lowestPrice)}
                        </p>

                        <Button
                          size="lg"
                          className="w-full gap-2 h-14 text-base"
                          disabled={isAdding}
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          {isAdding ? (
                            <>
                              <Check className="h-5 w-5 animate-in zoom-in" />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-5 w-5" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow hover:bg-background transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}