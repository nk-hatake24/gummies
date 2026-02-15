"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [captchaAnswer, setCaptchaAnswer] = useState("")

  // Simple math CAPTCHA
  const [captcha] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 10) + 1
    return { question: `${a} + ${b}`, answer: a + b }
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    whatsapp: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required"
    }
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"

    // --- WHATSAPP VALIDATION START ---
    // 1. Check if empty
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required"
    } 
    // 2. Check format: Allows +, spaces, -, (, ) and numbers. Min length 7, Max 20.
    else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "Invalid number format (e.g., +123 456 7890)"
    }
    // --- WHATSAPP VALIDATION END ---

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }
    
    // (Optional) Add captcha validation back if you have the input field in your UI
    // if (Number.parseInt(captchaAnswer) !== captcha.answer) {
    //   newErrors.captcha = "Incorrect answer"
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSubmitted(true)
      toast.success("Message sent successfully!")
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6 border border-border rounded-sm">
        <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="font-serif text-xl mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">We&apos;ll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={cn(errors.email && "border-destructive")}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className={cn(errors.subject && "border-destructive")}
        />
        {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
      </div>

      <div>
        <Label htmlFor="whatsapp">Whatsapp number</Label>
        <Input
          id="whatsapp"
          type="tel" // Changed to tel for better mobile keyboard
          placeholder="+1 (555) 000-0000"
          value={formData.whatsapp}
          onChange={(e) => handleChange("whatsapp", e.target.value)}
          // Fixed: Was checking errors.subject, now checking errors.whatsapp
          className={cn(errors.whatsapp && "border-destructive")} 
        />
        {/* Fixed: Was checking errors.subject, now checking errors.whatsapp */}
        {errors.whatsapp && <p className="text-sm text-destructive mt-1">{errors.whatsapp}</p>} 
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={cn(errors.message && "border-destructive")}
        />
        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}