"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Plus, Minus, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// --- TYPES ---
interface FAQItem {
  _key: string // Sanity provides a _key for arrays
  question: string
  answer: string
}

interface ProductFAQProps {
  items: FAQItem[]
}

// --- SINGLE ACCORDION ITEM COMPONENT ---
function AccordionItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)

  // GSAP Animation for opening/closing
  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.1
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }, [isOpen])

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-base md:text-lg font-medium transition-colors duration-300",
          isOpen ? "text-accent" : "text-foreground group-hover:text-accent/80"
        )}>
          {item.question}
        </span>
        <span className="ml-4 flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors">
          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </span>
      </button>

      <div 
        ref={contentRef} 
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="pb-6 text-muted-foreground leading-relaxed text-sm md:text-base">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
export function ProductFAQ({ items }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  // Safety check
  if (!items || items.length === 0) return null

  // --- SEO: JSON-LD STRUCTURED DATA ---
  // This tells Google this is an FAQ section
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  }

  return (
    <section className="py-12 md:py-20 border-t border-border">
      {/* Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-full mb-4">
            <HelpCircle className="h-5 w-5 text-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Common questions about this product.
          </p>
        </div>

        {/* List */}
        <div className="bg-card border border-border rounded-xl px-6 md:px-8">
          {items.map((item, index) => (
            <AccordionItem
              key={item._key || index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}