// @/components/product/product-specs.tsx
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// Assure-toi que ce type correspond à ce qu'on a défini pour Sanity
// Si tu n'as pas encore mis à jour types.ts, tu peux utiliser 'any' temporairement pour tester
import type { Product } from "@/lib/types" 

// Enregistrement sécurisé du plugin (côté client uniquement)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProductSpecsProps {
  product: Product
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  // On vérifie s'il y a des specs à afficher
  const hasSpecs = product.specs && product.specs.length > 0;

  useEffect(() => {
    // Si pas de ref ou pas de contenu à animer, on sort
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // On anime seulement si les éléments existent
      const rows = document.querySelectorAll(".spec-row");
      
      if (rows.length > 0) {
        gsap.fromTo(
          ".spec-row",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, []) // Dépendance vide : s'exécute au montage

  // Si pas de description ET pas de specs, on n'affiche rien du tout
  if (!product.description && !hasSpecs) return null;

  return (
    <div ref={sectionRef} className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Description */}
        {product.description && (
          <div>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">
              About This Product
            </h2>
            {/* 'whitespace-pre-line' permet de garder les paragraphes de Sanity */}
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {/* Specifications */}
        {hasSpecs && (
          <div>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">
              Specifications
            </h2>
            <dl className="divide-y divide-border">
              {product.specs.map((spec, index) => (
                <div key={index} className="spec-row flex justify-between py-4">
                  <dt className="text-muted-foreground font-medium">{spec.label}</dt>
                  <dd className="font-semibold text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}