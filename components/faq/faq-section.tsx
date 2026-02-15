"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus, Minus, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
// Importe l'interface depuis ton fichier sanity-data ou définis-la ici
import { FAQItem } from "@/lib/sanity-data" 

gsap.registerPlugin(ScrollTrigger)

// AJOUTER UNE INTERFACE POUR LES PROPS
interface FAQSectionProps {
  data: FAQItem[];
}

export function FAQSection({ data }: FAQSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // ... (Garde ton useEffect pour GSAP tel quel) ...
  useEffect(() => {
     // ... ton code gsap existant ...
     const ctx = gsap.context(() => {
         // ... animation code ...
         // IMPORTANT: Ajoute une sécurité si data est vide pour ne pas faire planter gsap
         if(!containerRef.current) return; 
         // ...
     }, sectionRef)
     return () => ctx.revert()
  }, [])


  // Si pas de données, on n'affiche rien ou un message
  if (!data || data.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-background" id="faq">
      <div className="max-w-[1200px] mx-auto">
        {/* ... Garde ton Header identique ... */}
        
        <div ref={containerRef} className="max-w-3xl mx-auto space-y-4">
          {/* UTILISE 'data' AU LIEU DE 'fiveFAQ' */}
          {data.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="faq-item border border-border rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-accent/50">
                 {/* ... Le reste de ton JSX pour l'item est identique ... */}
                 <button onClick={() => handleToggle(index)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none">
                    <span className="text-lg font-medium pr-8">{item.question}</span>
                    <span className="flex-shrink-0 text-accent">
                        {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                 </button>
                 <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                        <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                 </div>
              </div>
            )
          })}
          
          {/* ... Garde le lien View all FAQs ... */}
          <div className="flex justify-end pt-4 faq-item"> 
            <Link href="/faq" className="group inline-flex items-center text-accent hover:underline font-medium">
              View all FAQs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}