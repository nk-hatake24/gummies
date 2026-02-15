"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image" // Import du helper d'image Sanity

// Interface pour définir ce qu'on attend de Sanity
interface Category {
  _id: string;
  name: string;
  slug: string; // ou { current: string } selon ton fetch
  description?: string;
  image?: any;
}

interface CategoriesGridProps {
  categories: Category[];
}

// On enregistre le plugin uniquement côté client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sécurité : Si pas de catégories, on arrête l'animation
    if (!categories || categories.length === 0) return;

    const ctx = gsap.context(() => {
      // Animation "stagger" (en cascade) pour les cartes
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [categories]) // On relance l'anim si les catégories changent

  // Fallback si la donnée n'est pas encore là
  if (!categories || categories.length === 0) {
      return <div className="py-20 text-center text-muted-foreground">Loading categories...</div>;
  }

  return (
    <div ref={containerRef} className="max-w-[1400px] mx-auto">
      {/* Header de la page */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight">
          All Categories
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Explore our carefully curated categories designed to elevate your style.
        </p>
      </div>

      {/* Grille Asymétrique */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        {categories.map((category, index) => {
            // Logique d'image Sanity
            const imageUrl = category.image ? urlFor(category.image).url() : "/placeholder.svg";
            const blurData = category.image?.asset?.metadata?.lqip;

            return (
              <Link
                key={category._id} // Utilisation de l'ID Sanity
                href={`/category/${category.slug}`}
                className={`category-card group relative overflow-hidden rounded-sm bg-muted aspect-[2/2]`}
              >
                {/* Image d'arrière-plan */}
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2} // Charge les 2 premières images en priorité (LCP)
                  // UX: Flou progressif (Blur hash)
                  placeholder={blurData ? "blur" : "empty"}
                  blurDataURL={blurData}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Contenu Textuel */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-end justify-between w-full">
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
                    
                    {/* Bouton Flèche */}
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
        })}
      </div>
    </div>
  )
}