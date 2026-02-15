// components/product/product-info.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Shield, 
  Truck, 
  RotateCcw, 
  Bitcoin, 
  Wallet,
  ChevronDown // Imported Chevron for the select arrow
} from "lucide-react"
import type { Product, ProductVariant } from "@/lib/types"
import { formatCurrency, cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { legalConfig } from "@/config/site.config"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import type { PaymentDiscounts } from "./product-main-section"

interface ProductInfoProps {
  product: Product
  selectedVariant: ProductVariant
  onVariantChange: (variant: ProductVariant) => void
  discounts?: PaymentDiscounts
}

const trustFeatures = [
  { icon: Shield, label: "Authentic Product" },
  { icon: Truck, label: "Fast Shipping" },
  { icon: RotateCcw, label: "Easy Returns" },
]

export function ProductInfo({ product, selectedVariant, onVariantChange, discounts }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()
  const contentRef = useRef<HTMLDivElement>(null)

  // Safety Checks
  if (!product || !selectedVariant) {
    return <div className="animate-pulse h-96 bg-muted rounded-md"></div>
  }

  // Animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 0.2 },
      )
    }
  }, [])

  // Reset quantity when variant changes (to meet minOrder)
  useEffect(() => {
    if (selectedVariant) {
        setQuantity(Math.max(selectedVariant.minOrder, 1))
    }
  }, [selectedVariant])

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= selectedVariant.minOrder && newQuantity <= selectedVariant.maxOrder) {
      setQuantity(newQuantity)
    }
  }

  // Handle Select Change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantId = e.target.value
    const variant = product.variants.find((v) => v.id === variantId)
    if (variant) {
      onVariantChange(variant)
    }
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, selectedVariant, quantity)
    toast.success("Added to cart", {
      description: `${quantity}x ${product.name} - ${selectedVariant.name}`,
    })
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div ref={contentRef} className="lg:sticky lg:top-32 space-y-8">
      
      {/* 1. Header Section */}
      <div className="hidden lg:flex lg:flex-col">
        <div className="flex gap-2 mb-4">
          {product.new && <Badge className="bg-accent text-accent-foreground">New</Badge>}
          {product.bestseller && <Badge variant="secondary">Bestseller</Badge>}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{product.name}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{product.shortDescription}</p>
      </div>

      {/* 2. Price & Payment Methods Display */}
      <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border/50">
        
        {/* Standard Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-medium">{formatCurrency(selectedVariant.price)}</span>
          {selectedVariant.compareAtPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatCurrency(selectedVariant.compareAtPrice)}
            </span>
          )}
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Standard</span>
        </div>

        {/* Dynamic Discount Badges */}
        {(discounts?.crypto || discounts?.revolut) && (
          <div className="flex flex-col sm:flex-row gap-2 pt-1 border-t border-border/50">
            {discounts.crypto && (
               <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-md transition-colors hover:bg-green-500/20">
                  <Bitcoin className="h-4 w-4 text-green-600" />
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] text-green-600/80 uppercase font-bold tracking-wider">Crypto Price (-{discounts.crypto}%)</span>
                    <span className="font-bold text-green-700 dark:text-green-400">
                        {formatCurrency(selectedVariant.price * (1 - discounts.crypto / 100))}
                    </span>
                  </div>
               </div>
            )}
            {discounts.revolut && (
               <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-md transition-colors hover:bg-blue-500/20">
                  <Wallet className="h-4 w-4 text-blue-600" />
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] text-blue-600/80 uppercase font-bold tracking-wider">Revolut (-{discounts.revolut}%)</span>
                    <span className="font-bold text-blue-700 dark:text-blue-400">
                        {formatCurrency(selectedVariant.price * (1 - discounts.revolut / 100))}
                    </span>
                  </div>
               </div>
            )}
          </div>
        )}
      </div>

      {/* 3. FLAVOR SELECTOR (Changed from Pack Buttons to Select Dropdown) */}
      <div>
        <label htmlFor="variant-select" className="text-sm font-medium mb-3 block">
          Select Flavor
        </label>
        <div className="relative">
          <select
            id="variant-select"
            value={selectedVariant.id}
            onChange={handleSelectChange}
            className={cn(
              "w-full appearance-none bg-background border border-input hover:border-accent transition-colors rounded-md py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer",
              !selectedVariant.inStock && "opacity-80"
            )}
          >
            {product.variants.map((variant) => (
              <option 
                key={variant.id} 
                value={variant.id} 
                disabled={!variant.inStock}
              >
                {variant.name} {variant.isWholesale ? "(Wholesale)" : ""} — {formatCurrency(variant.price)}
                {!variant.inStock ? " (Out of Stock)" : ""}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon positioned absolutely */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* 4. Quantity Selector */}
      <div>
        <label className="text-sm font-medium mb-3 block">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-sm">
            <button
              className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= selectedVariant.minOrder}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= selectedVariant.maxOrder}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
             Min order: {selectedVariant.minOrder}
          </span>
        </div>
      </div>

      {/* 5. Add to Cart Button */}
      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full gap-2 h-14 text-lg"
          onClick={handleAddToCart}
          disabled={!selectedVariant.inStock || isAdding}
        >
          {isAdding ? (
            <>
              <Check className="h-5 w-5" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              {selectedVariant.inStock 
                ? `Add to Cart · ${formatCurrency(selectedVariant.price * quantity)}`
                : "Out of Stock"
              }
            </>
          )}
        </Button>
      </div>

      {/* 6. Trust Features & Legal */}
      <div className="flex justify-between py-6 border-t border-b border-border">
        {trustFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">{feature.label}</span>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-sm">{legalConfig.fdaWarning}</p>
    </div>
  )
}