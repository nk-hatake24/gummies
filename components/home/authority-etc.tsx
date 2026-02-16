"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShieldCheck, Globe2, Scale, Building2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Building2,
    title: "Retail & Wholesale Ready",
    description: "Structured ordering for customers, retailers, and bulk buyers.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    description: "Curated products with clear labeling and consistent sourcing standards.",
  },
  {
    icon: Scale,
    title: "Compliance-Aware Operations",
    description: "Age-gated storefront and policy-driven handling aligned with applicable rules.",
  },
  {
    icon: Globe2,
    title: "Reliable Fulfillment",
    description: "Consistent processing with domestic shipping workflows for eligible destinations.",
  },
]

export function AuthoritySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".authority-text",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      )

      gsap.fromTo(
        ".authority-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".authority-grid", start: "top 85%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-secondary/20 border-y border-border/40">
      <div className="max-w-4xl mx-auto flex justify-center text-center px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:gap-20 items-center">
          {/* Main Copy */}
          <div className="authority-text">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-accent text-xs uppercase tracking-wider mb-6">
                Trusted Partner
              </div>

              <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-6 lg:mb-10 leading-tight">
                Authority & <br className="hidden md:block" />
                <span className="text-muted-foreground">Trust Signals</span>
              </h2>
            </div>

            <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              <p className="mb-2">
                <strong className="text-foreground">GUMMIESSHOP</strong> is a gummies-focused storefront built for both
                direct customers and wholesale inquiries.
              </p>
              <p className="mb-2">
                We emphasize clear product information, consistent sourcing standards, and a structured process for bulk
                requests and repeat ordering.
              </p>
              <p>
                Orders are handled with discretion, policy-driven review, and reliable fulfillment workflows for
                eligible destinations.
              </p>
            </div>
          </div>

          {/* Optional Features Grid (enable if you want the cards) */}
          {/* 
          <div className="authority-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="authority-card p-6 bg-background rounded-lg border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{feature.description}</p>
              </div>
            ))}
          </div>
          */}
        </div>
      </div>
    </section>
  )
}