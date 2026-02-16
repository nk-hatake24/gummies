import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Terms of Service & Legal Conditions",
  description: "Terms of Service, user agreement, and sale conditions for GUMMIESSHOP.",
}

const OFFICIAL_SOURCES = [
  {
    label: "2018 Farm Bill (Agriculture Improvement Act of 2018) — Congress.gov (PDF)",
    href: "https://www.congress.gov/115/plaws/publ334/PLAW-115publ334.pdf",
  },
  {
    label: "Public Law 115-334 — GovInfo (HTML)",
    href: "https://www.govinfo.gov/content/pkg/PLAW-115publ334/html/PLAW-115publ334.htm",
  },
  {
    label: "USDA AMS — Hemp Program (rules & regulations)",
    href: "https://www.ams.usda.gov/rules-regulations/hemp",
  },
  {
    label: "FDA — Regulation of Cannabis and Cannabis-Derived Products (including CBD)",
    href: "https://www.fda.gov/news-events/public-health-focus/fda-regulation-cannabis-and-cannabis-derived-products-including-cannabidiol-cbd",
  },
  {
    label: "FDA Consumer Update — What to Know About Products Containing Cannabis/CBD",
    href: "https://www.fda.gov/consumers/consumer-updates/what-you-need-know-and-what-were-working-find-out-about-products-containing-cannabis-or-cannabis",
  },
  {
    label: "FDA — Cannabis: Research and Drug Approval Process",
    href: "https://www.fda.gov/news-events/public-health-focus/fda-and-cannabis-research-and-drug-approval-process",
  },
  {
    label: "FTC — Mail, Internet, or Telephone Order Merchandise Rule (overview)",
    href: "https://www.ftc.gov/legal-library/browse/rules/mail-internet-or-telephone-order-merchandise-rule",
  },
  {
    label: "eCFR — 16 CFR Part 435 (Order Merchandise Rule text)",
    href: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435",
  },
  {
    label: "USPS Postal Bulletin — Hemp-based Products (Publication 52 update)",
    href: "https://about.usps.com/postal-bulletin/2019/pb22521/html/updt_002.htm",
  },
  {
    label: "USPS — International shipping restrictions (prohibited items)",
    href: "https://www.usps.com/international/shipping-restrictions.htm",
  },
  {
    label: "California Proposition 65 — Official site",
    href: "https://www.p65warnings.ca.gov",
  },
  {
    label: "DEA — Controlled Substances Act (CSA) overview",
    href: "https://www.dea.gov/drug-information/csa",
  },
]

export default function TermsPage() {
  const currentYear = new Date().getFullYear()

  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28 bg-white dark:bg-neutral-950">
        <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          {/* Header */}
          <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last Updated: February {currentYear} | Please read carefully before purchasing.
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none text-sm md:text-base">
            {/* 1. Acceptance & Age */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                1. Acceptance of Terms & Age Restriction
              </h2>
              <p className="mb-4">
                By accessing, browsing, or using this website (the “Site”), you acknowledge that you
                have read, understood, and agree to be bound by these Terms of Service (“Terms”).
                If you do not agree, do not use the Site.
              </p>

              <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700 dark:text-red-400 font-bold">
                  STRICT AGE REQUIREMENT: 21+ ONLY
                </p>
                <p className="text-red-700 dark:text-red-400 mt-1">
                  You must be at least 21 years of age to access this Site or purchase any products.
                  We may use third-party age/identity verification services. Providing false
                  information violates these Terms and may violate applicable laws.
                </p>
              </div>
            </section>

            {/* 2. Compliance with Law (Hemp-derived) */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                2. Compliance with Law (Hemp-Derived Products)
              </h2>

              <h3 className="font-semibold mt-4 mb-2">A. Federal Hemp Framework</h3>
              <p className="mb-4">
                Products represented as “hemp-derived” are intended to align with the federal
                definition of hemp under the Agriculture Improvement Act of 2018 (the “2018 Farm
                Bill”), including the 0.3% Delta-9 THC threshold on a dry-weight basis.
              </p>

              <h3 className="font-semibold mt-4 mb-2">B. State & Local Restrictions</h3>
              <p className="mb-4">
                Laws and regulations governing cannabinoids (including but not limited to CBD,
                Delta-8, THCA, and other hemp-derived cannabinoids) may vary by state and locality
                and can change over time. You are solely responsible for determining whether
                purchasing, possessing, using, or reselling products is lawful in your jurisdiction.
                We reserve the right to restrict or refuse shipments to certain jurisdictions.
              </p>

              <h3 className="font-semibold mt-4 mb-2">C. Controlled Substances</h3>
              <p className="mb-4">
                Nothing in these Terms is intended to represent that any product is lawful in every
                jurisdiction. Federal and state controlled substances laws may apply depending on
                product composition and local rules.
              </p>
            </section>

            {/* 3. No Medical Advice / FDA Disclaimer */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                3. No Medical Advice & FDA Disclaimer
              </h2>
              <p className="mb-4">
                Content on this Site is for general informational purposes only and is not medical
                advice. You should consult a qualified professional before using any product,
                especially if you are pregnant, nursing, have a medical condition, or take
                medications.
              </p>
              <p className="mb-4 italic text-muted-foreground border-l-2 pl-4">
                “These statements have not been evaluated by the Food and Drug Administration. This
                product is not intended to diagnose, treat, cure, or prevent any disease.”
              </p>
            </section>

            {/* 4. Orders, Pricing, and Verification */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                4. Orders, Pricing, and Verification
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  We may require additional verification (age/identity, address validation, payment
                  verification) before accepting or fulfilling an order.
                </li>
                <li>
                  We may cancel or refuse orders that appear fraudulent, violate these Terms, or
                  cannot be shipped lawfully or safely.
                </li>
                <li>
                  Prices, availability, and product details may change without notice.
                </li>
              </ul>
            </section>

            {/* 5. Shipping, Delivery & Risk of Loss */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                5. Shipping, Delivery & Risk of Loss
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Signature/Adult Signature:</strong> Shipments may require a signature at
                  delivery, including adult signature (21+) where used by the carrier.
                </li>
                <li>
                  <strong>Shipping timeframes:</strong> Delivery estimates are not guarantees.
                  Where applicable, we aim to follow FTC guidance regarding shipment timeframes and
                  refunds for unshipped merchandise.
                </li>
                <li>
                  <strong>Risk of loss:</strong> Risk of loss and title generally pass to you upon
                  tender to the carrier, to the extent permitted by law and consistent with the
                  shipment contract.
                </li>
                <li>
                  <strong>Seizures/Refusals:</strong> If you order products restricted in your
                  jurisdiction, you assume the risk of enforcement actions, refused delivery, or
                  other consequences.
                </li>
              </ul>

              <p className="text-sm text-muted-foreground">
                Note: USPS has specific rules regarding hemp-based products and international
                restrictions.
              </p>
            </section>

            {/* 6. Returns & Refunds */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                6. Returns, Refunds & Order Issues
              </h2>
              <p className="mb-4">
                Due to the nature of consumable products, some items may be non-returnable once
                shipped or once packaging/tamper-evident seals are opened (where applicable). If you
                receive a damaged or incorrect item, you must notify us promptly and provide
                supporting evidence (e.g., photos of the product, packaging, and shipping label).
              </p>
              <p className="mb-4">
                Refunds, replacements, or store credit (if offered) are handled according to our{" "}
                <Link href="/refunds" className="underline hover:text-blue-600">
                  Refund Policy
                </Link>{" "}
                and applicable law.
              </p>
            </section>

            {/* 7. Prohibited Use */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                7. Prohibited Use
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Using the Site for any unlawful purpose.</li>
                <li>Attempting to circumvent age verification or eligibility checks.</li>
                <li>Submitting false, misleading, or fraudulent information.</li>
                <li>Interfering with Site security or functionality.</li>
              </ul>
            </section>

            {/* 8. Disclaimer of Warranties */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                8. Disclaimer of Warranties
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law, the Site and products are provided “AS IS”
                and “AS AVAILABLE” without warranties of any kind, express or implied, including
                implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
            </section>

            {/* 9. Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                9. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law, {siteConfig.name ?? "GUMMIESSHOP"} and its
                affiliates shall not be liable for indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues, arising from or related to your
                use of the Site or products.
              </p>
            </section>

            {/* 10. Indemnification */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                10. Indemnification
              </h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless {siteConfig.name ?? "GUMMIESSHOP"}
                and its affiliates from any claims, liabilities, damages, and expenses arising from
                your use of the Site, your violation of these Terms, or your violation of any law,
                including purchasing or possessing products restricted in your jurisdiction.
              </p>
            </section>

            {/* 11. Governing Law & Dispute Resolution */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                11. Governing Law & Dispute Resolution
              </h2>
              <p className="mb-4">
                These Terms shall be governed by the laws of the State of{" "}
                <strong>[INSERT YOUR US STATE HERE]</strong>, without regard to conflict of law
                principles.
              </p>
              <p className="mb-4">
                <strong>Class Action Waiver:</strong> To the extent permitted by law, disputes must
                be brought on an individual basis and not as a plaintiff or class member in any
                purported class, collective, or representative proceeding.
              </p>
            </section>

            {/* 12. Changes */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                12. Changes to These Terms
              </h2>
              <p className="mb-4">
                We may update these Terms from time to time. The updated version will be posted on
                this page with a revised “Last Updated” date. Continued use of the Site after changes
                means you accept the updated Terms.
              </p>
            </section>

            {/* 13. Contact */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                13. Contact
              </h2>
              <p className="mb-4">
                Questions about these Terms? Contact us at{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-blue-600">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </section>

            {/* Sources */}
            <section className="border-t pt-8 mt-12 text-sm text-muted-foreground">
              <p className="font-semibold mb-3">Official Legal & Compliance References (Government)</p>
              <ul className="space-y-2">
                {OFFICIAL_SOURCES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} target="_blank" className="hover:underline text-blue-600">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic">
                References are provided for general information and do not constitute legal advice.
              </p>
            </section>
          </div>
        </article>
      </main>
    </PageWrapper>
  )
}