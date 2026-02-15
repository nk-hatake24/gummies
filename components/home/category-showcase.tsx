"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image" // Import Sanity Image Helper

// On définit l'interface des props attendues
interface CategoryShowcaseProps {
  categories: any[] // Tu peux typer plus strictement avec CategoryPayload importé de sanity-data
}

gsap.registerPlugin(ScrollTrigger)

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Si pas de catégories, on n'anime rien
    if (!categories || categories.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [categories]) // Dépendance ajoutée

  if (!categories || categories.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-12 lg:py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Explore Our Collection</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            // Optimisation Image Sanity
            const imageUrl = category.image ? urlFor(category.image).url() : "/placeholder.svg";
            const blurData = category.image?.asset?.metadata?.lqip;

            return (
              <Link
                key={category._id || index} // Utilise _id de Sanity
                href={`/category/${category.slug}`}
                className={`category-card group relative overflow-hidden rounded-sm aspect-[4/5]`}
              >
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  // OPTIMISATION UX : Flou progressif
                  placeholder={blurData ? "blur" : "empty"}
                  blurDataURL={blurData}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-end justify-between">
                   <div className="transform transition-transform duration-300 group-hover:translate-x-2">
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-200 max-w-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 delay-75">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                      <ArrowUpRight className="h-5 w-5 text-foreground group-hover:text-background" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}