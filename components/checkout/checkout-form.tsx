// components/checkout/checkout-form.tsx
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  CreditCard, 
  Bitcoin, 
  Loader2, 
  Landmark, 
  Smartphone, 
  Wallet,
  Sparkles,
  Zap
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { siteConfig, legalConfig } from "@/config/site.config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming",
]

const CRYPTO_OPTIONS = [
  { id: "btc", name: "Bitcoin (BTC)" },
  { id: "eth", name: "Ethereum (ETH)" },
  { id: "usdt", name: "Tether (USDT)" },
  { id: "ltc", name: "Litecoin (LTC)" },
]

export function CheckoutForm() {
  const router = useRouter()
  // On récupère setPaymentMethod pour mettre à jour le global context
  const { items, clearCart, paymentMethod, setPaymentMethod } = useCart()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<string>("")
  const [ageVerified, setAgeVerified] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    orderNote: "", // Champ pour les détails optionnels
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Gestionnaire de changement de méthode de paiement
  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethod(method)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required"
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.street) newErrors.street = "Street address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
    
    if (paymentMethod === "crypto" && !selectedCrypto) {
      newErrors.crypto = "Please select a cryptocurrency"
    }

    if (!ageVerified) {
      newErrors.age = "You must verify you are 21 or older"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setIsSubmitting(true)

    try {
      // --- CORRECTION ICI ---
      // On prépare les items avec TOUTES les infos nécessaires (ID + Fallback data)
      const formattedItems = items.map((item) => ({
        // 1. On cherche l'ID partout où il peut se cacher
        productId: item.productId || item.product.id,
        variantId: item.variantId,
        quantity: item.quantity,
        
        // 2. On envoie les détails TEXTE pour le mode "Sauvetage" (si Sanity échoue)
        // Cela permet à l'API de ne pas renvoyer $0.00 et "Unknown Product"
        price: item.variant.price, 
        product: {
            name: item.product.name
        },
        variant: {
            name: item.variant.name,
            price: item.variant.price
        }
      }))

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            address: {
              street: formData.street,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: "United States",
            },
          },
          items: formattedItems, // Utilisation de la liste corrigée
          paymentMethod,
          paymentDetails: {
            cryptoCurrency: paymentMethod === 'crypto' ? selectedCrypto : null,
          },
          note: formData.orderNote,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process order")
      }

      clearCart()
      router.push(`/thank-you?order=${data.orderNumber}`)
    } catch (error) {
      console.error(error) // Ajoute ceci pour voir l'erreur dans la console du navigateur
      toast.error(error instanceof Error ? error.message : "Failed to process order")
    } finally {
      setIsSubmitting(false)
    }
}

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      const next = { ...errors }
      delete next[field]
      setErrors(next)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* 1. Contact Info */}
      <section>
        <h2 className="font-serif text-xl mb-6">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={cn(errors.email && "border-destructive")} />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={cn(errors.firstName && "border-destructive")} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={cn(errors.lastName && "border-destructive")} />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+1 (555) 555-5555" className={cn(errors.phone && "border-destructive")} />
          </div>
        </div>
      </section>

      {/* 2. Shipping Address */}
      <section>
        <h2 className="font-serif text-xl mb-6">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" value={formData.street} onChange={(e) => handleChange("street", e.target.value)} className={cn(errors.street && "border-destructive")} />
          </div>

          <div>
            <Label htmlFor="apartment">Apartment, Suite, etc. (optional)</Label>
            <Input id="apartment" value={formData.apartment} onChange={(e) => handleChange("apartment", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} className={cn(errors.city && "border-destructive")} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                <SelectTrigger className={cn(errors.state && "border-destructive")}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-1/2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input id="zipCode" value={formData.zipCode} onChange={(e) => handleChange("zipCode", e.target.value)} placeholder="12345" className={cn(errors.zipCode && "border-destructive")} />
          </div>
        </div>
      </section>

      {/* 3. DETAILS DE COMMANDE (ORDER NOTES) */}
      <section>
        <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl">Order Details</h2>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Optional</span>
        </div>
        <div>
          <Label htmlFor="orderNote" className="sr-only">Order Notes</Label>
          <Textarea
            id="orderNote"
            placeholder="Special instructions for delivery, gate codes, or any other details..."
            className="min-h-[100px] resize-none"
            value={formData.orderNote}
            onChange={(e) => handleChange("orderNote", e.target.value)}
          />
        </div>
      </section>

      {/* 4. Payment Method */}
      <section>
        <h2 className="font-serif text-xl mb-6">Payment Method</h2>
        
        <div className="space-y-4">
          
          {/* --- OPTION 1 : CRYPTO (BEST DEAL) --- */}
          <div 
            onClick={() => handlePaymentMethodChange("crypto")}
            className={cn(
              "relative cursor-pointer border-2 rounded-lg p-5 transition-all duration-300 overflow-hidden",
              paymentMethod === "crypto" 
                ? "border-green-500 bg-green-500/5 ring-1 ring-green-500" 
                : "border-border hover:border-green-500/30"
            )}
          >
             {/* Badge */}
             <div className="absolute top-0 right-0 bg-green-500 text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
               <Sparkles className="h-3 w-3" />
               BEST DEAL -{siteConfig.crypto.discountPercent}%
             </div>

             <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-full shrink-0 transition-colors", paymentMethod === 'crypto' ? "bg-green-500 text-white" : "bg-green-100 text-green-700")}>
                    <Bitcoin className="h-6 w-6"/>
                </div>
                <div className="flex-1 pt-1">
                    <h3 className="font-bold flex items-center gap-2 text-lg">
                        Pay with Crypto
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Instant <strong>10% Discount</strong> applied. Secure and anonymous payment via BTC, ETH, USDT or LTC.
                    </p>

                    {/* Sélecteur de Crypto (Visible seulement si actif) */}
                    {paymentMethod === "crypto" && (
                        <div className="mt-4 pt-4 border-t border-green-500/20 animate-in fade-in slide-in-from-top-2">
                            <Label className="mb-2 block text-sm font-medium text-green-800">Select Currency</Label>
                            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                                <SelectTrigger className={cn("bg-background border-green-500/30 focus:ring-green-500", errors.crypto && "border-destructive")}>
                                    <SelectValue placeholder="Choose coin..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {CRYPTO_OPTIONS.map((coin) => (
                                    <SelectItem key={coin.id} value={coin.id}>{coin.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.crypto && <p className="text-sm text-destructive mt-1">{errors.crypto}</p>}
                        </div>
                    )}
                </div>
                {/* Radio Circle */}
                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1", paymentMethod === "crypto" ? "border-green-500" : "border-muted-foreground/30")}>
                    {paymentMethod === "crypto" && <div className="w-3 h-3 rounded-full bg-green-500" />}
                </div>
             </div>
          </div>

          {/* --- OPTION 2 : REVOLUT (POPULAR) --- */}
          <div 
            onClick={() => handlePaymentMethodChange("revolut")}
            className={cn(
              "relative cursor-pointer border-2 rounded-lg p-5 transition-all duration-300",
              paymentMethod === "revolut" 
                ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500" 
                : "border-border hover:border-blue-500/30"
            )}
          >
             <div className="absolute top-0 right-0 bg-blue-500 text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
               <Zap className="h-3 w-3" />
               -{siteConfig.revolut.discountPercent}% OFF
             </div>

             <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-full shrink-0 transition-colors", paymentMethod === 'revolut' ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700")}>
                    <Smartphone className="h-6 w-6"/>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold flex items-center gap-2 text-lg">Revolut Pay</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Fast payment via the Revolut App. <strong>5% Discount</strong>.
                    </p>
                </div>
                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "revolut" ? "border-blue-500" : "border-muted-foreground/30")}>
                    {paymentMethod === "revolut" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
             </div>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or pay with standard methods</span></div>
          </div>

          {/* --- OPTION 3 : STANDARD METHODS --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <PaymentOption id="card" label="Credit Card" icon={CreditCard} selected={paymentMethod} onSelect={handlePaymentMethodChange} />
             <PaymentOption id="bank_transfer" label="Bank Transfer" icon={Landmark} selected={paymentMethod} onSelect={handlePaymentMethodChange} />
             <PaymentOption id="apple_pay" label="Apple Pay" icon={Wallet} selected={paymentMethod} onSelect={handlePaymentMethodChange} />
          </div>

        </div>
      </section>

      {/* 5. Verification & Submit */}
      <section className="space-y-4">
        <div className="p-4 bg-muted/50 border border-border rounded-lg text-sm text-muted-foreground">
          {legalConfig.fdaWarning}
        </div>

        <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => !ageVerified && setAgeVerified(true)}>
          <Checkbox
            id="ageVerify"
            checked={ageVerified}
            onCheckedChange={(c) => {
              setAgeVerified(!!c)
              if (c && errors.age) {
                const next = { ...errors }
                delete next.age
                setErrors(next)
              }
            }}
            className="mt-1"
          />
          <div>
            <Label htmlFor="ageVerify" className="cursor-pointer font-medium">
              Age Verification & Terms
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              I confirm that I am {legalConfig.ageRestriction} years of age or older and agree to the Terms of Service and Privacy Policy.
            </p>
            {errors.age && <p className="text-sm text-destructive mt-1 font-medium">{errors.age}</p>}
          </div>
        </div>
      </section>

      <Button type="submit" size="lg" className="w-full h-14 text-lg shadow-lg" disabled={isSubmitting || items.length === 0}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Processing Order...
          </>
        ) : (
          "Place Secure Order"
        )}
      </Button>
    </form>
  )
}

function PaymentOption({ id, label, icon: Icon, selected, onSelect }: any) {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={cn(
        "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50",
        selected === id ? "border-foreground bg-muted/50 ring-1 ring-foreground" : "border-border"
      )}
    >
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">{label}</span>
      <div className={cn("ml-auto w-4 h-4 rounded-full border flex items-center justify-center", selected === id ? "border-foreground" : "border-muted-foreground/30")}>
        {selected === id && <div className="w-2 h-2 rounded-full bg-foreground" />}
      </div>
    </div>
  )
}