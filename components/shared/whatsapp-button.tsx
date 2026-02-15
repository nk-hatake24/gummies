"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site.config"
import { cn } from "@/lib/utils"
import { analyticsEvents } from "@/components/shared/analytics"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.to(".whatsapp-btn", {
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [isVisible])

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=Hi, I have a question about BULK VAPES products.`

  const handleClick = () => {
    analyticsEvents.whatsAppClick()
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "whatsapp-btn fixed bottom-6 left-6 z-40",
        "w-14 h-14 rounded-full bg-[#25D366] text-white",
        "flex items-center justify-center shadow-lg",
        "hover:scale-110 transition-transform duration-300",
        "opacity-0",
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
