"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

// 1. Define the props interface
interface WholesaleCTAProps {
  minimumOrder?: string;
}

// 2. Add the prop to the component function
export function WholesaleCTA({ minimumOrder }: WholesaleCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 3. Move the array INSIDE the component to access the prop
  const benefits = [
    {
      icon: Percent,
      title: "Competitive Pricing",
      description: "Volume discounts up to 40% off retail",
    },
    {
      icon: Package,
      title: "Bulk Orders",
      // 4. Use the variable here (with a fallback)
      description: `Minimum order from just ${minimumOrder || "10 units"}`,
    },
    {
      icon: Truck,
      title: "Priority Shipping",
      description: "Express delivery for wholesale accounts",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      gsap.fromTo(
        ".benefit-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".benefits-list",
            start: "top 75%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 lg:py-24 px-6 lg:px-12 bg-accent/5">
      <div className="max-w-[1400px] mx-auto">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">For Business</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
              Wholesale
              <br />
              <span className="italic text-muted-foreground">Partners</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              We supply bulk quantities for retailers, distributors, and resellers.
              Wholesale pricing, minimum order quantities, and shipping details are available upon request.
            </p>

            <Button size="lg" className="group" asChild>
              <Link href="/wholesale">
                wholesale inquiries
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Benefits */}
          <div className="benefits-list space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="benefit-item flex items-start gap-5 p-6 bg-background rounded-sm border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}