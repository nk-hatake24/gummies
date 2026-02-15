"use client"

import { createContext, useContext, useReducer, useCallback, useMemo, useEffect, type ReactNode } from "react"
import type { Cart, CartItem, Product, ProductVariant } from "@/lib/types"
import { siteConfig } from "@/config/site.config"
import { toast } from "sonner"

// 1. Définition des Types
type PaymentMethodType = "card" | "crypto" | "revolut" | "bank_transfer" | "apple_pay" | "other"

// Actions possibles
type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; variant: ProductVariant; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_PAYMENT_METHOD"; payload: PaymentMethodType } // Nouvelle action unique
  | { type: "SET_IS_OPEN"; payload: boolean } // Pour ouvrir/fermer proprement

interface CartState extends Cart {
  paymentMethod: PaymentMethodType // On remplace le booléen par le type précis
  isOpen: boolean
}

interface CartContextType extends CartState {
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  setPaymentMethod: (method: PaymentMethodType) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

// 2. Fonction de Calcul Centralisée (Gère Crypto ET Revolut)
function calculateTotals(items: CartItem[], method: PaymentMethodType): Omit<Cart, "items"> {
  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0)

  // Gestion du Discount selon la méthode
  let discount = 0
  if (method === "crypto") {
    discount = subtotal * (siteConfig.crypto.discountPercent / 100)
  } else if (method === "revolut") {
    // Assure-toi que siteConfig.revolut existe bien dans ta config
    discount = subtotal * ((siteConfig.revolut?.discountPercent || 5) / 100)
  }

  // Frais de port
  const shipping = subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.standardRate

  // Taxe (calculée sur le montant après remise)
  const taxableAmount = Math.max(0, subtotal - discount)
  const tax = taxableAmount * siteConfig.taxRate // ex: 0.0825

  const total = taxableAmount + shipping + tax

  return { subtotal, discount, shipping, tax, total }
}

// 3. Le Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, variant, quantity } = action.payload
      const existingIndex = state.items.findIndex(
        (item) => item.productId === product.id && item.variantId === variant.id,
      )

      let newItems: CartItem[]

      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: Math.min(item.quantity + quantity, variant.maxOrder) } : item,
        )
      } else {
        newItems = [...state.items, { productId: product.id, variantId: variant.id, quantity, product, variant }]
      }

      // On recalcule avec la méthode de paiement actuelle
      const totals = calculateTotals(newItems, state.paymentMethod)
      return { ...state, items: newItems, ...totals, isOpen: true }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId),
      )
      const totals = calculateTotals(newItems, state.paymentMethod)
      return { ...state, items: newItems, ...totals }
    }

    case "UPDATE_QUANTITY": {
      const { productId, variantId, quantity } = action.payload
      if (quantity <= 0) {
        const newItems = state.items.filter((item) => !(item.productId === productId && item.variantId === variantId))
        const totals = calculateTotals(newItems, state.paymentMethod)
        return { ...state, items: newItems, ...totals }
      }

      const newItems = state.items.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: Math.min(quantity, item.variant.maxOrder) }
          : item,
      )
      const totals = calculateTotals(newItems, state.paymentMethod)
      return { ...state, items: newItems, ...totals }
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
        subtotal: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        paymentMethod: "card", // Reset méthode par défaut
      }
    }

    case "SET_PAYMENT_METHOD": {
      // C'est ICI que la magie opère : changement de méthode = recalcul immédiat des totaux
      const newMethod = action.payload
      const totals = calculateTotals(state.items, newMethod)
      return { ...state, paymentMethod: newMethod, ...totals }
    }

    case "SET_IS_OPEN": {
      return { ...state, isOpen: action.payload }
    }

    default:
      return state
  }
}

// État initial
const initialState: CartState = {
  items: [],
  subtotal: 0,
  discount: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  paymentMethod: "card",
  isOpen: false,
}

// 4. Le Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Persistance LocalStorage (Sauvegarde le panier quand on recharge la page)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        // On restaure les items, mais on recalcule les prix pour être sûr
        if(parsed.items) {
             const totals = calculateTotals(parsed.items, "card")
             // Note: On pourrait créer une action HYDRATE_CART pour faire ça plus proprement
             parsed.items.forEach((item: any) => {
                 dispatch({ type: "ADD_ITEM", payload: { product: item.product, variant: item.variant, quantity: item.quantity }})
             })
        }
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
  }, [])

  useEffect(() => {
    // On sauvegarde uniquement les items, pas tout le state calculé
    localStorage.setItem("cart", JSON.stringify({ items: state.items }))
  }, [state.items])


  // Actions
  const addItem = useCallback((product: Product, variant: ProductVariant, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, variant, quantity } })
    // Optionnel : Toast ici si tu veux
  }, [])

  const removeItem = useCallback((productId: string, variantId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } })
    toast.error("Item removed from cart")
  }, [])

  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, variantId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethodType) => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method })
  }, [])

  const openCart = useCallback(() => dispatch({ type: "SET_IS_OPEN", payload: true }), [])
  const closeCart = useCallback(() => dispatch({ type: "SET_IS_OPEN", payload: false }), [])
  const toggleCart = useCallback(() => dispatch({ type: "SET_IS_OPEN", payload: !state.isOpen }), [state.isOpen])

  const itemCount = useMemo(() => state.items.reduce((sum, item) => sum + item.quantity, 0), [state.items])

  const value = useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setPaymentMethod,
      openCart,
      closeCart,
      toggleCart,
      itemCount,
    }),
    [state, addItem, removeItem, updateQuantity, clearCart, setPaymentMethod, openCart, closeCart, toggleCart, itemCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}