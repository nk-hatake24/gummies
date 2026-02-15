"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowUp } from "lucide-react"

export function ProductBottomCta({ productName }: { productName: string }) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="border-t border-border bg-background py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center bg-foreground text-background rounded-2xl p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <h2 className="font-serif text-3xl md:text-4xl mb-4 relative z-10">
          Ready to order {productName}?
        </h2>
        <p className="text-background/80 text-lg mb-8 max-w-xl mx-auto relative z-10">
          Secure your stock today. Need help with a large wholesale order? Our team is online.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          {/* Bouton Contact */}
          <Button variant="outline" size="lg" className="h-14 px-8 border-background/20 text-foreground hover:bg-background hover:text-background hover:bg-opacity-20 hover:bg-accent" asChild>
            <Link href="/contact">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Support
            </Link>
          </Button>

          {/* Bouton Buy Now (Scroll Up) */}
          <Button size="lg" className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90" onClick={scrollToTop}>
            Buy Now
            <ArrowUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}