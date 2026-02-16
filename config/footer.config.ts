export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export const footerData = {
  brand: {
    description:
      "GUMMIESSHOP is a trusted online retailer and wholesale supplier of premium gummies, offering quality-selected products with fast shipping and secure checkout.",
  },

  sections: [
    {
      title: "Shop",
      links: [
        { label: "Wholesale", href: "/wholesale" },
        { label: "Categories", href: "/categories" },
        
      ],
    },

    {
      title: "Wholesale",
      links: [
        { label: "Wholesale Program", href: "/wholesale" },
        { label: "Minimum Order Info", href: "/wholesale/moq" },
        { label: "Bulk Pricing", href: "/wholesale/pricing" },
        { label: "Shipping Information", href: "/shipping" },
      ],
    },

    {
      title: "Company",
      links: [
        { label: "About GUMMIESSHOP", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Compliance & Regulations", href: "/compliance" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact Us", href: "/contact" },
      ],
    },

    {
      title: "Legal",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Refund Policy", href: "/refunds" },
        { label: "Age Policy", href: "/age-policy" },
      ],
    },
  ] as FooterSection[],
}