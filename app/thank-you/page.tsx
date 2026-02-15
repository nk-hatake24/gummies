import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, ArrowRight, Package, Mail } from "lucide-react"
import { Header } from "@/components/layout/header.client"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site.config"
import PageWrapper from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your order!",
}

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { order } = await searchParams
  const orderNumber = order || "BV-000000"

  return (
    <PageWrapper>
      
      <main className="min-h-screen pt-24 lg:pt-28 pb-16 lg:pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>

          {/* Message */}
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">Thank You for Your Order!</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Your order <span className="font-medium text-foreground">{orderNumber}</span> has been placed successfully.
          </p>
          <p className="text-muted-foreground mb-10">We&apos;ve sent a confirmation email with your order details.</p>

          {/* Order Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="p-6 border border-border rounded-sm">
              <Mail className="h-6 w-6 text-accent mb-3 mx-auto" />
              <h3 className="font-medium mb-1">Confirmation Email</h3>
              <p className="text-sm text-muted-foreground">Check your inbox for order details and tracking info.</p>
            </div>
            <div className="p-6 border border-border rounded-sm">
              <Package className="h-6 w-6 text-accent mb-3 mx-auto" />
              <h3 className="font-medium mb-1">Shipping Updates</h3>
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive tracking information once your order ships.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>

          {/* Support Info */}
          <p className="mt-10 text-sm text-muted-foreground">
            Questions? Contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </main>
     
    </PageWrapper>
  )
}
