// components/product/product-gallery.tsx
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import type { ProductImage } from "@/lib/types"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
  selectedImageId?: string
  shortDescription?: string
}

export function ProductGallery({ images, productName, selectedImageId, shortDescription }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mainImageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (selectedImageId && images.length > 0) {
      const index = images.findIndex((img) => img.imageId === selectedImageId)
      if (index !== -1) setSelectedIndex(index)
    }
  }, [selectedImageId, images])

  const selectedImage = images[selectedIndex] || images[0]
  const mainSrc = selectedImage?.asset ? urlFor(selectedImage).url() : "/placeholder.svg"

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return
    const rect = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
    if (mainImageRef.current) {
      gsap.fromTo(mainImageRef.current, { opacity: 0.8 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
    }
  }

  if (!images || images.length === 0) return null

  const scroll = (direction: "left" | "right") => {
  if (!thumbnailsRef.current) return

  const scrollAmount = 200 // adjust if needed

  thumbnailsRef.current.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  })
}


  return (
    <div ref={containerRef} className="space-y-4">
      <div className="lg:hidden flex flex-col">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{productName}</h1>
        {shortDescription && <p className="mt-3 text-muted-foreground leading-relaxed">{shortDescription}</p>}
      </div>

      <div
        ref={mainImageRef}
        className="relative aspect-square bg-muted rounded-sm overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={mainSrc}
          alt={selectedImage?.alt || productName}
          fill
          className={cn("object-cover transition-transform duration-300", isZoomed && "scale-150")}
          style={isZoomed ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` } : undefined}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hover to Zoom
        </div>
      </div>
{images.length > 1 && (
  <div className="relative">
    
    {/* Left Button */}
    <button
      onClick={() => scroll("left")}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-background transition"
    >
      ◀
    </button>

    {/* Scroll Container */}
    <div
      ref={thumbnailsRef}
      className="flex gap-3 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
    >
      {images.map((image, index) => {
        const thumbSrc = image?.asset
          ? urlFor(image).width(160).height(160).url()
          : "/placeholder.svg"

        return (
          <button
            key={image._key || image.imageId || index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all duration-300",
              selectedIndex === index
                ? "border-accent ring-2 ring-accent/30"
                : "border-transparent hover:border-muted-foreground/30"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={thumbSrc}
              alt={image.alt || ""}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        )
      })}
    </div>

    {/* Right Button */}
    <button
      onClick={() => scroll("right")}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-background transition"
    >
      ▶
    </button>
  </div>
)}

    </div>
  )
}
