import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Learn about GUMMIESSHOP shipping rates, processing times, delivery estimates, signature requirements, and shipping restrictions.",
}

/**
 * Official / primary references (10+)
 * - Federal: FTC shipping rule, eCFR text, Farm Bill PDF
 * - USPS: hemp mailability + Pub 52 + international restrictions + Adult Signature
 * - Carriers: UPS Adult Signature (Tariff/Terms), FedEx Adult Signature FAQ
 */
const OFFICIAL_SOURCES = [
  {
    label: "FTC — Mail, Internet, or Telephone Order Merchandise Rule (overview)",
    href: "https://www.ftc.gov/legal-library/browse/rules/mail-internet-or-telephone-order-merchandise-rule",
  },
  {
    label: "eCFR — 16 CFR Part 435 (Mail/Internet/Telephone Order Rule text)",
    href: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435",
  },
  {
    label: "Congress.gov — Agriculture Improvement Act of 2018 (2018 Farm Bill) (PDF)",
    href: "https://www.congress.gov/115/plaws/publ334/PLAW-115publ334.pdf",
  },
  {
    label: "USDA AMS — Hemp Program (rules & regulations)",
    href: "https://www.ams.usda.gov/rules-regulations/hemp",
  },
  {
    label: "USPS Postal Bulletin 22521 — Hemp-based Products (Publication 52 update) (2019)",
    href: "https://about.usps.com/postal-bulletin/2019/pb22521/html/updt_002.htm",
  },
  {
    label: "USPS Postal Bulletin 22579 — Hemp-based Products Update (international prohibition note) (2021)",
    href: "https://about.usps.com/postal-bulletin/2021/pb22579/html/updt_002.htm",
  },
  {
    label: "USPS Postal Bulletin 22581 — Correction: THC limit is 0.3% (2021)",
    href: "https://about.usps.com/postal-bulletin/2021/pb22581/html/updt_003.htm",
  },
  {
    label: "USPS — Publication 52 (current PDF) (Hazardous, Restricted, and Perishable Mail)",
    href: "https://pe.usps.com/cpim/ftp/pubs/pub52/pub52.pdf",
  },
  {
    label: "USPS — International Shipping Restrictions (prohibited items incl. hemp-based products/CBD)",
    href: "https://www.usps.com/international/shipping-restrictions.htm",
  },
  {
    label: "USPS FAQ — Adult Signature Required / Adult Signature Restricted Delivery",
    href: "https://faq.usps.com/s/article/Adult-Signature-Required-and-Adult-Signature-Restricted-Delivery-Services",
  },
  {
    label: "UPS — 2026 Tariff/Terms & Conditions (Adult Signature Required 21+)",
    href: "https://assets.ups.com/adobe/assets/urn%3Aaaid%3Aaem%3Ac6bf8a2f-018f-4aa0-838b-ffc1a75eb1d9/original/as/terms-carriage-us-en.pdf",
  },
  {
    label: "FedEx — Adult Signature: who can sign (21+ with ID)",
    href: "https://www.fedex.com/en-us/customer-support/faqs/receiving/delivery/who-can-sign-adult-signature-shipment.html",
  },
]

export default function ShippingPage() {
  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-3">
            Shipping Policy
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-10">
              <p className="text-muted-foreground leading-relaxed">
                This Shipping Policy explains how shipping rates, processing times, delivery estimates,
                signature requirements, and restrictions are handled by{" "}
                <strong>{siteConfig.name ?? "GUMMIESSHOP"}</strong>. Delivery timeframes are estimates
                and may vary due to carrier conditions, weather, peak seasons, and address verification.
              </p>
            </section>

            {/* Shipping Rates */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">1. Shipping Rates</h2>
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
                      <td className="p-4">
                        Under {formatCurrency(siteConfig.shipping.freeShippingThreshold)}
                      </td>
                      <td className="p-4">{formatCurrency(siteConfig.shipping.standardRate)}</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">
                        {formatCurrency(siteConfig.shipping.freeShippingThreshold)} and above
                      </td>
                      <td className="p-4 text-accent font-medium">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-muted-foreground mt-4">
                Express shipping (if offered at checkout):{" "}
                <strong>{formatCurrency(siteConfig.shipping.expressRate)}</strong>.
              </p>
            </section>

            {/* Processing & Delivery */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">2. Processing & Delivery Estimates</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Order processing: typically 1–2 business days (verification may add time)</li>
                <li>Standard shipping: typically 3–7 business days</li>
                <li>Express shipping: typically 1–3 business days (where available)</li>
              </ul>

              <p className="text-muted-foreground mt-4">
                If we cannot ship within the stated timeframe (or within a reasonable timeframe when none is stated),
                we may contact you for consent to delay or provide a refund for unshipped merchandise, consistent with
                FTC guidance for mail/internet/telephone orders.
              </p>
            </section>

            {/* Signature / Age */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">3. Signature & Age Verification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To support our 21+ sales policy and reduce theft/misdirection risk, shipments may require a signature
                at delivery. Some carriers offer “Adult Signature” services that require the recipient to be{" "}
                <strong>21+</strong> and may require ID verification.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  If a signature is required and no eligible recipient is available, the carrier may re-attempt delivery
                  or hold the package for pickup.
                </li>
                <li>
                  Please ensure your shipping address is accurate and can receive signature-required deliveries.
                </li>
              </ul>
            </section>

            {/* Restrictions */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">4. Shipping Restrictions (States & Products)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may restrict or cancel shipments to jurisdictions where certain cannabinoid products are prohibited
                or heavily restricted. Customers are responsible for understanding the rules in their jurisdiction.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Orders to restricted areas may be cancelled before shipment and refunded (where applicable).</li>
                <li>We reserve the right to request additional verification prior to fulfillment.</li>
              </ul>
            </section>

            {/* USPS / International */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">5. USPS & International Shipping</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If USPS is used for eligible hemp-based products, we follow USPS standards for hemp mailability
                (including recordkeeping expectations where applicable). USPS also lists hemp-based products (including
                CBD) as prohibited for international mailing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At this time, international shipping availability (if offered) is limited and may exclude hemp-based
                products depending on destination rules and carrier policies.
              </p>
            </section>

            {/* Tracking */}
            <section className="mb-2">
              <h2 className="font-serif text-2xl mb-4">6. Tracking Your Order</h2>
              <p className="text-muted-foreground leading-relaxed">
                Once your order ships, you’ll receive tracking information by email (where provided). If you need help,
                contact us at{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
              </p>
            </section>

            <hr className="my-10" />

            {/* References */}
            <section>
              <h2 className="font-serif text-2xl mb-4">Official Reference Links</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {OFFICIAL_SOURCES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} target="_blank" className="underline hover:text-blue-600">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-6 italic">
                Reference links are provided for general information and do not constitute legal advice.
              </p>
            </section>
          </div>
        </article>
      </main>
    </PageWrapper>
  )
}