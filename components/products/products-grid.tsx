"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { Check, Grid3X3, LayoutList, ShoppingBag, SlidersHorizontal } from "lucide-react"
// On retire l'import statique des produits
import { formatCurrency, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// Note: Le filtre mobile importe ProductFilters qui demande maintenant des props.
// Pour simplifier ici, on suppose que le filtre mobile recevra aussi les catégories si on veut le rendre parfait,
// mais pour ce snippet je me concentre sur la grille.
import { ProductFilters } from "@/components/products/product-filters"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"

interface ProductsGridProps {
  categoryFilter?: string
  initialProducts: any[] // <--- Données Sanity reçues du parent
}

type SortOption = "featured" | "newest" | "price-low" | "price-high" | "name"

export function ProductsGrid({ categoryFilter, initialProducts }: ProductsGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAdding, setIsAdding] = useState<string | false>(false) // Fix type
  const cart = useCart()
  const gridRef = useRef<HTMLDivElement>(null)

  // LOGIQUE DE FILTRAGE ET TRI (Client Side)
  const filteredProducts = useMemo(() => {
    // Copie de sécurité
    let result = [...(initialProducts || [])]

    // 1. Filtrage par catégorie
    if (categoryFilter) {
      // Dans Sanity, on a souvent category->slug.current ou une référence.
      // Assure-toi que ta projection GROQ renvoie 'categoryId' ou 'category.slug'
      result = result.filter((p) => p.categoryId === categoryFilter || p.category?.slug === categoryFilter)
    }

    // 2. Tri
    switch (sortBy) {
      case "newest":
        // Sanity utilise _createdAt
        result.sort((a, b) => new Date(b._createdAt || b.createdAt).getTime() - new Date(a._createdAt || a.createdAt).getTime())
        break
      case "price-low":
        result.sort((a, b) => {
          // On cherche le prix le plus bas parmi les variantes retail
          const getMinPrice = (p: any) => {
             const variants = p.variants || [];
             if(variants.length === 0) return 0;
             const retail = variants.filter((v:any) => !v.isWholesale);
             return Math.min(...(retail.length ? retail : variants).map((v:any) => v.price));
          }
          return getMinPrice(a) - getMinPrice(b)
        })
        break
      case "price-high":
        result.sort((a, b) => {
           const getMinPrice = (p: any) => {
             const variants = p.variants || [];
             if(variants.length === 0) return 0;
             const retail = variants.filter((v:any) => !v.isWholesale);
             return Math.min(...(retail.length ? retail : variants).map((v:any) => v.price));
          }
          return getMinPrice(b) - getMinPrice(a)
        })
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        // Gestion des tags Sanity (array de strings)
        result.sort((a, b) => {
            const aFeat = a.tags?.includes('featured') ? 1 : 0;
            const bFeat = b.tags?.includes('featured') ? 1 : 0;
            return bFeat - aFeat;
        })
        break
    }

    return result
  }, [categoryFilter, sortBy, initialProducts])

  useEffect(() => {
    // Animation GSAP inchangée
    const ctx = gsap.context(() => {
        gsap.fromTo(
        ".product-item",
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
        },
        )
    }, gridRef) // Scope au gridRef
    return () => ctx.revert()
  }, [filteredProducts, sortBy])

 
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    // Logique variante Sanity
    const firstVariant = product.variants && product.variants.length > 0 
      ? product.variants.find((v:any) => !v.isWholesale) || product.variants[0] // Préférer retail
      : null

    if (!firstVariant) {
        toast.error("Product unavailable")
        return
    }

    setIsAdding(product._id || product.id) // Utiliser ID Sanity

    cart.addItem(product, firstVariant, 1)

    toast.success("Added to cart", {
      description: `1 x ${product.name}`,
    })

    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {/* Note: Idéalement il faudrait passer les catégories ici aussi, 
                    mais pour l'instant cela affichera les filtres sans catégories dynamiques 
                    si on ne les passe pas. */}
                <ProductFilters categories={[]} /> 
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="hidden md:flex items-center border border-border rounded">
            <button
              className={cn("p-2 transition-colors", viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50")}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              className={cn("p-2 transition-colors", viewMode === "list" ? "bg-muted" : "hover:bg-muted/50")}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div
          ref={gridRef}
          className={cn(
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6",
          )}
        >
          {filteredProducts.map((product) => {
            // Helpers de prix pour l'affichage
            const variants = product.variants || [];
            const retailVariants = variants.filter((v:any) => !v.isWholesale);
            const displayVariants = retailVariants.length > 0 ? retailVariants : variants;
            
            const lowestPrice = displayVariants.length > 0 
                ? Math.min(...displayVariants.map((v:any) => v.price)) 
                : 0;
            
            const comparePrice = displayVariants[0]?.compareAtPrice;
            
            // Image Sanity : gestion sécurisée
            // Si tu as utilisé ma projection GROQ, l'URL est dans product.images[0].asset.url
            // Ou direct product.images[0].url selon ta config. Je mets une sécurité.
            const imageUrl = product.images?.[0]?.asset?.url || product.images?.[0]?.url || "/placeholder.svg";

            const productId = product._id || product.id;
            const isFeatured = product.tags?.includes('featured');
            const isNew = product.tags?.includes('new');
            const isBestseller = product.tags?.includes('bestseller');

            // --- LIST VIEW ---
            if (viewMode === "list") {
              return (
                <Link
                  key={productId}
                  href={`/product/${product.slug}`}
                  className="product-item group flex gap-6 p-4 border border-border rounded-sm hover:border-accent/50 transition-colors"
                >
                  <div className="relative w-32 h-32 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        {product.tags?.[0] || "Vape"}
                    </p>
                    <h3 className="font-medium text-lg group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="font-medium">From {formatCurrency(lowestPrice)}</span>
                      {comparePrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatCurrency(comparePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            }

            // --- GRID VIEW (Default) ---
            return (
              <Link key={productId} href={`/product/${product.slug}`} className="product-item group block">
                {/* Image */}
                <div className="relative aspect-square bg-muted rounded-sm overflow-hidden mb-4">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {isNew && (
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-accent text-accent-foreground rounded-sm">
                        New
                      </span>
                    )}
                    {isBestseller && (
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-foreground text-background rounded-sm">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    {product.tags?.[0] || "Product"}
                  </p>
                  <h3 className="font-medium group-hover:text-accent transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-medium">From {formatCurrency(lowestPrice)}</span>
                    {comparePrice && (
                      <span className="text-sm text-muted-foreground line-through">{formatCurrency(comparePrice)}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                    <Button
                    size="lg"
                    className="w-full gap-2"
                    // Si pas de stock global ou process d'ajout en cours
                    disabled={isAdding === productId}
                    onClick={(e) => handleAddToCart(e, product)}
                    >
                    {isAdding === productId ? (
                        <>
                        <Check className="h-5 w-5 animate-in zoom-in" />
                        Added
                        </>
                    ) : (
                        <>
                        <ShoppingBag className="h-5 w-5" />
                        Add to Cart
                        </>
                    )}
                    </Button>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}