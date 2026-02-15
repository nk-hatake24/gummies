import React from "react"
import { Clock, ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react"

export function ContactInfo() {
  return (
    <section className="w-full py-16 lg:py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* COLUMN 1: Response Time & Process */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-8 tracking-tight">
              Response Time & What Happens Next
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Once your message is submitted:
            </p>

            {/* Steps */}
            <div className="space-y-8 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-lg text-foreground">Manual Review</h3>
                  <p className="text-muted-foreground mt-1">Our team reviews your inquiry manually.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-lg text-foreground">Direct Response</h3>
                  <p className="text-muted-foreground mt-1">We respond with the relevant information or next steps.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-lg text-foreground">Transaction Details</h3>
                  <p className="text-muted-foreground mt-1">If applicable, order or payment details are shared directly with you.</p>
                </div>
              </div>
            </div>

            {/* Guaranteed Time Box */}
            <div className="bg-accent/10 border border-border rounded-lg p-6 flex items-start gap-4">
              <Clock className="w-6 h-6  mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif text-xl mb-2 text-accent">Guaranteed response time</h4>
                <p className="text-lg font-medium text-foreground mb-2">
                   Within an hour
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This response time applies to both email and WhatsApp inquiries, with WhatsApp typically receiving the fastest replies.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Important Info (Card Style) */}
          <div className="bg-muted rounded-xl p-8 lg:p-10 border border-border/50 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-8 h-8 text-foreground" />
              <h2 className="font-serif text-2xl md:text-3xl">Important Information</h2>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium block mb-1">No Automated Checkout</strong>
                  We do not use automated checkout or instant payment systems. Every interaction is human-to-human.
                </p>
              </li>
              
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium block mb-1">Direct Communication</strong>
                  All communication is handled directly by our team. You will never speak to a bot.
                </p>
              </li>

              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium block mb-1">Manual Processing</strong>
                  Orders, wholesale requests, and general inquiries are processed manually to ensure accuracy.
                </p>
              </li>

              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium block mb-1">Transparency</strong>
                  We prioritize clarity, transparency, and direct communication in every step of the process.
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}