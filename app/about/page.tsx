import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PageWrapper from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"
import { Button } from "@/components/ui/button"
import { Shield, Truck, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GUMMIESSHOP — a trusted source for quality-selected gummies, built for fast fulfillment, secure checkout, and great customer support.",
}

const values = [
  {
    icon: Shield,
    title: "Quality Selected",
    description:
      "We focus on quality, consistency, and clear product information so you can shop with confidence.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Shipping",
    description:
      "Quick processing and reliable delivery options across eligible U.S. destinations.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Real support, fast answers, and a team that helps you choose the right products for your needs.",
  },
  {
    icon: Award,
    title: "Curated Selection",
    description:
      "A curated catalog of gummies across popular categories, strengths, and formats — retail and wholesale-friendly.",
  },
]

const stats = [
  { value: "50K+", label: "Customers Served" },
  { value: "500+", label: "Products Available" },
  { value: "1–2d", label: "Processing Time" },
  { value: "99%", label: "Support Satisfaction" },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-medium">
                About Us
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4">
                Quality You Can Trust,
                <br />
                <span className="text-muted-foreground">Value You’ll Notice</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                {siteConfig.name} was built with a simple mission: make it easier for adults to shop
                for gummies with clear product details, secure checkout, and reliable fulfillment.
                Whether you’re buying for yourself or sourcing for a retail store, we’re here to help.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/products">Shop Gummies</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/wholesale">Wholesale Inquiry</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] bg-muted rounded overflow-hidden">
              {/* Replace with your gummies/warehouse image */}
              <Image
                src="/modern-minimal-warehouse-with-packaged-gummies.jpg"
                alt="GUMMIESSHOP fulfillment and inventory"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-4xl lg:text-5xl tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-background/60 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-accent font-medium">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mt-4">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-square bg-muted rounded overflow-hidden order-2 lg:order-1">
              {/* Replace with your team image */}
              <Image
                src="/professional-team-in-modern-office-discussing-ecommerce.jpg"
                alt="GUMMIESSHOP team"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs uppercase tracking-widest text-accent font-medium">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mt-4">
                Built for Adults,
                <br />
                Designed for Convenience
              </h2>

              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  {siteConfig.name} started with a simple idea: adults should be able to shop gummies
                  online with clear info, straightforward pricing, and a reliable customer experience.
                </p>
                <p>
                  We focus on responsible retail practices, secure payments, and operational discipline —
                  from inventory handling to customer support — so you can buy with confidence.
                </p>
                <p>
                  Today, we serve individual customers and retail partners across eligible U.S. locations,
                  while keeping the same priorities: quality, transparency, and fast issue resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Browse our gummies collection or reach out for wholesale pricing — we’re here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Browse Gummies</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}