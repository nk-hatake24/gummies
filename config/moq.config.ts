import { Box, CheckCircle2, TrendingUp, Layers, Zap, ShieldCheck } from "lucide-react"

export const moqConfig = {
  header: {
    label: "Wholesale Requirements",
    title: "Minimum Order Information",
    description:
      "Understand our wholesale minimums and ordering structure for bulk gummies.",
  },

  mainThreshold: {
    amount: "$500",
    label: "Minimum Wholesale Order",
    description:
      "To access wholesale pricing at GUMMIESSHOP, a minimum total order value of $500.00 USD is required. This allows us to maintain competitive bulk pricing and efficient fulfillment for our retail partners.",
  },

  products: [
    {
      title: "THC Gummies",
      icon: Box,
      requirements: [
        "Sold in sealed retail-ready packs",
        "Minimum: 10 packs per SKU",
        "Mix and match flavors and strengths available",
      ],
    },

    {
      title: "CBD Gummies",
      icon: Box,
      requirements: [
        "Minimum: 20 packs per order",
        "Can mix strengths and formulations",
        "Retail-ready compliant packaging",
      ],
    },

    {
      title: "Functional Gummies",
      icon: Box,
      requirements: [
        "Minimum: 15 packs per SKU",
        "Includes sleep, wellness, and specialty blends",
        "Bulk pricing tiers available",
      ],
    },
  ],

  samples: {
    title: "Sample Orders Available",
    description:
      "We understand that retailers may want to evaluate products before committing to full wholesale quantities. Limited sample orders below MOQ may be arranged upon request.",
    features: [
      "Retail Pricing Applies",
      "Limited Quantities",
      "Contact Sales Team",
    ],
  },

  benefits: [
    {
      title: "Improved Profit Margins",
      description:
        "Wholesale pricing helps maximize resale profitability.",
      icon: TrendingUp,
    },
    {
      title: "Product Variety",
      description:
        "Mix multiple flavors, strengths, and categories within your order.",
      icon: Layers,
    },
    {
      title: "Efficient Fulfillment",
      description:
        "Orders meeting MOQ are processed quickly and securely.",
      icon: Zap,
    },
    {
      title: "Quality Control",
      description:
        "Products are sourced with strict quality standards and verified documentation.",
      icon: ShieldCheck,
    },
  ],
}