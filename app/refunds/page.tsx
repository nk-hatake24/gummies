import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Learn about GUMMIESSHOP return, replacement, and refund policies.",
}

const references = [
  {
    label: "FTC — Returns, Refunds, and Other Resolutions (Consumer Advice)",
    href: "https://consumer.ftc.gov/node/77484",
  },
  {
    label: "FTC — Online Shopping (Consumer Advice)",
    href: "https://consumer.ftc.gov/articles/online-shopping",
  },
  {
    label: "FTC — Mail, Internet, or Telephone Order Merchandise Rule (Legal Library)",
    href: "https://www.ftc.gov/legal-library/browse/rules/mail-internet-or-telephone-order-merchandise-rule",
  },
  {
    label: "eCFR — 16 CFR Part 435 (Mail, Internet, or Telephone Order Merchandise Rule)",
    href: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435",
  },
  {
    label: "CFPB — Dispute a charge on your credit card bill (consumer guidance)",
    href: "https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-a-charge-on-my-credit-card-bill-en-61/",
  },
  {
    label: "CFPB — Get a refund for something purchased with a credit card (consumer guidance)",
    href: "https://www.consumerfinance.gov/ask-cfpb/how-can-i-get-a-refund-on-a-product-or-service-i-purchased-with-my-credit-card-en-1969/",
  },
  {
    label: "eCFR — Regulation Z: 12 CFR § 1026.13 (Billing error resolution)",
    href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/13",
  },
  {
    label: "FTC — Using Credit Cards and Disputing Charges (Consumer Advice)",
    href: "https://consumer.ftc.gov/articles/using-credit-cards-and-disputing-charges",
  },
  {
    label: "FTC — Cooling-Off Rule (Legal Library) (note: limited situations, not typical online sales)",
    href: "https://www.ftc.gov/legal-library/browse/rules/cooling-period-sales-made-home-or-other-locations",
  },
  {
    label: "eCFR — 16 CFR Part 429 (Cooling-Off Rule text)",
    href: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-429",
  },
]

export default function RefundsPage() {
  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-3">
            Refund Policy
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-10">
              <p className="text-muted-foreground leading-relaxed">
                This Refund Policy explains how refunds, replacements, and order issues are handled by{" "}
                <strong>{siteConfig.name ?? "GUMMIESSHOP"}</strong> (“we,” “us,” “our”). Because we sell
                consumer goods that may include edible products, some items may be non-returnable once shipped
                for safety and quality reasons. If you have any questions, contact us before completing a transaction at{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">1. Order Review & Confirmation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders may be reviewed for accuracy, eligibility, and fulfillment feasibility (including shipping
                restrictions). Once an order is confirmed and enters processing, we may be unable to cancel it.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">2. When Refunds or Replacements May Be Available</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If an issue occurs, we may offer a replacement, store credit, reshipment, or refund depending on the situation,
                inventory, and verification. Common eligible scenarios include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Item arrived damaged (with supporting photos and packaging evidence)</li>
                <li>Wrong item(s) received</li>
                <li>Package marked delivered but not received (subject to carrier investigation/signature records)</li>
                <li>Order cannot be shipped within the promised timeframe (see “Shipping Delays” below)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">3. Non-Returnable / Limited Return Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For safety and quality reasons, some items may not be eligible for return after shipment, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Opened or partially used products</li>
                <li>Items without original packaging or tamper-evident seals (if applicable)</li>
                <li>Items returned without authorization</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                If a product is defective or incorrect, contact us and we’ll work with you on the most appropriate resolution.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">4. Reporting Timeframes</h2>
              <p className="text-muted-foreground leading-relaxed">
                To help us resolve issues quickly, please report order problems within{" "}
                <strong>72 hours</strong> of delivery (or first delivery attempt), and include your order number plus
                any supporting photos (item condition, packaging, shipping label).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">5. Shipping Delays & Unshipped Orders</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we cannot ship within the stated timeframe (or within a reasonable timeframe when no timeframe is stated),
                we may contact you to obtain consent to a delay or issue a refund for unshipped merchandise, consistent with
                FTC guidance on mail/internet/telephone orders.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">6. Refund Method & Timing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If a refund is approved:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Refunds are typically issued to the original payment method where possible.</li>
                <li>Processing times vary by payment provider and financial institution.</li>
                <li>Shipping fees may be non-refundable unless required by law or due to our error.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">7. Chargebacks & Payment Disputes</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have an issue with your purchase, please contact us first so we can attempt to resolve it.
                Depending on your situation and your card issuer’s processes, you may also have rights related to billing
                errors or disputes under federal consumer finance rules. Submitting a chargeback may pause or end internal
                refund processing while the dispute is investigated.
              </p>
            </section>

            <section className="mb-2">
              <h2 className="font-serif text-2xl mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For refund or order issue questions, email{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>{" "}
                and include your order number and a short description of the issue.
              </p>
            </section>

            <hr className="my-10" />

            <section>
              <h2 className="font-serif text-2xl mb-4">Official Reference Links</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {references.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} target="_blank" className="underline hover:text-blue-600">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground mt-6 italic">
                Note: Reference links are provided for general information and do not constitute legal advice.
              </p>
            </section>
          </div>
        </article>
      </main>
    </PageWrapper>
  )
}