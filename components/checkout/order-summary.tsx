// components/checkout/order-summary.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react" 
import { useCart } from "@/lib/cart-context"
import { siteConfig } from "@/config/site.config"
import { cn, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"

export function OrderSummary() {
  const { items, subtotal, discount, shipping, tax, total, paymentMethod, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="p-8 border border-border rounded-lg text-center bg-card">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Link href="/products" className="text-accent hover:underline font-medium">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="border border-border rounded-xl bg-card shadow-sm overflow-hidden sticky top-24">
      <div className="p-6 border-b border-border bg-muted/20">
        <h2 className="font-serif text-xl">Order Summary</h2>
        <p className="text-sm text-muted-foreground mt-1">{items.length} items</p>
      </div>

      {/* Items List */}
      <div className="max-h-[350px] overflow-y-auto scrollbar-thin">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={`${item.productId}-${item.variantId}`} className="p-5 group hover:bg-muted/10 transition-colors">
              <div className="flex gap-4">
                <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0 border border-border/50">
                  <Image
                    src={item.product.images?.[0] ? urlFor(item.product.images[0]).url() : "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-medium text-sm truncate pr-2">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.variant.name}</p>
                </div>
                
                <div className="flex flex-col items-end justify-between py-1">
                  <p className="font-medium text-sm">{formatCurrency(item.variant.price * item.quantity)}</p>
                  
                  <button 
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 -mr-2 opacity-50 hover:opacity-100"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      aria-label="Remove item"
                  >
                      <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Calculations */}
      <div className="p-6 space-y-3 bg-muted/30 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {/* Dynamic Discount Display */}
        {discount > 0 && (
          <div className="flex justify-between text-sm font-medium animate-in fade-in slide-in-from-right-4 bg-background/50 p-2 rounded border border-border/50">
            <span className="flex items-center gap-2">
                {paymentMethod === "crypto" && (
                    <><span className="text-green-600">Crypto Discount</span> <span className="text-[10px] bg-green-100 px-1.5 py-0.5 rounded text-green-700 font-bold border border-green-200">-{siteConfig.crypto.discountPercent}%</span></>
                )}
                {paymentMethod === "revolut" && (
                    <><span className="text-blue-600">Revolut Discount</span> <span className="text-[10px] bg-blue-100 px-1.5 py-0.5 rounded text-blue-700 font-bold border border-blue-200">-{siteConfig.revolut.discountPercent}%</span></>
                )}
            </span>
            <span className={cn(paymentMethod === "crypto" ? "text-green-600" : "text-blue-600")}>
                -{formatCurrency(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatCurrency(shipping)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="flex justify-between text-xl font-serif font-medium pt-4 border-t border-border mt-2 items-end">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        
        {/* Messages de savings explicites */}
        {paymentMethod === "crypto" && (
            <div className="bg-green-100/50 border border-green-200 rounded-md p-3 text-center mt-4">
                <p className="text-xs text-green-800 font-medium">
                    🎉 You saved {formatCurrency(discount)} by choosing Crypto!
                </p>
            </div>
        )}
        {paymentMethod === "revolut" && (
            <div className="bg-blue-100/50 border border-blue-200 rounded-md p-3 text-center mt-4">
                <p className="text-xs text-blue-800 font-medium">
                    ⚡ You saved {formatCurrency(discount)} by using Revolut!
                </p>
            </div>
        )}
      </div>

      {/* Free Shipping Progress */}
      {subtotal < siteConfig.shipping.freeShippingThreshold && (
        <div className="p-3 text-center bg-accent/5 text-xs border-t border-accent/10 text-accent-foreground/80">
          Add {formatCurrency(siteConfig.shipping.freeShippingThreshold - subtotal)} more for free shipping!
        </div>
      )}
    </div>
  )
}