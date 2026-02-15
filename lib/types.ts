// ============================================
// BULK VAPES - Core Type Definitions
// ============================================

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  categoryId: string
  images: ProductImage[]
  variants: ProductVariant[]
  specs: ProductSpec[]
  tags: string[]
  featured: boolean
  new: boolean
  bestseller: boolean
  inStock: boolean
  createdAt: string
  updatedAt: string
}

export type ProductImage = {
  _key?: string
  alt?: string
  imageId?: string
  asset?: { _ref: string; _type: "reference" }
}

export interface ProductVariant {
  id: string
  name: string // e.g., "Single", "3-Pack", "6-Pack", "12-Pack (Wholesale)"
  sku: string
  price: number
  compareAtPrice?: number
  quantity: number // Pack quantity
  minOrder: number
  maxOrder: number
  inStock: boolean
  isWholesale: boolean
  imageId?: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  parentId?: string
  order: number
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export interface CustomerInfo {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: {
    street: string
    apartment?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export interface Order {
  id: string
  orderNumber: string
  customer: CustomerInfo
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  paymentMethod: "card" | "crypto" | "paypal"
  cryptoDiscount?: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  contact: {
    email: string
    phone: string
    whatsapp: string
    address: string
  }
  social: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
  shipping: {
    freeShippingThreshold: number
    standardRate: number
    expressRate: number
  }
  crypto: {
    enabled: boolean
    discountPercent: number
    acceptedCurrencies: string[]
  }
  revolut: {  

    enabled: boolean
    discountPercent: number 
  }
  taxRate: number
  wholesale: {
    minOrderAmount: number
  }
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface TrustBadge {
  icon: string
  title: string
  description: string
}

export interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  rating: number
  avatar?: string
}
