import type { Metadata } from "next"
import { Header } from "@/components/layout/header.client"
import { Footer } from "@/components/layout/footer"
import { AgeGate } from "@/components/shared/age-gate"
import { siteConfig } from "@/config/site.config"
import  PageWrapper  from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Compliance & Legality",
  description: "Information regarding our commitment to compliance and legal regulations.",
}

export default function CompliancePage() {
  return (
    <PageWrapper>
      
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">Compliance & Legality</h1>
          
          <div className="prose prose-gray max-w-none">
            <section className="mb-10">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are committed to operating in compliance with applicable laws and regulations.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                All products and services are provided in accordance with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Age restriction requirements</li>
                <li>Applicable local and federal regulations</li>
                <li>Manual verification and communication processes</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Users are responsible for ensuring that any request or transaction complies with laws applicable in their jurisdiction.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                If you have questions regarding compliance or legality, please contact us directly at {siteConfig.contact.email}.
              </p>
            </section>
          </div>
        </article>
      </main>
      
    </PageWrapper>
  )
}