"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScanSearch, Send, MailOpen, PackageCheck, ArrowRight, Bitcoin, CreditCard, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: "01",
    title: "Browse & Select",
    description: "Browse the product catalog and available variants.",
    icon: ScanSearch,
  },
  {
    id: "02",
    title: "Submit Request",
    description: "Submit a manual order request via our wholesale form.",
    icon: Send,
  },
  {
    id: "03",
    title: "Receive Invoice",
    description: "Receive precise payment details from our team via email.",
    icon: MailOpen,
  },
  {
    id: "04",
    title: "Order Processed",
    description: "Order is confirmed and processed manually for shipping.",
    icon: PackageCheck,
  },
]

export function HowToOrderSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Timeline Title Animation
      gsap.fromTo(
        ".order-title",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )

      // 2. Timeline Steps Animation
      gsap.fromTo(
        ".step-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".steps-container", start: "top 75%" },
        }
      )
      
      // 3. Timeline Line Animation
      gsap.fromTo(
        ".step-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: "power3.inOut",
          scrollTrigger: { trigger: ".steps-container", start: "top 75%" },
        }
      )

      // 4. Discount Cards Animation (New)
      gsap.fromTo(
        ".discount-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".discounts-container", start: "top 85%" },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 lg:px-12 bg-background border-b border-border/40">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- PART 1: TIMELINE STEPS --- */}
        <div className="text-center mb-16 order-title">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-semibold">Simple Process</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">
            How to Order
          </h2>
        </div>

        <div className="steps-container relative mb-24">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-secondary step-line origin-left z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="step-card relative z-10 group">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  {/* Icon */}
                  <div className="w-24 h-24 rounded-full bg-background border-2 border-secondary group-hover:border-accent transition-colors duration-500 flex items-center justify-center mb-6 shadow-sm">
                    <step.icon className="w-10 h-10 text-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                  {/* Number */}
                  <span className="text-6xl font-serif text-secondary/30 absolute top-0 right-0 lg:right-auto lg:left-16 -z-10 select-none group-hover:text-accent/10 transition-colors duration-500">
                    {step.id}
                  </span>
                  {/* Text */}
                  <h3 className="text-xl font-serif font-medium mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
                {/* Mobile Arrow */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 text-secondary">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- PART 2: PAYMENT DISCOUNTS (Added) --- */}
        <div className="discounts-container">
          <div className="text-center mb-10">
             <h3 className="font-serif text-2xl md:text-3xl">Available Discounts</h3>
             <p className="text-muted-foreground mt-2">Savings are applied automatically at invoicing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Card 1: Crypto (-10%) */}
            <div className="discount-card relative group overflow-hidden rounded-sm border border-accent/20 bg-accent/5 p-4 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-background rounded-full border border-accent/20">
                  <Bitcoin className="w-8 h-8 text-orange-500" />
                </div>
                <span className="px-4 py-1 bg-accent text-white text-sm font-bold rounded-full shadow-sm">
                  -10% OFF
                </span>
              </div>
              <h4 className="font-serif text-2xl mb-2 text-foreground">Pay with Crypto</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Pay with Crypto & Get 10% Off Your Bulk Order. Fast, secure, and discounted. Wallet addresses displayed at checkout.
              </p>
              <div className="flex gap-2 text-xs text-muted-foreground font-mono uppercase tracking-wide">
                <span>BTC</span> • <span>ETH</span> • <span>USDT</span>
              </div>
            </div>

            {/* Card 2: Revolut (-5%) */}
            <div className="discount-card relative group overflow-hidden rounded-sm border border-border bg-background p-4 transition-all hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/5">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-secondary/50 rounded-full text-blue-600">
                  <CreditCard className="w-8 h-8" />
                </div>
                <span className="px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full shadow-sm">
                  -5% OFF
                </span>
              </div>
              <h4 className="font-serif text-2xl mb-2 text-foreground">Pay with Revolut</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Use Revolut for a direct instant transfer and enjoy a 5% discount on your total invoice.
              </p>
              
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}