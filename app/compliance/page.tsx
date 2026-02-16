import type { Metadata } from "next"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Compliance & Legality",
  description:
    "Information regarding our 21+ policy, hemp-derived compliance framework, FDA/FTC disclaimers, and shipping restrictions.",
}

const sources = [
  {
    label: "2018 Farm Bill (Agriculture Improvement Act of 2018) — Congress.gov (PDF)",
    href: "https://www.congress.gov/115/plaws/publ334/PLAW-115publ334.pdf",
  },
  {
    label: "USDA AMS — Hemp Program (Rules & Regulations)",
    href: "https://www.ams.usda.gov/rules-regulations/hemp",
  },
  {
    label: "USDA AMS — Establishment of a Domestic Hemp Production Program",
    href: "https://www.ams.usda.gov/rules-regulations/establishment-domestic-hemp-production-program",
  },
  {
    label: "FDA — Regulation of Cannabis and Cannabis-Derived Products (Including CBD)",
    href: "https://www.fda.gov/news-events/public-health-focus/fda-regulation-cannabis-and-cannabis-derived-products-including-cannabidiol-cbd",
  },
  {
    label: "FDA — Consumer Update: What to Know About Products Containing Cannabis/CBD",
    href: "https://www.fda.gov/consumers/consumer-updates/what-you-need-know-and-what-were-working-find-out-about-products-containing-cannabis-or-cannabis",
  },
  {
    label: "FDA — Cannabis: Research and Drug Approval Process",
    href: "https://www.fda.gov/news-events/public-health-focus/fda-and-cannabis-research-and-drug-approval-process",
  },
  {
    label: "FDA — Warning Letters for Cannabis-Derived Products",
    href: "https://www.fda.gov/news-events/public-health-focus/warning-letters-cannabis-derived-products",
  },
  {
    label: "FTC — Health Claims (Truth-in-Advertising guidance)",
    href: "https://www.ftc.gov/business-guidance/advertising-marketing/health-claims",
  },
  {
    label: "FTC — Making CBD health claims? Careful Before Disseminating",
    href: "https://www.ftc.gov/business-guidance/blog/2019/09/making-cbd-health-claims-careful-disseminating",
  },
  {
    label: "FTC — Enforcement action halting deceptive CBD marketing (Press Release)",
    href: "https://www.ftc.gov/news-events/news/press-releases/2021/05/ftc-announces-latest-enforcement-action-halting-deceptive-cbd-product-marketing",
  },
  {
    label: "USPS — Mailability of Hemp (Postal Bulletin update)",
    href: "https://about.usps.com/postal-bulletin/2019/pb22521/html/updt_002.htm",
  },
  {
    label: "USPS — Publication 52 hemp-based products correction (0.3% THC limit)",
    href: "https://about.usps.com/postal-bulletin/2021/pb22581/html/updt_003.htm",
  },
  {
    label: "DEA — Controlled Substances Act (CSA) overview",
    href: "https://www.dea.gov/drug-information/csa",
  },
  {
    label: "CDC — Marijuana and Public Health",
    href: "https://www.cdc.gov/marijuana/index.htm",
  },
  {
    label: "NIH / NIDA — Cannabis (Marijuana) DrugFacts",
    href: "https://nida.nih.gov/publications/drugfacts/cannabis-marijuana",
  },
  {
    label: "California Proposition 65 — Official site",
    href: "https://www.p65warnings.ca.gov",
  },
]

export default function CompliancePage() {
  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">
            Compliance & Legality
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-10">
              <p className="text-muted-foreground leading-relaxed mb-4">
                GUMMIESSHOP is committed to operating responsibly and in alignment with applicable
                federal and state requirements. This page provides a general overview of our
                compliance approach for <strong>hemp-derived cannabinoid gummies</strong>.
              </p>

              <h2 className="text-2xl font-semibold mb-4">1) 21+ Sales Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We restrict sales to customers aged <strong>21+</strong>. Many jurisdictions impose
                additional restrictions on cannabinoid products; our 21+ policy is designed to help
                support compliant sales practices across multiple states.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2) Federal Hemp Framework</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Products represented as hemp-derived are intended to align with the federal hemp
                definition established under the <strong>2018 Farm Bill</strong> (including the
                0.3% Delta-9 THC threshold on a dry-weight basis). Hemp production is regulated
                under USDA frameworks and approved state/tribal plans.
              </p>

              <h2 className="text-2xl font-semibold mb-4">3) FDA Position & Product Claims</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The FDA regulates foods, supplements, and drugs, and has published guidance and
                consumer information about cannabis and cannabis-derived products (including CBD).
                We do not provide medical advice and do not market products as intended to diagnose,
                treat, cure, or prevent disease.
              </p>

              <h2 className="text-2xl font-semibold mb-4">4) Advertising & Substantiation (FTC)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Marketing statements must be truthful and not misleading. Health-related claims
                require appropriate substantiation, and regulators have taken enforcement actions
                against deceptive or unsubstantiated CBD marketing.
              </p>

              <h2 className="text-2xl font-semibold mb-4">5) Shipping & Restricted Jurisdictions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to restrict shipping to jurisdictions where certain cannabinoid
                products are prohibited or heavily restricted. Customers are responsible for
                understanding local laws in their jurisdiction. For mail shipments, USPS provides
                specific guidance regarding the mailability of hemp-based products.
              </p>

              <h2 className="text-2xl font-semibold mb-4">6) California Proposition 65</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                California residents may see warnings provided pursuant to California Proposition 65.
                For official details, consult the State of California’s Prop 65 site.
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4 my-6">
                <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                  Important: This page is provided for general informational purposes only and does
                  not constitute legal advice.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Questions about compliance or orders? Contact us at{" "}
                <strong>{siteConfig.contact.email}</strong>.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Official References (Government / State)</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {sources.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} target="_blank" className="underline hover:text-blue-600">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
              <p className="text-xs text-muted-foreground italic">
                FDA Disclaimer: The statements regarding these products have not been evaluated by
                the Food and Drug Administration. These products are not intended to diagnose,
                treat, cure, or prevent any disease.
              </p>
            </section>
          </div>
        </article>
      </main>
    </PageWrapper>
  )
}