"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, ShieldAlert, FileCheck, MapPin, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// --- 1. HARDCODED DATA (Untouched) ---
const stats = [
  { value: "5K+", label: "Happy Customers" },
  { value: "48H", label: "Fast Shipping" },
  { value: "24/7", label: "Support" },
]

// Define the type for the data coming from Sanity
interface Testimonial {
  content: string
  author: string
  role: string
}

interface TrustSectionProps {
  testimonials: Testimonial[]
}

export function TrustSection({ testimonials = [] }: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const displayTestimonials =
    testimonials.length > 0
      ? testimonials
      : [
          {
            content: "Waiting for Sanity data...",
            author: "Admin",
            role: "System",
          },
        ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
        },
      )

      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".testimonials-grid", start: "top 75%" },
        },
      )

      gsap.fromTo(
        ".compliance-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".compliance-grid", start: "top 90%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 lg:py-24 px-6 lg:px-12 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto">
        {/* --- HARDCODED STATS (Untouched) --- */}
        <div className="stats-grid grid grid-cols-3 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <p className="font-serif text-3xl md:text-5xl lg:text-6xl mb-2">{stat.value}</p>
              <p className="text-sm text-background/60 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- HEADING --- */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Testimonials</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Trusted by Thousands</h2>
        </div>

        {/* --- DYNAMIC TESTIMONIALS (From Sanity) --- */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {displayTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card p-8 border border-background/20 rounded-sm">
              <Quote className="h-8 w-8 text-accent mb-6" />
              <p className="text-background/90 leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-background/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- HARDCODED COMPLIANCE (Kept structure, wording adapted to gummies) --- */}
        <div className="compliance-grid border-t border-background/20 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* 1. Age Restriction */}
            <div className="compliance-item flex items-start gap-4">
              <div className="p-2 bg-background/10 rounded-full shrink-0">
                <ShieldAlert className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-serif text-lg mb-1">21+ Only</h4>
                <p className="text-sm text-background/60 leading-snug">
                  Age verification is required for restricted products. We strictly enforce age requirements.
                </p>
              </div>
            </div>

            {/* 2. Compliance Statement */}
            <div className="compliance-item flex items-start gap-4">
              <div className="p-2 bg-background/10 rounded-full shrink-0">
                <FileCheck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-serif text-lg mb-1">Policy & Compliance</h4>
                <p className="text-sm text-background/60 leading-snug">
                  Orders are reviewed and handled according to our site policies and applicable requirements.
                </p>
              </div>
            </div>

            {/* 3. Shipping Region */}
            <div className="compliance-item flex items-start gap-4">
              <div className="p-2 bg-background/10 rounded-full shrink-0">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-serif text-lg mb-1">U.S. Shipping</h4>
                <p className="text-sm text-background/60 leading-snug">
                  Reliable domestic shipping to eligible destinations. Restrictions may apply by location.
                </p>
              </div>
            </div>

            {/* 4. Contact Availability */}
            <div className="compliance-item flex items-start gap-4">
              <div className="p-2 bg-background/10 rounded-full shrink-0">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-serif text-lg mb-1">24/7 Support</h4>
                <p className="text-sm text-background/60 leading-snug">
                  Support available 24/7 for order questions and wholesale inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}