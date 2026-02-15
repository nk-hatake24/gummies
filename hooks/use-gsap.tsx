"use client"

import { useEffect, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Reveal animation on scroll
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return ref
}

// Stagger reveal for multiple elements
export function useStaggerReveal<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const children = containerRef.current.children

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return containerRef
}

// Parallax effect
export function useParallax<T extends HTMLElement>(speed = 0.5) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -20 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}

// Text split animation
export function useSplitText<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const text = element.textContent || ""

    // Split text into spans
    element.innerHTML = text
      .split("")
      .map((char, i) =>
        char === " "
          ? " "
          : `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char}</span>`,
      )
      .join("")

    const chars = element.querySelectorAll(".char")

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => {
      ctx.revert()
      element.textContent = text
    }
  }, [])

  return ref
}

// Magnetic effect for buttons/interactive elements
export function useMagnetic<T extends HTMLElement>(strength = 0.5) {
  const ref = useRef<T>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(ref.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      })
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return ref
}

// Page transition hook
export function usePageTransition() {
  const transitionIn = useCallback((onComplete?: () => void) => {
    const tl = gsap.timeline()

    tl.fromTo("main", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })

    if (onComplete) {
      tl.call(onComplete)
    }

    return tl
  }, [])

  const transitionOut = useCallback((onComplete?: () => void) => {
    const tl = gsap.timeline()

    tl.to("main", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in",
    })

    if (onComplete) {
      tl.call(onComplete)
    }

    return tl
  }, [])

  return { transitionIn, transitionOut }
}
