"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Truck, Headphones, Lock } from "lucide-react"
import { trustBadges } from "@/config/site.config"

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ElementType> = {
  "shield-check": Shield,
  truck: Truck,
  headphones: Headphones,
  lock: Lock,
}

export function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Cards stagger reveal
      gsap.fromTo(
        ".trust-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 lg:py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-20">
          <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
            Curated excellence
            <br />
            <span className="text-muted-foreground italic">for discerning tastes</span>
          </h2>
          <p ref={textRef} className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
            We source only the finest vaping products from authorized distributors, ensuring authenticity, quality, and
            unparalleled value for both retail customers and wholesale partners.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = iconMap[badge.icon] || Shield
            return (
              <div
                key={index}
                className="trust-card group p-8 border border-border rounded-sm hover:border-accent/50 transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
