import type { MetadataRoute } from "next"
import { products, categories } from "@/config/products.config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https:localhost:3000"

  // Static pages
  const staticPages = [
    "/",
    "/products",
    "/faq",
    "/blog",
    "/wholesale",
    "/contact",
    "/privacy",
    "/terms",
    "/shipping",
    "/refunds",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2025-01-01"), // stable baseline
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.7,
  }))

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date( Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Product pages (🔥 most important)
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
