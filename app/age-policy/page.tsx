import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"

export const metadata: Metadata = {
  title: "Age Policy, Legal Compliance & Disclaimers",
  description:
    "Official 21+ age restriction policy, hemp-derived cannabinoid compliance, and legal disclaimers for GUMMIESSHOP.",
}

export default function AgePolicyPage() {
  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28 bg-white dark:bg-neutral-950">
        <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          
          <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
              Legal Compliance & Age Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Federal Hemp Law, FDA Positioning, and 21+ Sales Policy
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">

            {/* 1. 21+ Policy */}
            <section className="mb-12">
              <h2>1. 21+ Age Restriction Policy</h2>
              <p>
                GUMMIESSHOP restricts the sale of hemp-derived cannabinoid products to individuals
                aged <strong>21 years or older</strong>. While federal hemp law does not mandate
                a nationwide minimum age for CBD products, many states impose age
                restrictions. To ensure responsible retail practices and compliance across
                jurisdictions, we enforce a strict 21+ policy.
              </p>

              <p className="text-sm">
                Source:{" "}
                <Link href="https://www.congress.gov/115/plaws/publ334/PLAW-115publ334.pdf" target="_blank">
                  Agriculture Improvement Act of 2018 (2018 Farm Bill)
                </Link>
              </p>
            </section>

            {/* 2. Federal Hemp Compliance */}
            <section className="mb-12">
              <h2>2. Hemp-Derived Cannabinoid Compliance</h2>
              <p>
                All products marketed as hemp-derived comply with the federal definition
                of hemp under the <strong>2018 Farm Bill</strong>, meaning they contain no more
                than 0.3% Delta-9 THC on a dry weight basis.
              </p>

              <p className="text-sm">
                Sources:
                <br />
                <Link href="https://www.ams.usda.gov/rules-regulations/hemp" target="_blank">
                  USDA Hemp Production Program
                </Link>
                <br />
                <Link href="https://www.fda.gov/food/food-additives-petitions/cannabidiol-cbd" target="_blank">
                  FDA – Cannabis and Cannabis-Derived Products
                </Link>
              </p>
            </section>

            {/* 3. FDA Regulatory Position */}
            <section className="mb-12">
              <h2>3. FDA Regulatory Position on CBD & Cannabinoids</h2>
              <p>
                The U.S. Food and Drug Administration (FDA) regulates foods,
                dietary supplements, and drug products under the Federal Food,
                Drug, and Cosmetic Act (FD&C Act). The FDA has stated that CBD
                cannot currently be marketed as a dietary supplement unless
                approved through appropriate regulatory pathways.
              </p>

              <p className="text-sm">
                Sources:
                <br />
                <Link href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cannabis-and-cannabis-derived-products-quality-considerations-clinical-research" target="_blank">
                  FDA Cannabis Guidance
                </Link>
                <br />
                <Link href="https://www.fda.gov/food/cfsan-constituent-updates/fda-approves-first-drug-comprised-active-ingredient-derived-marijuana-treat-rare-severe-forms" target="_blank">
                  FDA – Epidiolex Approval Notice
                </Link>
              </p>
            </section>

            {/* 4. State Law Variations */}
            <section className="mb-12">
              <h2>4. State Law Variations</h2>
              <p>
                While hemp-derived cannabinoids may be federally lawful under
                certain conditions, individual states may impose restrictions or
                bans on specific cannabinoids (e.g., Delta-8, THCA).
                Customers are responsible for understanding their local laws.
              </p>

              <p className="text-sm">
                Sources:
                <br />
                <Link href="https://www.dea.gov/drug-information/csa" target="_blank">
                  DEA Controlled Substances Act Overview
                </Link>
                <br />
                <Link href="https://norml.org/laws/" target="_blank">
                  NORML State Law Database
                </Link>
              </p>
            </section>

            {/* 5. Shipping & Interstate Commerce */}
            <section className="mb-12">
              <h2>5. Interstate Commerce & Shipping</h2>
              <p>
                Under federal law, hemp and hemp-derived products that meet the
                0.3% Delta-9 THC threshold may move in interstate commerce.
                We reserve the right to restrict shipments to states with
                specific prohibitions.
              </p>

              <p className="text-sm">
                Source:
                <br />
                <Link href="https://www.congress.gov/115/plaws/publ334/PLAW-115publ334.pdf" target="_blank">
                  Section 10114 – Interstate Commerce (Farm Bill)
                </Link>
              </p>
            </section>

            {/* 6. California Prop 65 */}
            <section className="mb-12 bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg">
              <h2>6. California Proposition 65</h2>
              <p>
                Products sold in California may require warnings pursuant to
                California Health & Safety Code §25249.6.
              </p>
              <p className="text-sm">
                Source:
                <br />
                <Link href="https://www.p65warnings.ca.gov" target="_blank">
                  California Proposition 65 Official Website
                </Link>
              </p>
            </section>

            {/* 7. CDC & Public Health */}
            <section className="mb-12">
              <h2>7. Public Health Information</h2>
              <p>
                Consumers seeking general health guidance related to cannabis
                products may consult official public health resources.
              </p>

              <p className="text-sm">
                Sources:
                <br />
                <Link href="https://www.cdc.gov/marijuana/index.htm" target="_blank">
                  CDC – Marijuana & Public Health
                </Link>
                <br />
                <Link href="https://nida.nih.gov/publications/drugfacts/cannabis-marijuana" target="_blank">
                  National Institute on Drug Abuse (NIDA)
                </Link>
              </p>
            </section>

            {/* FDA Disclaimer */}
            <section className="border-t pt-8">
              <p className="text-xs italic text-muted-foreground">
                FDA Disclaimer: Statements regarding these products have not
                been evaluated by the Food and Drug Administration. These
                products are not intended to diagnose, treat, cure, or prevent
                any disease.
              </p>
            </section>

          </div>
        </article>
      </main>
    </PageWrapper>
  )
}