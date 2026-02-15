import type { Metadata } from "next"
import { Header } from "@/components/layout/header.client"
import { Footer } from "@/components/layout/footer"
import { AgeGate } from "@/components/shared/age-gate"
import { siteConfig } from "@/config/site.config"
import  PageWrapper  from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Learn about BULK VAPES return and refund policies.",
}

export default function RefundsPage() {
  return (
    <PageWrapper>
      
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              All transactions are handled manually and on a case-by-case basis.
Refund eligibility, if applicable, is determined during direct communication with our team prior to order confirmation.
Because orders are finalized manually, refunds may not be available once processing has begun.
For refund-related inquiries, please contact us directly before completing any transaction.
             </p> 
          </div>
        </article>
      </main>
      
    </PageWrapper>
  )
}
