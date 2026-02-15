import type { Metadata } from "next"
import { Header } from "@/components/layout/header.client"
import { Footer } from "@/components/layout/footer"
import { AgeGate } from "@/components/shared/age-gate"
import { siteConfig } from "@/config/site.config"
import { formatCurrency } from "@/lib/utils"
import  PageWrapper  from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Learn about BULK VAPES shipping rates, delivery times, and policies.",
}

export default function ShippingPage() {
  return (
    <PageWrapper>
      
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">Shipping Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">Shipping Rates</h2>
              <div className="border border-border rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-medium">Order Total</th>
                      <th className="text-left p-4 font-medium">Standard Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-4">Under {formatCurrency(siteConfig.shipping.freeShippingThreshold)}</td>
                      <td className="p-4">{formatCurrency(siteConfig.shipping.standardRate)}</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">{formatCurrency(siteConfig.shipping.freeShippingThreshold)} and above</td>
                      <td className="p-4 text-accent font-medium">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">Delivery Times</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Standard Shipping: 3-7 business days</li>
                <li>Express Shipping: 1-3 business days (available at checkout)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Orders are typically processed within 1-2 business days. Delivery times may vary based on your location
                and carrier delays.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">Shipping Restrictions</h2>
              <p className="text-muted-foreground leading-relaxed">
                We currently ship to all 50 US states. However, some states have restrictions on certain products.
                Orders to restricted areas may be cancelled and refunded.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">Age Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                All shipments may require adult signature upon delivery. Please ensure someone 21 years or older is
                available to sign for the package.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-4">Tracking Your Order</h2>
              <p className="text-muted-foreground leading-relaxed">
                Once your order ships, you&apos;ll receive an email with tracking information. You can also contact us
                at {siteConfig.contact.email} for order status updates.
              </p>
            </section>
          </div>
        </article>
      </main>
     
    </PageWrapper>
  )
}
