export interface FAQItem {
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    question: "What is the Minimum Order Quantity (MOQ)?",
    answer: "Our general MOQ for wholesale accounts is $500 per order. For specific product lines or limited editions, a minimum of 50 units may apply. Please check the product page for specific details.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 180 countries worldwide. Shipping rates and transit times are calculated automatically at checkout based on the destination and package weight.",
  },
  {
    question: "How do I pay with Crypto?",
    answer: "Select 'Crypto Payment' at the order form to generate a secure payment address. We accept BTC, ETH, and USDT (TRC20/ERC20). You will automatically receive a 10% discount on your invoice.",
  },
  {
    question: "Are your products authentic?",
    answer: "Absolutely. We guarantee 100% authenticity on every item. We source directly from authorized manufacturers and verified distributors. Authenticity certificates are available upon request.",
  },
  {
    question: "What about Customs and Import Duties?",
    answer: "For most wholesale orders, import duties are the responsibility of the buyer. However, for certain regions (EU & UK), we offer DDP (Delivered Duty Paid) shipping options to streamline the process.",
  },
  {
    question: "Can I request product samples?",
    answer: "Yes, verified retail partners can request a sample pack. The cost of samples is fully refundable and will be deducted from your first official wholesale order exceeding $1,000.",
  },
  {
    question: "What is your return policy for wholesale?",
    answer: "We accept returns for defective items within 14 days of delivery. Due to the nature of wholesale pricing, change-of-mind returns are subject to a 15% restocking fee.",
  },
  {
    question: "How long does order processing take?",
    answer: "We pride ourselves on speed. 95% of orders are processed and dispatched within 24 hours of payment confirmation. You will receive a tracking number immediately after dispatch.",
  },
]