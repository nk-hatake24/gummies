"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Info, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { moqConfig } from "@/config/moq.config"

gsap.registerPlugin(ScrollTrigger)

export function MoqPageContent() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header & Main Threshold
      gsap.fromTo(
        ".moq-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )

      gsap.fromTo(
        ".threshold-card",
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          delay: 0.2, 
          ease: "back.out(1.7)" 
        }
      )

      // 2. Product Cards (Stagger)
      gsap.fromTo(
        ".product-req-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
          },
        },
      )

      // 3. Samples Section
      gsap.fromTo(
        ".samples-section",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".samples-section",
            start: "top 75%",
          },
        },
      )
      
      // 4. Benefits (Stagger)
      gsap.fromTo(
        ".benefit-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 85%",
          },
        },
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- Header --- */}
        <div className="moq-header text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
            {moqConfig.header.label}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">
            {moqConfig.header.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {moqConfig.header.description}
          </p>
        </div>

        {/* --- Main Threshold Card --- */}
        <div className="threshold-card bg-foreground text-background rounded-sm p-8 md:p-12 text-center mb-20 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-background/70 mb-2">
              {moqConfig.mainThreshold.label}
            </h2>
            <div className="text-6xl md:text-8xl font-serif font-bold text-accent mb-6">
              {moqConfig.mainThreshold.amount}
            </div>
            <p className="text-background/80 max-w-xl mx-auto leading-relaxed">
              {moqConfig.mainThreshold.description}
            </p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        </div>

        {/* --- Product Specific Requirements --- */}
        <div className="mb-24">
          <h3 className="text-2xl font-serif mb-10 text-center">Product Specific Requirements</h3>
          <div className="products-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {moqConfig.products.map((product, index) => (
              <div 
                key={index} 
                className="product-req-card bg-secondary/10 border border-border rounded-sm p-8 hover:border-accent/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6 text-accent shadow-sm">
                  <product.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-medium mb-6">{product.title}</h4>
                <ul className="space-y-4">
                  {product.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <ArrowRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Sample Orders & Benefits Split --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Sample Orders */}
          <div className="samples-section bg-accent/5 border border-accent/20 rounded-sm p-8 md:p-10">
             <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-accent" />
                <h3 className="text-2xl font-serif">{moqConfig.samples.title}</h3>
             </div>
             <p className="text-muted-foreground mb-8 leading-relaxed">
               {moqConfig.samples.description}
             </p>
             <div className="flex flex-wrap gap-4 mb-8">
               {moqConfig.samples.features.map((feature, i) => (
                 <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-background border border-border text-xs font-medium">
                   {feature}
                 </span>
               ))}
             </div>
             <Button variant="outline" className="w-full sm:w-auto group" asChild>
               <Link href="/contact?subject=SampleRequest">
                 Contact Account Manager
                 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </Link>
             </Button>
          </div>

          {/* Right: Why Our MOQ Benefits You */}
          <div>
            <div className="mb-8">
               <h3 className="text-2xl font-serif mb-2">Why Our MOQ Structure Benefits You</h3>
               <p className="text-sm text-muted-foreground">Designed to support sustainable business growth.</p>
            </div>
            
            <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              {moqConfig.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="flex items-center gap-3 mb-2">
                    <benefit.icon className="h-5 w-5 text-accent" />
                    <h4 className="font-medium text-foreground">{benefit.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="font-medium mb-4">Questions about MOQ requirements?</p>
              <Button asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" /> Contact Support Team
                </Link>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}