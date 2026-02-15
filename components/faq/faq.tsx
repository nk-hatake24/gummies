"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus, Minus, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { FAQCategoryData } from "@/lib/sanity-data" // Import tes types

gsap.registerPlugin(ScrollTrigger)

// AJOUTER UNE INTERFACE POUR LES PROPS
interface FAQPageContentProps {
  categories: FAQCategoryData[];
}

export function FAQPageContent({ categories }: FAQPageContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  
  // Initialise avec la première catégorie disponible si elle existe
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Trouve les items de la catégorie active depuis les props
  const activeCategoryData = categories.find(c => c.id === activeTab)?.items || []

  // ... (Garde tes handlers et useEffects identiques) ...
  const handleTabChange = (id: string) => {
    if (activeTab === id) return
    setOpenIndex(null)
    setActiveTab(id)
  }
  const handleAccordionToggle = (index: number) => {
     setOpenIndex(openIndex === index ? null : index)
  }
  
  // ... useEffects pour GSAP ...

  if (!categories || categories.length === 0) return <div>No FAQs found.</div>;

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-background" id="faq">
      <div className="max-w-[1200px] mx-auto">
        {/* ... Header identique ... */}

        {/* --- CONTROLS SECTION --- */}
        <div className="faq-controls mb-12 max-w-2xl mx-auto">
          {/* Mobile Select - Utilise 'categories' prop */}
          <div className="relative lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value)}
              className="w-full appearance-none bg-card text-foreground border border-border rounded-lg py-3 pl-4 pr-10 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <ChevronsUpDown className="h-4 w-4" />
            </div>
          </div>

          {/* Desktop Tabs - Utilise 'categories' prop */}
          <div className="hidden lg:flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                  activeTab === cat.id
                    ? "bg-foreground text-background border-foreground shadow-md scale-105"
                    : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Content - Utilise 'activeCategoryData' calculé plus haut */}
        <div ref={containerRef} className="max-w-3xl mx-auto space-y-4 min-h-[300px]">
           {/* ... Ta boucle map pour afficher les items (identique) ... */}
           {activeCategoryData.map((item, index) => {
              const isOpen = openIndex === index
              return (
                 <div key={`${activeTab}-${index}`} className="faq-item border border-border rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                    <button onClick={() => handleAccordionToggle(index)} className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none group select-none">
                       <span className={cn("text-base md:text-lg font-medium pr-6 transition-colors leading-snug", isOpen ? "text-primary" : "text-foreground")}>
                          {item.question}
                       </span>
                       <span className={cn("flex-shrink-0 transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")}>
                          {isOpen ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />}
                       </span>
                    </button>
                    <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                       <div className="overflow-hidden">
                          <div className="px-5 md:px-6 pb-6 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed">
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
  )
}