"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { legalConfig, siteConfig } from "@/config/site.config"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "gummiesshop_age_verified"

export function AgeGate() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    try {
      const verified = window.localStorage.getItem(STORAGE_KEY)
      if (verified === "true") {
        setIsVerified(true)
        return
      }

      setIsVerified(false)
      gsap.fromTo(
        ".age-gate-modal",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
      )
    } catch {
      // If storage is blocked, still show the gate
      setIsVerified(false)
    }
  }, [])

  const handleVerify = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // ignore storage failures
    }

    gsap.to(".age-gate", {
      opacity: 0,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => setIsVerified(true),
    })
  }

  const handleDecline = () => setShowWarning(true)

  if (isVerified === null) return null
  if (isVerified) return null

  return (
    <div className="age-gate fixed inset-0 bg-foreground/95 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="age-gate-modal bg-background rounded-lg max-w-md w-full p-8 text-center">
        <h2 className="font-serif text-3xl mb-2">{siteConfig.name}</h2>

        <p className="text-muted-foreground text-sm mb-6">
          {legalConfig.disclaimer}
        </p>

        <div className="bg-muted/50 rounded p-4 mb-6">
          <p className="text-xs font-medium text-muted-foreground">
            {legalConfig.fdaWarning}
          </p>
        </div>

        <p className="text-lg font-medium mb-6">
          Are you {legalConfig.ageRestriction} years of age or older?
        </p>

        {showWarning ? (
          <div className="space-y-4">
            <p className="text-sm text-destructive">
              You must be at least {legalConfig.ageRestriction} years old to enter this site.
            </p>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "https://www.usa.gov/")}
            >
              Leave Site
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Button onClick={handleVerify} size="lg">
              Yes, I am {legalConfig.ageRestriction}+
            </Button>
            <Button variant="outline" onClick={handleDecline} size="lg">
              No
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}