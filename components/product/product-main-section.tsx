// components/product/product-main-section.tsx
"use client"

import { useState } from "react"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import type { Product, ProductVariant } from "@/lib/types"

// Define the structure for discounts
export interface PaymentDiscounts {
  crypto?: number;  // e.g. 10
  revolut?: number; // e.g. 5
}

interface ProductMainSectionProps {
  product: Product;
  discounts?: PaymentDiscounts; // <--- Accepted here
}

export function ProductMainSection({ product, discounts }: ProductMainSectionProps) {
  
  // 1. Initialize State with the first Retail variant (or first available)
  const [currentVariant, setCurrentVariant] = useState<ProductVariant>(() => {
    if (!product.variants || product.variants.length === 0) {
      return {} as ProductVariant;
    }
    return product.variants.find((v) => !v.isWholesale) || product.variants[0];
  })

  if (!product) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Column: Gallery */}
      <ProductGallery 
        images={product.images || []} 
        productName={product.name} 
        // Syncs the gallery with the variant's specific image
        selectedImageId={currentVariant?.imageId} 
        shortDescription={product.shortDescription}
      />

      {/* Right Column: Info & Actions */}
      <ProductInfo 
        product={product} 
        selectedVariant={currentVariant} 
        onVariantChange={setCurrentVariant} 
        discounts={discounts} // <--- Pass discounts down
      />
    </div>
  )
}