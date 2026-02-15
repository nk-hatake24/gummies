// app/components/home/hero/hero.client.tsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site.config"

import { urlFor } from "@/sanity/lib/image"
import { HomePageData } from "@/lib/sanity-data"

gsap.registerPlugin(ScrollTrigger)

export function HeroClient(data:HomePageData['heroSection']) {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const heroImg = data.heroImage?.asset;
  const blurData = heroImg?.metadata?.lqip; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Split headline animation (character by character)
      tl.fromTo(headlineRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 }, 0.3)
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .fromTo(imageRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.4)
        .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2)

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={data.heroImage ? urlFor(data.heroImage).url() : '/placeholder.svg'}
          alt={data.heroImage?.alt || data.title || 'an Image'}
          fill
          className="object-cover"
          priority
           placeholder={blurData ? "blur" : "empty"}
          blurDataURL={blurData}
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-background">
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-background/60 my-3 m">{data.smallTitle}</p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-5xl md:text-5xl lg:text-6xl xl:text-8xl tracking-tight leading-[1.1] max-w-5xl mx-auto"
        >
         {data.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl text-background/80 max-w-3xl mx-auto leading-relaxed">
          {data.description}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-8 group" asChild>
            <Link href="/products">
              Shop Retail
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-background/30 text-background hover:bg-background/10 px-8 bg-transparent"
            asChild
          >
            <Link href="/wholesale">Wholesale Orders</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-background/60"
      >
        {/*<span className="text-xs uppercase tracking-widest mb-2">Scroll to explore</span>*/}  
        <ChevronDown className="h-5 w-5" />
      </div>
    </section>
  )
}
