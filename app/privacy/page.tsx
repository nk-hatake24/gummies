import type { Metadata } from "next"
import PageWrapper from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how GUMMIESSHOP collects, uses, shares, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <main className="min-h-screen pt-24 lg:pt-28">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-3">
            Privacy Policy
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how{" "}
              <strong>{siteConfig.name ?? "GUMMIESSHOP"}</strong> (“we,” “us,” or “our”) collects,
              uses, discloses, and protects information when you visit our website, place an order,
              or contact us. We aim to follow applicable U.S. privacy and consumer-protection
              requirements and best practices, including guidance from official agencies and
              standards bodies.
            </p>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you voluntarily provide when you submit inquiries, create an
                account (if applicable), place an order, request wholesale information, or
                communicate with us, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone/WhatsApp number (if provided)</li>
                <li>Company name and business details (if provided for wholesale)</li>
                <li>Inquiry details, messages, and attachments you send us</li>
                <li>Shipping and billing information (if you place an order)</li>
                <li>Order history and customer service interactions</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4 mb-0">
                We may also collect information automatically from your browser or device when you
                use the website, such as IP address, device identifiers, pages visited, referring
                URLs, approximate location (derived from IP), and cookie/analytics data.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">2. Age Verification (21+)</h2>
              <p className="text-muted-foreground leading-relaxed">
                To support our 21+ sales policy, we may use third-party identity and age
                verification services. Verification may require additional information (for example,
                name, date of birth, address, or identity checks) to confirm eligibility. If
                verification fails, we may cancel or refuse an order and refund where applicable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">3. How We Use Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Respond to inquiries and provide customer support</li>
                <li>Process orders, payments, shipping, and returns (when applicable)</li>
                <li>Verify eligibility for purchase (e.g., age verification)</li>
                <li>Communicate about products, availability, pricing, and service updates</li>
                <li>Prevent fraud, abuse, chargebacks, and unauthorized access</li>
                <li>Improve website performance, reliability, and user experience</li>
                <li>Comply with legal obligations and enforce our policies</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                We do not sell your personal information for money. If our practices change, we
                will update this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">4. Communications (Email, Phone, WhatsApp)</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you provide an email address, we may email you about your inquiry or transaction.
                If you provide a phone number or WhatsApp number, we may contact you about your
                inquiry or order. Where marketing emails are sent, we aim to follow applicable
                U.S. requirements (including opt-out mechanisms). Where applicable, telemarketing
                and automated messaging rules may apply.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">5. Cookies &amp; Analytics</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use cookies and similar technologies to keep the site working, remember
                preferences, understand usage, and improve performance. You can typically manage
                cookies through your browser settings. We also consider privacy risk management
                best practices.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">6. How We Share Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share information with service providers only as needed to operate the
                business, for example:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Payment processors (to process payments)</li>
                <li>Shipping carriers and logistics partners (to deliver orders)</li>
                <li>Age/identity verification providers (to confirm eligibility)</li>
                <li>Website hosting, analytics, and security providers</li>
                <li>Customer support tools (to manage inquiries)</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                We may also disclose information if required by law, legal process, or to protect
                rights, safety, and security (for example, to respond to lawful requests by public
                authorities).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">7. Sensitive Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not intentionally collect sensitive personal information unless needed for a
                specific purpose (for example, to comply with eligibility checks or security
                requirements). Please do not send us sensitive information through open email
                channels unless requested by our support team for a specific issue.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We keep personal information only as long as necessary for the purposes described
                in this policy, such as responding to you, maintaining business records, complying
                with legal obligations, resolving disputes, and enforcing agreements. Retention
                periods vary depending on the type of data and applicable requirements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">9. Data Protection &amp; Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use reasonable administrative, technical, and physical safeguards designed to
                protect personal information against unauthorized access, disclosure, alteration, or
                destruction. No method of transmission or storage is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is not directed to children under 13, and we do not knowingly collect
                personal information from children under 13. If you believe a child has provided
                personal information to us, contact us and we will take appropriate steps.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">11. Your Privacy Rights (U.S.)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your state of residence and applicable law, you may have rights such
                as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Request access to personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of personal information (subject to exceptions)</li>
                <li>Opt out of certain processing (e.g., targeted advertising, where applicable)</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                To make a request, contact us at{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. We
                may need to verify your identity before completing certain requests.
              </p>

              <div className="mt-5 rounded-xl border border-border p-4">
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong>California notice (CCPA/CPRA).</strong> If you are a California resident,
                  additional resources are available from the California Attorney General and the
                  California Privacy Protection Agency.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">
                      California Attorney General – CCPA
                    </a>
                  </li>
                  <li>
                    <a href="https://cppa.ca.gov/" target="_blank" rel="noopener noreferrer">
                      California Privacy Protection Agency (CPPA)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://privacy.ca.gov/california-privacy-rights/rights-under-the-california-consumer-privacy-act/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      privacy.ca.gov – Rights under the CCPA (as amended)
                    </a>
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-5">
                For an overview of state privacy laws (varies by state and changes over time), see
                official legislative resources such as NCSL.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">12. Do Not Track</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some browsers offer a “Do Not Track” signal. Because there is no single industry
                standard for responding to these signals, we may not respond to all Do Not Track
                requests.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">13. International Visitors</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you access the site from outside the United States, your information may be
                processed in the U.S. or other jurisdictions where our service providers operate.
                By using the site, you understand that your information may be transferred to and
                processed in those locations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-4">14. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will post the updated
                version on this page.
              </p>
            </section>

            <section className="mb-2">
              <h2 className="font-serif text-2xl mb-4">15. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions or requests? Contact us at{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
              </p>
            </section>

            <hr className="my-10" />

            <section>
              <h2 className="font-serif text-2xl mb-4">Reference Links (Official Sources)</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  FTC – Privacy &amp; Security guidance:{" "}
                  <a href="https://www.ftc.gov/business-guidance/privacy-security" target="_blank" rel="noopener noreferrer">
                    ftc.gov/business-guidance/privacy-security
                  </a>
                </li>
                <li>
                  FTC – Protecting Personal Information (Guide for Business):{" "}
                  <a
                    href="https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ftc.gov/.../protecting-personal-information-guide-business
                  </a>
                </li>
                <li>
                  FTC – CAN-SPAM compliance guide:{" "}
                  <a
                    href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ftc.gov/.../can-spam-act-compliance-guide-business
                  </a>
                </li>
                <li>
                  FCC – Stop unwanted robocalls/texts:{" "}
                  <a
                    href="https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fcc.gov/.../stop-unwanted-robocalls-and-texts
                  </a>
                </li>
                <li>
                  FTC – COPPA FAQs:{" "}
                  <a
                    href="https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ftc.gov/.../complying-coppa-frequently-asked-questions
                  </a>
                </li>
                <li>
                  FTC – COPPA Rule page:{" "}
                  <a
                    href="https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ftc.gov/.../childrens-online-privacy-protection-rule-coppa
                  </a>
                </li>
                <li>
                  eCFR – COPPA Rule (16 CFR Part 312):{" "}
                  <a
                    href="https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ecfr.gov/.../16/part-312
                  </a>
                </li>
                <li>
                  NIST – Privacy Framework:{" "}
                  <a href="https://www.nist.gov/privacy-framework" target="_blank" rel="noopener noreferrer">
                    nist.gov/privacy-framework
                  </a>
                </li>
                <li>
                  California Attorney General – CCPA:{" "}
                  <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">
                    oag.ca.gov/privacy/ccpa
                  </a>
                </li>
                <li>
                  California Privacy Protection Agency (CPPA):{" "}
                  <a href="https://cppa.ca.gov/" target="_blank" rel="noopener noreferrer">
                    cppa.ca.gov
                  </a>
                </li>
                <li>
                  privacy.ca.gov – CCPA rights (consumer resources):{" "}
                  <a
                    href="https://privacy.ca.gov/california-privacy-rights/rights-under-the-california-consumer-privacy-act/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy.ca.gov/.../rights-under-the-california-consumer-privacy-act
                  </a>
                </li>
                <li>
                  NCSL – State laws related to digital privacy:{" "}
                  <a
                    href="https://www.ncsl.org/technology-and-communication/state-laws-related-to-digital-privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ncsl.org/.../state-laws-related-to-digital-privacy
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </PageWrapper>
  )
}