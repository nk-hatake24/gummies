// app/wholesale/page.client.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import { 
  ArrowRight, CheckCircle2, CreditCard, Truck, 
  ShieldCheck, HelpCircle, Plus, Minus,
  
} from "lucide-react"
import { cn } from "@/lib/utils"

// Définition des types props (Doit matcher lib/sanity-data.ts)
interface WholesaleContentProps {
  data: {
    hero?: { title: string; description: string; highlights: string[]; buttonText: string };
    overview?: { title: string; content: string };
    pricingMoq?: { title: string; content: string };
    whyChoose?: { title: string; description: string; points: { title: string; desc: string }[] };
    process?: { steps: { stepNumber: string; title: string; description: string }[] };
    seoBlock?: { title: string; content: string };
    finalCta?: { title: string; description: string; buttonText: string };
    faqs?: { question: string; answer: string }[];
  };
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WholesaleContent({ data }: WholesaleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // --- CONTENU PAR DÉFAUT (FALLBACKS) BASÉ SUR TA DEMANDE ---
  
  const hero = {
    title: data.hero?.title || "Vape Wholesale Supply — Bulk Ordering for Commercial Buyers",
    description: data.hero?.description || "BulkVapes.us operates as a wholesale supply platform supporting businesses that source vape products in bulk quantities. This wholesale program is designed for retailers, resellers, and commercial buyers seeking structured pricing discussions, predictable availability, and repeat-order workflows.",
    highlights: data.hero?.highlights || [
      "Bulk and wholesale ordering focus",
      "Quantity-based pricing discussions",
      "Domestic and international fulfillment capability",
      "Product categories organized for resale and distribution"
    ],
    buttonText: data.hero?.buttonText || "Request Wholesale Pricing"
  }

  const overview = {
    title: data.overview?.title || "Wholesale Overview Content",
    content: data.overview?.content || "Wholesale sourcing differs from retail purchasing in that buyers typically evaluate suppliers based on consistency, operational fit, and long-term availability rather than single-order pricing alone. Businesses sourcing products in bulk often require clarity around ordering processes, quantity thresholds, and fulfillment expectations before initiating supply relationships. BulkVapes.us is structured to support this evaluation process by providing category-level visibility, bulk-ready product groupings, and a clear pathway for wholesale inquiries."
  }

  const pricingMoq = {
    title: data.pricingMoq?.title || "Pricing & MOQ Explanation",
    content: data.pricingMoq?.content || "Wholesale pricing is determined through volume-based discussions rather than fixed public rates. Minimum order quantities and pricing structures may vary by product category, brand grouping, and supply conditions. This approach allows wholesale buyers to assess suitability based on their ordering scale and resale model, while maintaining flexibility for repeat or expanding orders over time."
  }

  const whyChoose = {
    title: data.whyChoose?.title || "Why Choose Our Wholesale Program",
    description: data.whyChoose?.description || "The wholesale program is built around operational reliability rather than promotional incentives.",
    points: data.whyChoose?.points || [
      { title: "Supply-oriented model", desc: "Built specifically for bulk buyers." },
      { title: "Resale Category Coverage", desc: "Designed for resale and distribution." },
      { title: "Structured Process", desc: "Clear inquiry and order review process." },
      { title: "Long-term Alignment", desc: "Focus on repeat ordering and sustained supply." }
    ]
  }

  const processSteps = data.process?.steps || [
    { stepNumber: "01", title: "Browse Categories", description: "Browse bulk product categories relevant to your business." },
    { stepNumber: "02", title: "Submit Inquiry", description: "Submit a wholesale pricing or availability inquiry." },
    { stepNumber: "03", title: "Review Structure", description: "Review quantity considerations and ordering structure." },
    { stepNumber: "04", title: "Confirm Fulfillment", description: "Confirm fulfillment expectations and next steps." }
  ]

  const seoBlock = {
    content: data.seoBlock?.content || "Wholesale supply programs are typically used by businesses that require predictable sourcing, category depth, and the ability to reorder products as demand changes. Rather than focusing on individual units, wholesale buyers evaluate suppliers based on operational fit, communication clarity, and fulfillment reliability. BulkVapes.us positions its wholesale offering around these considerations, providing a structured entry point for businesses exploring bulk sourcing options across multiple product categories."
  }

  const finalCta = {
    title: data.finalCta?.title || "Wholesale Supply Designed for Ongoing Business Needs",
    description: data.finalCta?.description || "Begin a wholesale inquiry to determine whether the BulkVapes.us supply model aligns with your ordering scale, product requirements, and operational expectations.",
    buttonText: data.finalCta?.buttonText || "Start Wholesale Inquiry"
  }

  // --- ANIMATIONS GSAP ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Highlights Stagger
      gsap.fromTo(".highlight-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" }
      )

      // 2. Overview Fade Up
      gsap.fromTo(".fade-up-section",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".fade-up-section", start: "top 85%" } }
      )

      // 3. Why Choose Points
      gsap.fromTo(".benefit-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: ".benefits-grid", start: "top 80%" } }
      )

      // 4. Process Steps
      gsap.fromTo(".process-step", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: ".process-grid", start: "top 75%" } }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div>
      <div ref={containerRef} className="pt-24 lg:pt-28">
        
        {/* 1️⃣ WHOLESALE HERO SECTION */}
        <section className="px-6 lg:px-12 py-20 bg-foreground text-background relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto  gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Wholesale Portal</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
                {hero.title}
              </h1>
              <p className="text-lg text-background/80 mb-8 leading-relaxed">
                {hero.description}
              </p>
              
              {/* Highlights List */}
              <div className="space-y-3 mb-10">
                <p className="font-bold text-sm uppercase tracking-wider text-accent mb-3">Wholesale Highlights</p>
                <ul className="grid grid-cols-1 gap-2">
                  {hero.highlights.map((highlight, idx) => (
                    <li key={idx} className="highlight-item flex items-start gap-3 text-sm text-background/90">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-8 group" asChild>
                <Link href="/products">
                  {hero.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
           
          </div>
        </section>

        {/* 2️⃣ & 3️⃣ OVERVIEW & PRICING CONTENT */}
        <section className="px-6 lg:px-12 py-20 lg:py-28 bg-background">
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* Overview */}
            <div className="fade-up-section">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">{overview.title}</h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed">
                {overview.content}
              </div>
            </div>

            {/* Pricing & MOQ */}
            <div className="fade-up-section p-8 bg-secondary/10 rounded-lg border-l-4 border-accent">
              <h2 className="font-serif text-2xl md:text-3xl mb-4 flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-accent" />
                {pricingMoq.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {pricingMoq.content}
              </p>
            </div>
          </div>
        </section>

        {/* 4️⃣ WHY CHOOSE OUR PROGRAM */}
        <section className="px-6 lg:px-12 py-20 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">{whyChoose.title}</h2>
              <p className="text-background/70 text-lg">{whyChoose.description}</p>
            </div>

            <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChoose.points.map((point, idx) => (
                <div key={idx} className="benefit-card p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <ShieldCheck className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                  <p className="text-sm text-background/70">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5️⃣ HOW IT WORKS (PROCESS) */}
        <section className="px-6 lg:px-12 py-20 lg:py-28 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Workflow</p>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">How Wholesale Ordering Works</h2>
            </div>

            <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step relative group">
                  {index !== processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 right-0 w-full h-[1px] bg-border -z-10 translate-x-1/2" />
                  )}
                  <div className="bg-background pr-4 inline-block mb-4">
                    <span className="font-serif text-5xl text-accent/20 font-bold group-hover:text-accent transition-colors duration-300">
                      {step.stepNumber}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6️⃣ SEO CONTENT BLOCK (Low Visual Impact) */}
        <section className="px-6 lg:px-12 py-12 border-t border-border bg-muted/5">
          <div className="max-w-4xl mx-auto text-center">
             <p className="text-sm text-muted-foreground leading-loose italic">
               {seoBlock.content}
             </p>
          </div>
        </section>

        {/* 7️⃣ WHOLESALE FAQs (Dynamic from Sanity) */}
        {data.faqs && data.faqs.length > 0 && (
          <section className="px-6 lg:px-12 py-20 bg-background">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                 <div className="flex justify-center mb-4"><HelpCircle className="h-8 w-8 text-accent opacity-50"/></div>
                 <h2 className="font-serif text-3xl md:text-4xl">Common Questions</h2>
              </div>

              <div className="space-y-4">
                {data.faqs.map((item, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div key={index} className="border border-border rounded-lg bg-card overflow-hidden transition-all hover:border-accent/40">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                      >
                        <span className={cn("font-medium pr-8", isOpen ? "text-accent" : "text-foreground")}>
                          {item.question}
                        </span>
                        {isOpen ? <Minus className="h-5 w-5 flex-shrink-0 text-accent" /> : <Plus className="h-5 w-5 flex-shrink-0 text-muted-foreground" />}
                      </button>
                      
                      <div className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <div className="overflow-hidden">
                          <div className="px-5 pb-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-transparent">
                             {item.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* 8️⃣ FINAL WHOLESALE CTA */}
        <section className="px-6 lg:px-12 py-20 lg:py-32 bg-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <Truck className="h-12 w-12 text-accent mx-auto mb-6 opacity-80" />
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">{finalCta.title}</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {finalCta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="px-8 h-12 text-lg" asChild>
                <Link href="/products">{finalCta.buttonText}</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 h-12 text-lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}