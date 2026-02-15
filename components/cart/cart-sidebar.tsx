"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { 
  X, Plus, Minus, Trash2, Bitcoin, Smartphone, CreditCard, 
  AlertCircle, Lock // New icons
} from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { siteConfig } from "@/config/site.config"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { urlFor } from "@/sanity/lib/image"
import { Progress } from "@/components/ui/progress" 

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    items,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    paymentMethod,
    setPaymentMethod,
    updateQuantity,
    removeItem,
  } = useCart()

  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // --- LOGIC: MINIMUM ORDER ---
  // Use config value or default to 500
  const MIN_ORDER = siteConfig.wholesale?.minOrderAmount || 500 
  const isBelowMinOrder = subtotal < MIN_ORDER
  const amountToReachMin = MIN_ORDER - subtotal
  const progressPercentage = Math.min((subtotal / MIN_ORDER) * 100, 100)

  // GSAP Animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: "power3.out" })
    } else {
      document.body.style.overflow = ""
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" })
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" })
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 opacity-0",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 translate-x-full flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={onClose} asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.productId}-${item.variantId}`} className="p-6">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0 border border-border/50">
                      <Image
                        src={item.product.images?.[0] ? urlFor(item.product.images[0]).url() : "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.variant.name}</p>
                      <p className="text-sm font-medium mt-2">{formatCurrency(item.variant.price)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-border rounded">
                          <button
                            className="p-1.5 hover:bg-muted transition-colors"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            className="p-1.5 hover:bg-muted transition-colors"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => removeItem(item.productId, item.variantId)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-5 bg-muted/10">
            
            {/* PAYMENT METHOD PREVIEW */}
            <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Estimate Price with:</Label>
                <div className="grid grid-cols-3 gap-2">
                    <button 
                        onClick={() => setPaymentMethod('card')}
                        className={cn("flex flex-col items-center justify-center p-2 rounded border transition-all", paymentMethod === 'card' ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:border-foreground/50")}
                    >
                        <CreditCard className="h-4 w-4 mb-1" />
                        <span className="text-[10px] font-medium">Card</span>
                    </button>
                    
                    <button 
                        onClick={() => setPaymentMethod('revolut')}
                        className={cn("flex flex-col items-center justify-center p-2 rounded border transition-all", paymentMethod === 'revolut' ? "bg-blue-600 text-white border-blue-600" : "bg-background border-border hover:border-blue-500/50")}
                    >
                        <Smartphone className="h-4 w-4 mb-1" />
                        <span className="text-[10px] font-medium">Revolut -5%</span>
                    </button>

                    <button 
                        onClick={() => setPaymentMethod('crypto')}
                        className={cn("flex flex-col items-center justify-center p-2 rounded border transition-all", paymentMethod === 'crypto' ? "bg-green-600 text-white border-green-600" : "bg-background border-border hover:border-green-500/50")}
                    >
                        <Bitcoin className="h-4 w-4 mb-1" />
                        <span className="text-[10px] font-medium">Crypto -10%</span>
                    </button>
                </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className={cn("flex justify-between font-medium", paymentMethod === 'crypto' ? "text-green-600" : "text-blue-600")}>
                  <span>
                    {paymentMethod === 'crypto' ? 'Crypto Discount' : 'Revolut Discount'}
                  </span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-medium pt-3 border-t border-border">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* --- MINIMUM ORDER RESTRICTION --- */}
            {isBelowMinOrder ? (
                <div className="space-y-3">
                    <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md flex gap-3 items-start">
                        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <div className="text-sm text-destructive">
                            <p className="font-semibold">Minimum Order: {formatCurrency(MIN_ORDER)}</p>
                            <p className="opacity-90">Please add <strong>{formatCurrency(amountToReachMin)}</strong> more to checkout.</p>
                        </div>
                    </div>
                    
                    {/* Visual Progress Bar (Optional, requires shadcn Progress component) */}
                    <div className="space-y-1">
                        <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                            <Progress value={progressPercentage} className="h-full bg-destructive" />
                        </div>
                        <p className="text-[10px] text-right text-muted-foreground">{Math.round(progressPercentage)}% reached</p>
                    </div>

                    <Button className="w-full h-12 text-lg" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        Checkout Locked
                    </Button>
                </div>
            ) : (
                /* Checkout Button (Enabled) */
                <Button className="w-full h-12 text-lg" asChild>
                    <Link href="/checkout" onClick={onClose}>
                        Proceed to Checkout
                    </Link>
                </Button>
            )}

            <p className="text-xs text-center text-muted-foreground">
              Free shipping on orders over {formatCurrency(siteConfig.shipping.freeShippingThreshold)}
            </p>
          </div>
        )}
      </div>
    </>
  )
}