import type { Metadata } from "next"
import  PageWrapper from "@/components/shared/page-wrapper"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order securely.",
}

export default function CheckoutPage() {
  return (
    <PageWrapper>
      <div className="pt-24 lg:pt-28 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-10">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Checkout Form */}
            <div className="lg:col-span-7">
              <CheckoutForm />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
