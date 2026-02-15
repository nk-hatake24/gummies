"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, ShieldCheck, Bitcoin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Lightning Fast Speed",
    description: "Orders processed within 24 hours. Priority shipping available for wholesale partners.",
    icon: Zap,
  },
  {
    title: "Authenticity Guaranteed",
    description: "We source directly from manufacturers. 100% genuine products, every time.",
    icon: ShieldCheck,
  },
  {
    title: "Crypto Discounts",
    description: "Save 10% instantly when you pay with Bitcoin, Ethereum, or USDT.",
    icon: Bitcoin,
  },
]

export function WhyChooseUS() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the Header (H4 + H2)
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      )

      // 2. Animate the 3 Columns (Staggered)
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2, // Time between each item appearing
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 px-6 lg:px-24 bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16 max-w-2xl mx-auto">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
            Why Choose Us
          </h4>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-foreground">
            Built for Customers & Retailers
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item flex flex-col items-center text-center p-6 rounded-lg hover:bg-secondary/20 transition-colors duration-300"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 text-foreground">
                <feature.icon strokeWidth={1.5} className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}