// ============================================
// BULK VAPES - Products Configuration
// Edit this file to manage your product catalog
// ============================================

import type { Product, Category } from "@/lib/types"

export const categories: Category[] = [
  {
    id: "disposables",
    slug: "disposables",
    name: "Disposables",
    description: "Premium disposable vapes with exceptional flavor and long-lasting battery life.",
    image: "/sleek-disposable-vape-device-minimal.jpg",
    order: 1,
  },
  {
    id: "pod-systems",
    slug: "pod-systems",
    name: "Pod Systems",
    description: "Refillable pod systems for the ultimate vaping experience.",
    image: "/modern-pod-vape-system-minimal.jpg",
    order: 2,
  },
  {
    id: "e-liquids",
    slug: "e-liquids",
    name: "E-Liquids",
    description: "Premium e-liquids in a variety of flavors and nicotine strengths.",
    image: "/premium-e-liquid-bottles-minimal.jpg",
    order: 3,
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    description: "Essential accessories for your vaping needs.",
    image: "/vape-accessories-chargers-cases-minimal.jpg",
    order: 4,
  },
]

export const products: Product[] = [
  {
    id: "elf-bar-bc5000",
    slug: "elf-bar-bc5000",
    name: "Elf Bar BC5000",
    shortDescription: "Rechargeable disposable with 5000 puffs",
    description:
      "The Elf Bar BC5000 is a premium rechargeable disposable vape featuring 5000 puffs, 13ml of e-liquid, and a 650mAh rechargeable battery. Experience smooth draws and exceptional flavor with every puff.",
    categoryId: "disposables",
    images: [
      {
        id: "eb-1",
        url: "/elf-bar-bc5000-vape-device-elegant.jpg",
        alt: "Elf Bar BC5000 - Front View",
        isPrimary: true,
      },
      {
        id: "eb-2",
        url: "/elf-bar-bc5000-side-view-minimal.jpg",
        alt: "Elf Bar BC5000 - Side View",
        isPrimary: false,
      },
    ],
    variants: [
      {
        id: "eb-single",
        name: "Single",
        sku: "EB-BC5000-1",
        price: 19.99,
        compareAtPrice: 24.99,
        quantity: 1,
        minOrder: 1,
        maxOrder: 10,
        inStock: true,
        isWholesale: false,
        imageId: "eb-1",
      },
      {
        id: "eb-3pack",
        name: "3-Pack",
        sku: "EB-BC5000-3",
        price: 54.99,
        compareAtPrice: 74.97,
        quantity: 3,
        minOrder: 1,
        maxOrder: 20,
        inStock: true,
        isWholesale: false,
        imageId: "eb-2",
      },
      {
        id: "eb-6pack",
        name: "6-Pack",
        sku: "EB-BC5000-6",
        price: 99.99,
        compareAtPrice: 149.94,
        quantity: 6,
        minOrder: 1,
        maxOrder: 50,
        inStock: true,
        isWholesale: false,
        imageId: "eb-2",
      },
      {
        id: "eb-case",
        name: "Case (10 Units)",
        sku: "EB-BC5000-10",
        price: 149.99,
        compareAtPrice: 199.9,
        quantity: 10,
        minOrder: 1,
        maxOrder: 100,
        inStock: true,
        isWholesale: true,
        imageId: "eb-1",
      },
    ],
    specs: [
      { label: "Puff Count", value: "5000 Puffs" },
      { label: "Battery", value: "650mAh (Rechargeable)" },
      { label: "E-Liquid", value: "13ml" },
      { label: "Nicotine", value: "50mg (5%)" },
      { label: "Charging", value: "USB-C" },
    ],
    tags: ["disposable", "rechargeable", "bestseller"],
    featured: true,
    new: false,
    bestseller: true,
    inStock: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "lost-mary-os5000",
    slug: "lost-mary-os5000",
    name: "Lost Mary OS5000",
    shortDescription: "Sleek design with 5000 puffs capacity",
    description:
      "Lost Mary OS5000 features an innovative mesh coil technology for superior flavor production. With 5000 puffs and a rechargeable 650mAh battery, enjoy extended vaping sessions with consistent performance.",
    categoryId: "disposables",
    images: [
      {
        id: "lm-1",
        url: "/lost-mary-os5000-vape-sleek-modern.jpg",
        alt: "Lost Mary OS5000 - Front View",
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: "lm-single",
        name: "Single",
        sku: "LM-OS5000-1",
        price: 18.99,
        compareAtPrice: 22.99,
        quantity: 1,
        minOrder: 1,
        maxOrder: 10,
        inStock: true,
        isWholesale: false,
        imageId: "lm-1",
      },
      {
        id: "lm-3pack",
        name: "3-Pack",
        sku: "LM-OS5000-3",
        price: 52.99,
        compareAtPrice: 68.97,
        quantity: 3,
        minOrder: 1,
        maxOrder: 20,
        inStock: true,
        isWholesale: false,
        imageId: "lm-1",
      },
      {
        id: "lm-case",
        name: "Case (10 Units)",
        sku: "LM-OS5000-10",
        price: 139.99,
        compareAtPrice: 189.9,
        quantity: 10,
        minOrder: 1,
        maxOrder: 100,
        inStock: true,
        isWholesale: true,
        imageId: "lm-1",
      },
    ],
    specs: [
      { label: "Puff Count", value: "5000 Puffs" },
      { label: "Battery", value: "650mAh (Rechargeable)" },
      { label: "E-Liquid", value: "13ml" },
      { label: "Nicotine", value: "50mg (5%)" },
      { label: "Coil", value: "Mesh Coil" },
    ],
    tags: ["disposable", "rechargeable", "new"],
    featured: true,
    new: true,
    bestseller: false,
    inStock: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "geek-bar-pulse",
    slug: "geek-bar-pulse",
    name: "Geek Bar Pulse",
    shortDescription: "Dual mode with up to 15000 puffs",
    description:
      "The Geek Bar Pulse revolutionizes disposable vaping with dual modes: Regular mode offers up to 15000 puffs, while Pulse mode delivers 7500 puffs with enhanced flavor. Features a full screen display and 650mAh rechargeable battery.",
    categoryId: "disposables",
    images: [
      {
        id: "gb-1",
        url: "/geek-bar-pulse-vape-futuristic-display.jpg",
        alt: "Geek Bar Pulse - Front View",
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: "gb-single",
        name: "Single",
        sku: "GB-PULSE-1",
        price: 24.99,
        compareAtPrice: 29.99,
        quantity: 1,
        minOrder: 1,
        maxOrder: 10,
        inStock: true,
        isWholesale: false,
        imageId: "gb-1",
      },
      {
        id: "gb-3pack",
        name: "3-Pack",
        sku: "GB-PULSE-3",
        price: 69.99,
        compareAtPrice: 89.97,
        quantity: 3,
        minOrder: 1,
        maxOrder: 20,
        inStock: true,
        isWholesale: false,
        imageId: "gb-1",
      },
      {
        id: "gb-case",
        name: "Case (5 Units)",
        sku: "GB-PULSE-5",
        price: 109.99,
        compareAtPrice: 149.95,
        quantity: 5,
        minOrder: 1,
        maxOrder: 50,
        inStock: true,
        isWholesale: true,
        imageId: "gb-1",
      },
    ],
    specs: [
      { label: "Puff Count", value: "Up to 15000 Puffs" },
      { label: "Battery", value: "650mAh (Rechargeable)" },
      { label: "E-Liquid", value: "16ml" },
      { label: "Nicotine", value: "50mg (5%)" },
      { label: "Display", value: "Full Screen" },
      { label: "Modes", value: "Regular / Pulse" },
    ],
    tags: ["disposable", "rechargeable", "high-puff", "featured"],
    featured: true,
    new: true,
    bestseller: true,
    inStock: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "uwell-caliburn-g3",
    slug: "uwell-caliburn-g3",
    name: "Uwell Caliburn G3",
    shortDescription: "Premium refillable pod system",
    description:
      "The Uwell Caliburn G3 represents the pinnacle of pod system technology. Featuring a 900mAh battery, top-fill 2.5ml pod, and Pro-FOCS flavor technology, experience unparalleled flavor and vapor production.",
    categoryId: "pod-systems",
    images: [
      {
        id: "uc-1",
        url: "/uwell-caliburn-g3-pod-system-premium.jpg",
        alt: "Uwell Caliburn G3 - Front View",
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: "uc-device",
        name: "Device Kit",
        sku: "UW-CG3-KIT",
        price: 34.99,
        compareAtPrice: 44.99,
        quantity: 1,
        minOrder: 1,
        maxOrder: 10,
        inStock: true,
        isWholesale: false,
        imageId: "uc-1",
      },
      {
        id: "uc-pods",
        name: "Replacement Pods (4-Pack)",
        sku: "UW-CG3-PODS",
        price: 14.99,
        compareAtPrice: 19.99,
        quantity: 4,
        minOrder: 1,
        maxOrder: 50,
        inStock: true,
        isWholesale: false,
        imageId: "uc-1",
      },
      {
        id: "uc-wholesale",
        name: "Wholesale Kit (10 Devices)",
        sku: "UW-CG3-WS10",
        price: 279.99,
        compareAtPrice: 349.9,
        quantity: 10,
        minOrder: 1,
        maxOrder: 20,
        inStock: true,
        isWholesale: true,
        imageId: "uc-1",  
      },
    ],
    specs: [
      { label: "Battery", value: "900mAh" },
      { label: "Pod Capacity", value: "2.5ml" },
      { label: "Wattage", value: "25W Max" },
      { label: "Coil", value: "Caliburn G3 Mesh" },
      { label: "Charging", value: "USB-C" },
    ],
    tags: ["pod-system", "refillable", "premium"],
    featured: false,
    new: false,
    bestseller: true,
    inStock: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "naked-100-menthol",
    slug: "naked-100-menthol",
    name: "Naked 100 Brain Freeze",
    shortDescription: "Premium menthol e-liquid",
    description:
      "Naked 100 Brain Freeze delivers a refreshing blend of strawberry, kiwi, and pomegranate with an icy menthol finish. Made with premium ingredients for a smooth, satisfying vape experience.",
    categoryId: "e-liquids",
    images: [
      {
        id: "nk-1",
        url: "/naked-100-e-liquid-bottle-premium.jpg",
        alt: "Naked 100 Brain Freeze - Bottle",
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: "nk-60ml",
        name: "60ml Bottle",
        sku: "NK-BF-60",
        price: 24.99,
        compareAtPrice: 29.99,
        quantity: 1,
        minOrder: 1,
        maxOrder: 20,
        inStock: true,
        isWholesale: false,
        imageId: "nk-1",
      },
      {
        id: "nk-3pack",
        name: "3-Pack (60ml each)",
        sku: "NK-BF-3X60",
        price: 64.99,
        compareAtPrice: 89.97,
        quantity: 3,
        minOrder: 1,
        maxOrder: 10,
        inStock: true,
        isWholesale: false,
        imageId: "nk-1",
      },
    ],
    specs: [
      { label: "Size", value: "60ml" },
      { label: "Nicotine", value: "3mg / 6mg" },
      { label: "VG/PG", value: "70/30" },
      { label: "Flavor Profile", value: "Fruit / Menthol" },
    ],
    tags: ["e-liquid", "menthol", "premium"],
    featured: false,
    new: false,
    bestseller: false,
    inStock: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
]

// Helper functions to query products
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller)
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.new)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}
