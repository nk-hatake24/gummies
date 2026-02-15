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
    description: "America's leading wholesale distributor for premium disposable vapes and e-liquids.",
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
        { label: "Distributor Info", href: "/wholesale" },
        { label: "MOQ Info", href: "/wholesale/moq" },
        { label: "Shipping Info", href: "/shipping" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Compliance & Legality", href: "/compliance" },
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
        { label: "Age Restriction", href: "/age-policy" },
      ],
    },
  ] as FooterSection[],
}