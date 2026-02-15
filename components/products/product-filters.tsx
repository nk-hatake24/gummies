"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
// On retire l'import statique 'categories' ici
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ProductFiltersProps {
  currentCategory?: string;
  categories: any[]; // <--- Les catégories viennent maintenant des props
}

const priceRanges = [
  { id: "under-25", label: "Under $25", min: 0, max: 25 },
  { id: "25-50", label: "$25 - $50", min: 25, max: 50 },
  { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "over-100", label: "Over $100", min: 100, max: Number.POSITIVE_INFINITY },
]

const availability = [
  { id: "in-stock", label: "In Stock" },
  { id: "wholesale", label: "Wholesale Available" },
]

export function ProductFilters({ currentCategory, categories }: ProductFiltersProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    availability: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Vérification de sécurité
  const safeCategories = categories || [];

  return (
    <div className="space-y-8">
      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <h3 className="font-medium">Categories</h3>
          <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.categories && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <ul className="space-y-3">
            <li>
              <Link
                href="/products"
                className={cn(
                  "text-sm transition-colors hover:text-accent",
                  pathname === "/products" && !currentCategory ? "text-accent font-medium" : "text-muted-foreground",
                )}
              >
                All Products
              </Link>
            </li>
            {/* Boucle sur les données Sanity */}
            {safeCategories.map((category) => (
              <li key={category._id || category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={cn(
                    "text-sm transition-colors hover:text-accent",
                    currentCategory === category.slug ? "text-accent font-medium" : "text-muted-foreground",
                  )}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <h3 className="font-medium">Price</h3>
          <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.price && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center gap-3">
                <Checkbox id={range.id} />
                <Label htmlFor={range.id} className="text-sm text-muted-foreground cursor-pointer">
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Availability */}
      <Collapsible open={openSections.availability} onOpenChange={() => toggleSection("availability")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <h3 className="font-medium">Availability</h3>
          <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.availability && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-3">
            {availability.map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <Checkbox id={option.id} />
                <Label htmlFor={option.id} className="text-sm text-muted-foreground cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      <button className="text-sm text-accent hover:underline">Clear all filters</button>
    </div>
  )
}