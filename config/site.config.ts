// ============================================
// GUMMIESSHOP - Site Configuration
// Edit this file to update site-wide settings
// ============================================
// config/site.config.ts
import type { SiteConfig, NavItem, TrustBadge } from "@/lib/types"

export const siteConfig: SiteConfig = {
  name: "GUMMIESSHOP",
  tagline: "Gummies Retail & Wholesale",
  description:
    "Shop premium gummies online with fast shipping, secure payments, and dedicated support.",
  url: "https://gummiesshop.us",
  contact: {
    email: "support@gummiesshop.us",
    phone: "+1 (800) 555-GUMM",
    whatsapp: "+18005554866",
    address: "123 Commerce Street, Los Angeles, CA 90001",
  },
  social: {
    instagram: "https://instagram.com/gummiesshop",
    twitter: "https://twitter.com/gummiesshop",
  },
  shipping: {
    freeShippingThreshold: 100,
    standardRate: 9.99,
    expressRate: 19.99,
  },
  crypto: {
    enabled: true,
    discountPercent: 10,
    acceptedCurrencies: ["BTC", "ETH", "USDT", "USDC"],
  },
  revolut: {
    enabled: true,
    discountPercent: 5,
  },
  taxRate: 0.0825,
  wholesale: {
    minOrderAmount: 500, // Example: $500 Minimum
  },
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Categories",
    href: "/category",
    children: [
      { label: "All Gummies", href: "/category/gummies" },
      { label: "THC Gummies", href: "/category/thc-gummies" },
      { label: "CBD Gummies", href: "/category/cbd-gummies" },
      { label: "Sleep Gummies", href: "/category/sleep-gummies" },
      { label: "Delta-9 Gummies", href: "/category/delta-9-gummies" },
    ],
  },
   { label: "Products", href: "/products" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export const trustBadges: TrustBadge[] = [
  {
    icon: "shield-check",
    title: "Quality Checked",
    description: "Products selected with strict quality standards",
  },
  {
    icon: "truck",
    title: "Fast Shipping",
    description: "Free shipping on orders over $100",
  },
  {
    icon: "headphones",
    title: "Customer Support",
    description: "Help whenever you need it",
  },
  {
    icon: "lock",
    title: "Secure Payments",
    description: "Encrypted checkout and safe payment options",
  },
]

export const legalConfig = {
  ageRestriction: 21,
  // IMPORTANT: wording neutre (évite nicotine)
  fdaWarning:
    "WARNING: Keep out of reach of children. Do not use if pregnant or nursing. Consult a healthcare professional before use.",
  disclaimer:
    "Products sold on this website are intended for adults only. By entering this site, you certify that you are of legal age in your state.",
  complianceText:
    "GUMMIESSHOP aims to operate in accordance with applicable federal and state requirements. Customers are responsible for knowing their local laws and regulations.",
}

// config/crypto-wallets.ts
export const CRYPTO_WALLETS: Record<string, string> = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  usdt: "TVJ5dW2y4d1aF7H9kG4G3d2A1bE5cF6hI8",
  ltc: "LQtp83kkfjhx0wlh2kgdygjrsqtzq2n0yrf249",
}