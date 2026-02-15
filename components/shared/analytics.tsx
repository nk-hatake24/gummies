"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

// GA4 Event Types
type EventName =
  | "page_view"
  | "view_item"
  | "view_item_list"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "sign_up"
  | "contact_form_submit"
  | "live_chat_open"
  | "whatsapp_click"

interface EventParams {
  currency?: string
  value?: number
  items?: Array<{
    item_id: string
    item_name: string
    item_category?: string
    price?: number
    quantity?: number
  }>
  search_term?: string
  method?: string
  [key: string]: unknown
}

// Track custom events
export function trackEvent(eventName: EventName, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params)
  }
}

// Analytics component for page view tracking
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Helper functions for common e-commerce events
export const analyticsEvents = {
  viewProduct: (product: { id: string; name: string; category: string; price: number }) => {
    trackEvent("view_item", {
      currency: "USD",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    })
  },

  addToCart: (product: { id: string; name: string; category: string; price: number; quantity: number }) => {
    trackEvent("add_to_cart", {
      currency: "USD",
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    })
  },

  removeFromCart: (product: { id: string; name: string; price: number; quantity: number }) => {
    trackEvent("remove_from_cart", {
      currency: "USD",
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    })
  },

  beginCheckout: (value: number, items: Array<{ id: string; name: string; price: number; quantity: number }>) => {
    trackEvent("begin_checkout", {
      currency: "USD",
      value,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  },

  purchase: (
    transactionId: string,
    value: number,
    items: Array<{ id: string; name: string; price: number; quantity: number }>,
  ) => {
    trackEvent("purchase", {
      transaction_id: transactionId,
      currency: "USD",
      value,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  },

  search: (searchTerm: string) => {
    trackEvent("search", { search_term: searchTerm })
  },

  contactFormSubmit: () => {
    trackEvent("contact_form_submit")
  },

  liveChatOpen: () => {
    trackEvent("live_chat_open")
  },

  whatsAppClick: () => {
    trackEvent("whatsapp_click")
  },
}
