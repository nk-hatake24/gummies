// components/layout/header.client.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { Menu, X, ShoppingBag, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { navigation, siteConfig } from "@/config/site.config"
import { Button } from "@/components/ui/button"
import { CartSidebar } from "@/components/cart/cart-sidebar"
import { urlFor } from "@/sanity/lib/image"

// Types
interface CategoryData {
  _id: string
  name: string
  slug: string
  image?: any
}

interface HeaderProps {
  categories: CategoryData[]
}

export function Header({ categories = [] }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // État pour le sous-menu mobile
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false)

  const pathname = usePathname()
  const { itemCount } = useCart()

  // Gestion du Scroll pour le background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Bloquer le scroll quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isMobileMenuOpen])

  // Animation d'entrée
  useEffect(() => {
    gsap.fromTo(".header-content", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
  }, [])

  // Fermer le menu au changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMobileCategoryOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isMobileMenuOpen 
            ? "bg-background border-b border-border" 
            : isScrolled 
              ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" 
              : "bg-background/60 border-b-0",
        )}
      >
        <div className="header-content max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            {/* Logo */}
            <Link href="/" className="relative z-10 font-serif text-xl lg:text-2xl tracking-tight font-medium">
              {siteConfig.name}
            </Link>

            {/* --- DESKTOP NAV --- */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navigation.map((item) => {
                // LOGIQUE DROPDOWN POUR "CATEGORIES"
                if (item.label === "Categories") {
                  return (
                    <div key={item.label} className="group relative h-20 lg:h-24 flex items-center">
                      <Link
                        href="/categories"
                        className={cn(
                          "flex items-center gap-1 text-sm tracking-wide uppercase transition-colors duration-300 hover:text-accent py-4",
                          pathname.startsWith("/category") ? "text-accent" : "text-foreground/80"
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      </Link>

                      {/* LE DROPDOWN */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-background border border-border rounded-b-lg shadow-xl opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out p-6 grid grid-cols-2 gap-4 cursor-default">
                        {/* Ligne décorative */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
                        
                        {categories.map((cat) => (
                          <Link 
                            key={cat._id} 
                            href={`/category/${cat.slug}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                          >
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0 border border-border group-hover/item:border-accent/50 transition-colors">
                              {cat.image ? (
                                <Image src={urlFor(cat.image).url()} alt={cat.name} fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground"><span className="text-[10px]">IMG</span></div>
                              )}
                            </div>
                            <div>
                                <h4 className="font-medium text-sm group-hover/item:text-accent transition-colors">{cat.name}</h4>
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all">
                                    Browse <ChevronRight className="h-3 w-3" />
                                </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                // LIENS STANDARD
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm tracking-wide uppercase transition-colors duration-300 hover:text-accent",
                      pathname === item.href ? "text-accent" : "text-foreground/80",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Actions (Cart & Menu Mobile) */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-transparent hover:text-accent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-transparent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAV --- */}
        <div className={cn("lg:hidden fixed inset-0 top-20 bg-background z-40 transition-all duration-500 overflow-y-auto pb-20", isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
          <nav className="flex flex-col px-6 pt-8 gap-6">
            {navigation.map((item) => {
              // LOGIQUE MOBILE POUR CATEGORIES (ACCORDÉON)
              if (item.label === "Categories") {
                return (
                  <div key={item.label} className="border-b border-border pb-4">
                    <button 
                        onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                        className="flex items-center justify-between w-full text-2xl font-serif tracking-tight text-foreground"
                    >
                        {item.label}
                        <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", isMobileCategoryOpen && "rotate-180")} />
                    </button>
                    
                    <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isMobileCategoryOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]")}>
                        <div className="overflow-hidden">
                            <div className="flex flex-col gap-4 pl-4 border-l-2 border-border/50">
                                {categories.map((cat) => (
                                    <Link key={cat._id} href={`/category/${cat.slug}`} className="text-lg text-muted-foreground hover:text-accent transition-colors">
                                        {cat.name}
                                    </Link>
                                ))}
                                <Link href="/categories" className="text-sm font-bold uppercase tracking-wider text-accent mt-2">View All Categories</Link>
                            </div>
                        </div>
                    </div>
                  </div>
                )
              }
              // LIENS MOBILE STANDARD
              return (
                <Link key={item.href} href={item.href} className={cn("text-2xl font-serif tracking-tight border-b border-border pb-4", pathname === item.href ? "text-accent" : "text-foreground")}>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}