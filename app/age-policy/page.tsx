import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Age Policy, Legal Compliance & Disclaimers",
  description: "Official 21+ age restriction policy, PACT Act compliance, and legal disclaimers for Nicotine and Hemp products.",
}

export default function AgePolicyPage() {
  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28 bg-white dark:bg-neutral-950">
        <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          
          {/* Header */}
          <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
              Legal Compliance & Age Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Mandatory 21+ Policy, PACT Act Compliance, and State Restrictions.any
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            {/* 1. Federal 21+ Mandate */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                1. Federal Minimum Age Requirement (21+)
              </h2>
              <p className="leading-relaxed mb-4 text-gray-600 dark:text-gray-300">
                In strict compliance with the <strong>Federal Food, Drug, and Cosmetic Act (FD&C Act)</strong> and the "Tobacco 21" legislation signed into law on December 20, 2019, the sale of all tobacco and vaping products is restricted to individuals aged <strong>21 years or older</strong>.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4 my-4">
                <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                  <strong>Verification Required:</strong> We utilize third-party age verification services (e.g., BlueCheck/AgeChecker) to validate your identity. Falsifying your age to purchase strict-regulated products is illegal.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Source: <Link href="https://www.fda.gov/tobacco-products/retail-sales-tobacco-products/tobacco-21" className="underline hover:text-blue-600" target="_blank">FDA Tobacco 21 Policy</Link>
              </p>
            </section>

            {/* 2. Hemp & Farm Bill */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                2. Hemp-Derived Cannabinoids (THCA, CBD)
              </h2>
              <p className="leading-relaxed mb-4 text-gray-600 dark:text-gray-300">
                Products listed as "Hemp-Derived" are compliant with the <strong>Agriculture Improvement Act of 2018 (The 2018 Farm Bill)</strong>, containing less than 0.3% Delta-9 THC on a dry weight basis.
              </p>
              <h3 className="text-lg font-medium mt-6 mb-2">State Law Preemption</h3>
              <p className="leading-relaxed mb-4 text-gray-600 dark:text-gray-300">
                While federally legal, specific states (including but not limited to Idaho, Oregon, and Utah) have regulations that may classify THCA or other isomers as controlled substances. <strong>We do not ship products to states where they are explicitly banned.</strong> It is the customer's responsibility to know their local laws.
              </p>
              <p className="text-sm text-muted-foreground">
                Source: <Link href="https://www.ams.usda.gov/rules-regulations/hemp" className="underline hover:text-blue-600" target="_blank">USDA Hemp Production Program</Link>
              </p>
            </section>

            {/* 3. PACT Act & Shipping */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                3. PACT Act & Shipping Restrictions
              </h2>
              <p className="leading-relaxed mb-4 text-gray-600 dark:text-gray-300">
                In compliance with the <strong>Prevent All Cigarette Trafficking (PACT) Act</strong> and the <em>Preventing Online Sales of E-Cigarettes to Children Act</em>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>We cannot ship vape products via USPS (United States Postal Service).</li>
                <li><strong>Adult Signature Required:</strong> All shipments containing vape or hemp products require an adult (21+) signature upon delivery. Packages cannot be left at the door.</li>
                <li>We report all sales to relevant state tax administrators as required by law.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Source: <Link href="https://www.atf.gov/alcohol-tobacco/preventing-online-sales-e-cigarettes-children-act" className="underline hover:text-blue-600" target="_blank">ATF PACT Act Guidance</Link>
              </p>
            </section>

            {/* 4. Prop 65 (California) */}
            <section className="mb-12 bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                4. California Proposition 65 Warning
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                <strong>WARNING:</strong> This product can expose you to chemicals including nicotine (which is known to the State of California to cause birth defects or other reproductive harm) and cannabis smoke (which is known to the State of California to cause cancer). For more information, go to <Link href="https://www.p65warnings.ca.gov" className="underline text-blue-600" target="_blank">www.P65Warnings.ca.gov</Link>.
              </p>
            </section>

            {/* 5. FDA Disclaimer */}
            <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <p className="text-xs text-muted-foreground italic">
                <strong>FDA Disclaimer:</strong> The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure, or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from healthcare practitioners. Please consult your healthcare professional about potential interactions or other possible complications before using any product.
              </p>
            </section>

          </div>
        </article>
      </main>
    </PageWrapper>
  )
}