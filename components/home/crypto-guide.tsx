"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Youtube, ArrowUpRight } from "lucide-react" // Ajout de Youtube
import { Button } from "@/components/ui/button"
import { cryptoPlatforms, cryptoTutorials } from "@/config/crypto-guide.config"

gsap.registerPlugin(ScrollTrigger)

export function CryptoGuide() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-8 px-6  bg-background">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 animate-item">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
            New to Crypto?
          </h4>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">
            How to Buy Cryptocurrency
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Quick and easy platforms to purchase crypto for your orders
          </p>
        </div>

        {/* --- Platforms Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {cryptoPlatforms.map((platform) => (
            <div 
              key={platform.id}
              className="animate-item group p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 bg-accent/5"
            >
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm">
                <platform.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-serif mb-2">{platform.name}</h3>
              <p className="text-muted-foreground mb-8 min-h-[3rem]">
                {platform.description}
              </p>
              <Button className="w-full sm:w-auto gap-2" asChild>
                <Link href={platform.url} target="_blank">
                  {platform.buttonLabel} <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* --- Video Tutorials Section --- */}
        <div className="animate-item mb-4 border-t border-border pt-8">
          <h3 className="font-serif text-3xl mb-2">Video Tutorials</h3>
          <p className="text-muted-foreground">Step-by-step guides to help you get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cryptoTutorials.map((tutorial) => (
            <Link
              key={tutorial.id}
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer" // Sécurité pour les liens externes
              className="animate-item group block p-6 rounded-lg border border-border bg-accent/5 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-medium group-hover:text-accent transition-colors">
                      {tutorial.title}
                    </h4>
                    {/* Petite flèche pour indiquer que c'est un lien */}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tutorial.description}
                  </p>
                </div>
                
                {/* Icône Youtube qui change de couleur au survol */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <Youtube className="h-6 w-6 text-foreground group-hover:text-red-600 transition-colors duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}