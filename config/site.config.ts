// ============================================
// BULK VAPES - Site Configuration
// Edit this file to update site-wide settings
// ============================================
// config/site.config.ts
import type { SiteConfig, NavItem, TrustBadge } from "@/lib/types"

export const siteConfig: SiteConfig = {
  name: "BULK VAPES USA",
  tagline: "Bulk Vapes Wholesale in the USA ",
  description:
     "Buy Bulk Vapes Online from a Trusted USA Wholesale Supplier.",
  url: "https://bulkvapes.com",
  contact: {
    email: "support@bulkvapes.com",
    phone: "+1 (800) 555-VAPE",
    whatsapp: "+18005558273",
    address: "123 Vape Street, Los Angeles, CA 90001",
  },
  social: {
    instagram: "https://instagram.com/bulkvapes",
    twitter: "https://twitter.com/bulkvapes",
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
    discountPercent: 5, // AJOUT ICI
  },
  taxRate: 0.0825, 
   wholesale: {
    minOrderAmount: 500, // Example: $500 Minimum
  },
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },

  { label: "Categories", href: "/categories" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Disposables", href: "/category/disposables" },
      { label: "Pod Systems", href: "/category/pod-systems" },
      { label: "E-Liquids", href: "/category/e-liquids" },
      { label: "Accessories", href: "/category/accessories" },
    ],
  },
  
  
  { label: "Wholesale", href: "/wholesale" },
  {label: "Blog", href:"/blog"},
  { label: "FAQ", href: "/faq" },
  // { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const trustBadges: TrustBadge[] = [
  {
    icon: "shield-check",
    title: "Authentic Products",
    description: "100% genuine products from authorized distributors",
  },
  {
    icon: "truck",
    title: "Fast Shipping",
    description: "Free shipping on orders over $100",
  },
  {
    icon: "headphones",
    title: "24/7 Support",
    description: "Expert assistance whenever you need it",
  },
  {
    icon: "lock",
    title: "Secure Payments",
    description: "Your data is always protected",
  },
]

export const legalConfig = {




  ageRestriction: 21,
  fdaWarning: "WARNING: This product contains nicotine or THC. Nicotine and THC are addictive chemicals.",
  disclaimer:
    "Products sold on this website are intended for adults of legal smoking age only. By entering this site, you certify that you are of legal smoking age in your state.",
  complianceText:
    "BULK VAPES complies with all federal and state regulations regarding the sale of tobacco and nicotine products.",
}

// config/crypto-wallets.ts
export const CRYPTO_WALLETS: Record<string, string> = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", // Exemple BTC
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", // Exemple ETH
  usdt: "TVJ5dW2y4d1aF7H9kG4G3d2A1bE5cF6hI8",         // Exemple USDT (TRC20)
  ltc: "LQtp83kkfjhx0wlh2kgdygjrsqtzq2n0yrf249"      // Exemple LTC
}


