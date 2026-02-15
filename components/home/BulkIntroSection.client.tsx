"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, CheckCircle2, MessageSquare, Bitcoin, ShieldCheck } from "lucide-react"
import { HomePageData } from "@/lib/sanity-data"
import { urlFor } from "@/sanity/lib/image"


gsap.registerPlugin(ScrollTrigger)

export function BulkIntroSectionClient(data:HomePageData['bulkSection']) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
   const heroImg = data.BulkImage?.asset;
  const blurData = heroImg?.metadata?.lqip; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Content Animation (Staggered up)
      gsap.fromTo(
        ".animate-text",
        { opacity: 0, y: 40 },
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
        }
      )

      // 2. Image Reveal Animation (Scale + Fade)
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, x: 20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 lg:py-24 px-6 lg:px-12 bg-background border-t border-border/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* --- LEFT SIDE: Content (2/3) --- */}
          <div className="lg:w-[65%] flex flex-col justify-center">
            
            {/* Trust Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm  text-accent text-xs  uppercase tracking-widest">
                  Authority & Trust Signals
              </span>
            </div>

            {/* Headline (Serif to match original) */}
            <h2 className="animate-text font-serif text-4xl md:text-5xl xl:text-6xl tracking-tight text-foreground leading-[1.1] mb-8">
              {data?.title}
            </h2>

            {/* Main Description */}
            <div className="animate-text space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl text-justify">
             {data?.description}
            </div>

            {/* Feature Box: Crypto Discount (Micro-Layout) */}
            <div className="animate-text mt-8 p-6 rounded-sm border border-border bg-accent/10 text-accent relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bitcoin className="w-24 h-24 rotate-12" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm shrink-0">
                  <Bitcoin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-serif text-xl ">Crypto Exclusive Offer</h4>
                  <p className="text-sm  mt-1">
                    Order in bulk, mix & match products, and pay with crypto to get an <span className="font-bold  underline decoration-orange-500/50">instant 10% discount</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-text flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/wholesale-request"
                className="group relative inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-sm font-medium transition-all hover:bg-accent hover:text-white overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request Bulk Order
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-medium border border-input hover:border-foreground/50 hover:bg-secondary/50 transition-all text-foreground">
              
                Talk to a Wholesale Agent
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: Image (1/3) --- */}
          <div className="lg:w-[35%] lg:flex hidden relative min-h-[400px] lg:min-h-auto">
            <div ref={imageRef} className="relative h-full w-full rounded-sm overflow-hidden shadow-2xl">
              {/* Image */}
              <Image
                src={data?.BulkImage ? urlFor(data.BulkImage).url() : '/placeholder.svg'} // Placeholder: Warehouse/Business vibe
                alt={data.BulkImage?.alt || data.title || 'an Image'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
                priority // Très important pour le LCP
                placeholder={blurData ? "blur" : "empty"}
                blurDataURL={blurData}
                quality={85}
              />
              
              {/* Gradient Overlay (Matches your original style) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Floating Info Card (Adds "Pro" detail) */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-md p-5 rounded-sm border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock Status</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Available Now
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>Fast USA Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>MOQ: Low Entry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}