import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Terms of Service & Legal Conditions",
  description: "Terms of Service, User Agreement, and Sale Conditions for BULK VAPES.",
}

export default function TermsPage() {
  const currentDate = new Date().getFullYear();

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
              Last Updated: January {currentDate} | Please read carefully before purchasing.
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none text-sm md:text-base">
            
            {/* 1. Acceptance & Age */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">1. Acceptance of Terms & Age Restriction</h2>
              <p className="mb-4">
                By accessing, browsing, or using this website ("Site"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms").
              </p>
              <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700 dark:text-red-400 font-bold">
                  STRICT AGE REQUIREMENT: 21+ ONLY
                </p>
                <p className="text-red-700 dark:text-red-400 mt-1">
                  You must be at least 21 years of age to access this Site or purchase any products. We utilize third-party age verification services. Falsifying your age is a violation of these Terms and potentially a crime under federal and state laws.
                </p>
              </div>
            </section>

            {/* 2. Product Legality (Nicotine & Hemp) */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">2. Compliance with Law (Nicotine & Hemp)</h2>
              <h3 className="font-semibold mt-4 mb-2">A. Hemp-Derived Products (THCA, CBD)</h3>
              <p className="mb-4">
                All hemp-derived products sold on this Site contain less than 0.3% Delta-9 THC on a dry weight basis, in compliance with the <strong>Agriculture Improvement Act of 2018 (The "Farm Bill")</strong>.
              </p>
              <p className="mb-4">
                <strong>State Restrictions:</strong> You acknowledge that laws regarding THCA, Delta-8, and other cannabinoids vary by state. It is your sole responsibility to determine if these products are legal in your jurisdiction.
              </p>
              
              <h3 className="font-semibold mt-4 mb-2">B. Nicotine Products</h3>
              <p className="mb-4">
                WARNING: This product contains nicotine. Nicotine is an addictive chemical. We comply with the <strong>Prevent All Cigarette Trafficking (PACT) Act</strong>. This means we must collect strict age verification and tax reporting data.
              </p>
            </section>

            {/* 3. Health Disclaimer */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">3. FDA & Health Disclaimer</h2>
              <p className="mb-4 italic text-muted-foreground border-l-2 pl-4">
                "The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure, or prevent any disease."
              </p>
              <p className="mb-4">
                Consult your healthcare professional about potential interactions or other possible complications before using any product.
              </p>
            </section>

            {/* 4. Shipping & Risk of Loss */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">4. Shipping, Delivery & Risk of Loss</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Adult Signature Required:</strong> Due to federal regulations, all shipments require an adult (21+) signature upon delivery.</li>
                <li><strong>F.O.B. Origin:</strong> All purchases are made pursuant to a shipment contract. This means that the risk of loss and title for such items pass to you upon our delivery to the carrier.</li>
                <li><strong>Seizures:</strong> We are not responsible for packages seized by law enforcement due to state regulations if you purchase a product restricted in your area.</li>
              </ul>
            </section>

            {/* 5. Returns & Refunds */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">5. Return Policy</h2>
              <p className="mb-4">
                Due to the nature of our products (consumables and hygienic vape devices), <strong>all sales are final</strong> once the packaging has been opened.
              </p>
              <p className="mb-4">
                If you receive a damaged or incorrect item, you must notify us within 48 hours of delivery with photographic evidence.
              </p>
            </section>

            {/* 6. Indemnification */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">6. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless BULK VAPES and its affiliates from any claims, liabilities, damages, and expenses arising from your use of the Site, your violation of these Terms, or your violation of any law (including possessing products illegal in your specific state).
              </p>
            </section>

            {/* 7. Governing Law & Arbitration */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">7. Governing Law & Dispute Resolution</h2>
              <p className="mb-4">
                These Terms shall be governed by the laws of the State of [INSERT YOUR US STATE HERE], without regard to its conflict of law provisions.
              </p>
              <p className="mb-4">
                <strong>Class Action Waiver:</strong> You agree that any arbitration or proceeding shall be limited to the dispute between us and you individually. To the full extent permitted by law, (i) no arbitration or proceeding shall be joined with any other; (ii) there is no right or authority for any dispute to be arbitrated or resolved on a class action-basis.
              </p>
            </section>

            {/* Sources */}
            <section className="border-t pt-8 mt-12 text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Legal References & Compliance Sources:</p>
              <ul className="space-y-1">
                <li>
                  <Link href="https://www.fda.gov/tobacco-products" target="_blank" className="hover:underline text-blue-600">
                    FDA Center for Tobacco Products
                  </Link>
                </li>
                <li>
                  <Link href="https://www.ams.usda.gov/rules-regulations/hemp" target="_blank" className="hover:underline text-blue-600">
                    USDA Hemp Production Program (Farm Bill)
                  </Link>
                </li>
                <li>
                  <Link href="https://www.atf.gov/alcohol-tobacco/preventing-online-sales-e-cigarettes-children-act" target="_blank" className="hover:underline text-blue-600">
                    ATF PACT Act (Vape Shipping)
                  </Link>
                </li>
              </ul>
            </section>

          </div>
        </article>
      </main>
    </PageWrapper>
  )
}