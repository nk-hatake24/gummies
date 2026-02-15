"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Package, Truck, ArrowRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sécurisation de l'enregistrement du plugin pour Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: "01",
    title: "Browse Catalog",
    description: "Explore our extensive range of top-tier vape products. Filtering by THC, Nicotine, or CBD to find exactly what your customers want.",
  },
  {
    number: "02",
    title: "No Account Needed",
    description: "Add items directly to your cart. We do not require a lengthy signup process. Just browse and build your order.",
  },
  {
    number: "03",
    title: "Submit Request",
    description: "Head to checkout and submit your order request. You can choose to pay via Crypto (10% off) or Bank Wire.",
  },
  {
    number: "04",
    title: "We Contact You",
    description: "Our team will review your order details and contact you via Email or WhatsApp to finalize payment and shipping.",
  },
]

export function WholesaleProcess() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animation des étapes (01, 02, 03, 04)
      gsap.fromTo(
        ".process-step",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
          },
        },
      )

      // 2. Animation des cartes d'info (MOQ & Shipping)
      gsap.fromTo(
        ".info-card",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".info-grid",
            start: "top 85%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">How it works</p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight">Wholesale Process</h2>
        </div>

        {/* Steps Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="process-step relative group">
              {/* Decorative line between steps (Desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-full h-[1px] bg-border -z-10 translate-x-1/2" />
              )}
              
              <div className="bg-background pr-4 inline-block">
                <span className="font-serif text-5xl text-accent/20 font-bold mb-4 block group-hover:text-accent transition-colors duration-300">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Info Cards Grid (MOQ & Shipping) */}
        <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* MOQ Card */}
          <div className="info-card p-8 rounded-lg bg-secondary/20 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-accent">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl">Minimum Order (MOQ)</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span><strong className="text-foreground">$500</strong> Minimum Order Value</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span><strong className="text-foreground">10 Units</strong> Per SKU (Mix & Match allowed for samples)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span>Must provide valid Business ID for tax verification (handled after checkout).</span>
              </li>
            </ul>
          </div>

          {/* Shipping Card */}
          <div className="info-card p-8 rounded-lg bg-secondary/20 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-accent">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl">Shipping & Returns</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span><strong className="text-foreground">Free Shipping</strong> on orders over $2,000 (US Only).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span>Orders process within 24-48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span>Damaged items must be reported within 48 hours of delivery for full credit.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Actions */}
        <div className="info-card flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12" asChild>
            <Link href="/products">
              Start My Order <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-12" asChild>
            <Link href="/contact">
              <HelpCircle className="mr-2 h-5 w-5" /> Contact Support
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}