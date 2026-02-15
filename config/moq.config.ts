import { Box, Droplets, Smartphone, CheckCircle2, TrendingUp, Layers, Zap, ShieldCheck } from "lucide-react"

export const moqConfig = {
  header: {
    label: "Order Requirements",
    title: "MOQ Information",
    description: "Understanding our minimum order quantities for wholesale pricing",
  },
  mainThreshold: {
    amount: "$500",
    label: "Minimum Order",
    description: "To maintain our wholesale pricing structure and ensure the best value for our partners, we require a minimum total order value of $500.00 USD. Orders below this threshold cannot be processed through our wholesale portal.",
  },
  products: [
    {
      title: "Disposable Vapes",
      icon: Box,
      requirements: [
        "Sold in display boxes (typically 10 units per box)",
        "Minimum: 5 boxes per order",
        "Mix and match flavors available",
      ],
    },
    {
      title: "E-Liquids",
      icon: Droplets,
      requirements: [
        "Minimum: 20 bottles per order",
        "Can mix flavors and nicotine strengths",
        "Available in 30ml, 60ml, and 100ml sizes",
      ],
    },
    {
      title: "Hardware & Kits",
      icon: Smartphone,
      requirements: [
        "Minimum: 5 kits per order",
        "Includes mods, pod systems, and starter kits",
        "Replacement coils and pods available",
      ],
    },
  ],
  samples: {
    title: "Sample Orders Available",
    description: "We understand the need to test products before committing to larger orders. Sample orders below the MOQ can be arranged by contacting your account manager directly.",
    features: ["Retail Pricing Applies", "Contact Account Manager", "Limited Quantities"],
  },
  benefits: [
    {
      title: "Better Margins",
      description: "Wholesale pricing ensures maximum profitability for your business",
      icon: TrendingUp,
    },
    {
      title: "Inventory Variety",
      description: "Mix and match products to build a diverse inventory",
      icon: Layers,
    },
    {
      title: "Fast Processing",
      description: "Streamlined fulfillment for orders meeting MOQ requirements",
      icon: Zap,
    },
    {
      title: "Quality Assurance",
      description: "All products are 100% authentic and verified",
      icon: ShieldCheck,
    },
  ],
}