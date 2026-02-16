import type { Metadata } from "next"
import PageWrapper from "@/components/shared/page-wrapper"
import { ContactForm } from "@/components/contact/contact-form"
import { siteConfig } from "@/config/site.config"
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact GUMMIESSHOP | Gummies Support & Wholesale Inquiries",
  description:
    "Contact GUMMIESSHOP for gummies questions, wholesale inquiries, bulk ordering support, or general assistance. Fast response from our team.",

  alternates: {
    canonical: "/contact",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Contact GUMMIESSHOP | Gummies Support",
    description:
      "Reach our team for gummies orders, wholesale pricing, bulk requests, or business inquiries.",
    url: "/contact",
    siteName: "GUMMIESSHOP",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact GUMMIESSHOP",
    description: "Gummies support, wholesale inquiries & business assistance.",
  },
}

const normalizeDigits = (value: string) => value.replace(/[^\d]/g, "")

const whatsappNumber = siteConfig.contact.whatsapp
  ? normalizeDigits(siteConfig.contact.whatsapp)
  : ""

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp || siteConfig.contact.phone,
    href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.contact.address,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24/7 support",
  },
]

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-secondary/30">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl text-justify">
              If you have questions about our gummies, order requests, or wholesale inquiries, our team is here to help.
              All inquiries are handled manually to ensure accurate information and reliable support.
              Contact us using the methods below or submit the form, and we’ll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <div className="p-6 bg-accent/20 text-accent rounded-sm">
                  <h3 className="font-medium mb-2">Need Quick Answers?</h3>
                  <p className="text-sm text-muted-foreground">
                    For the fastest response, we recommend contacting us via WhatsApp.
                    WhatsApp messages are typically reviewed and answered more quickly than email.
                  </p>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-8 mt-8">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium hover:text-accent transition-colors"
                              target={item.href.startsWith("https://") ? "_blank" : undefined}
                              rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium">{item.value}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-1">
                  Send a Message
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Please provide clear and complete details so we can assist you efficiently.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>

      <ContactInfo />
    </PageWrapper>
  )
}