import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import  PageWrapper  from "@/components/shared/page-wrapper"
import { siteConfig } from "@/config/site.config"
import { Button } from "@/components/ui/button"
import { Shield, Truck, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BULK VAPES - your trusted source for premium vape products. Quality, authenticity, and customer satisfaction are our priorities.",
}

const values = [
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every product is sourced directly from authorized distributors. 100% genuine, always.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Shipping",
    description: "Same-day processing and reliable delivery across all 50 states.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Dedicated support team ready to assist you with any questions or concerns.",
  },
  {
    icon: Award,
    title: "Premium Selection",
    description: "Carefully curated products from the world's most trusted vape brands.",
  },
]

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Products Available" },
  { value: "48h", label: "Average Delivery" },
  { value: "99%", label: "Satisfaction Rate" },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-medium">About Us</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4">
                Premium Quality,
                <br />
                <span className="text-muted-foreground">Unmatched Value</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                {siteConfig.name} was founded with a simple mission: to provide adult vapers with access to authentic,
                high-quality products at competitive prices. Whether you're shopping for personal use or stocking your
                retail store, we're here to serve you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/wholesale">Wholesale Inquiry</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-muted rounded overflow-hidden">
              <Image src="/modern-minimal-warehouse-with-vape-products-on-she.jpg" alt="BULK VAPES warehouse" fill className="object-cover" />
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
                <div className="font-serif text-4xl lg:text-5xl tracking-tight">{stat.value}</div>
                <div className="mt-2 text-sm text-background/60 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-accent font-medium">Our Values</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mt-4">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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
              <Image src="/professional-team-in-modern-office-discussing-vape.jpg" alt="Our team" fill className="object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs uppercase tracking-widest text-accent font-medium">Our Story</span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mt-4">
                Built by Vapers,
                <br />
                For Vapers
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, {siteConfig.name} emerged from a simple frustration: finding authentic vape products
                  at fair prices was harder than it should be.
                </p>
                <p>
                  We built direct relationships with authorized distributors and manufacturers to ensure every product
                  we sell is 100% genuine. No counterfeits, no compromises.
                </p>
                <p>
                  Today, we serve thousands of individual customers and hundreds of retail partners across the United
                  States. Our commitment to quality, authenticity, and customer satisfaction remains unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Browse our collection or reach out for wholesale pricing. We're here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Browse Products</Link>
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
