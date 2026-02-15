"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".related-product",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}>
      <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10">You May Also Like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const lowestPrice = Math.min(...product.variants.filter((v) => !v.isWholesale).map((v) => v.price))

          return (
            <Link key={product.id} href={`/product/${product.slug}`} className="related-product group block">
              <div className="relative aspect-square bg-muted rounded-sm overflow-hidden mb-4">
                <Image
                  src={product.images[0]?.url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm group-hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">From {formatCurrency(lowestPrice)}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
