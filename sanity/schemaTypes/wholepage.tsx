import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'wholesalePage',
  title: 'Wholesale Page Content',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero' },
    { name: 'overview', title: '2. Overview' },
    { name: 'pricing', title: '3. Pricing & MOQ' },
    { name: 'whyChoose', title: '4. Why Choose Us' },
    { name: 'process', title: '5. How It Works' },
    { name: 'seo', title: '6. SEO Block' },
    { name: 'cta', title: '8. Final CTA' },
  ],
  fields: [
    // 1. HERO SECTION
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'title', type: 'string', title: 'H1 Title', initialValue: 'Vape Wholesale Supply — Bulk Ordering for Commercial Buyers' },
        { name: 'description', type: 'text', title: 'Description', rows: 4 },
        { 
          name: 'highlights', 
          title: 'Wholesale Highlights', 
          type: 'array', 
          of: [{ type: 'string' }]
        },
        { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Request Wholesale Pricing' }
      ]
    }),

    // 2. OVERVIEW CONTENT
    defineField({
      name: 'overview',
      title: 'Wholesale Overview',
      type: 'object',
      group: 'overview',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'content', type: 'text', title: 'Content', rows: 5 }
      ]
    }),

    // 3. PRICING & MOQ
    defineField({
      name: 'pricingMoq',
      title: 'Pricing & MOQ Explanation',
      type: 'object',
      group: 'pricing',
      fields: [
        { name: 'title', type: 'string', title: 'Title', initialValue: 'Pricing & MOQ Explanation' },
        { name: 'content', type: 'text', title: 'Content', rows: 4 }
      ]
    }),

    // 4. WHY CHOOSE US
    defineField({
      name: 'whyChoose',
      title: 'Why Choose Our Program',
      type: 'object',
      group: 'whyChoose',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Intro Description' },
        { 
          name: 'points', 
          type: 'array', 
          title: 'Bullet Points',
          of: [{ 
            type: 'object', 
            fields: [
              { name: 'title', type: 'string' }, 
              { name: 'desc', type: 'text' }
            ] 
          }] 
        }
      ]
    }),

    // 5. PROCESS (HOW IT WORKS)
    defineField({
      name: 'process',
      title: 'How Wholesale Ordering Works',
      type: 'object',
      group: 'process',
      fields: [
        { 
          name: 'steps', 
          type: 'array', 
          title: 'Steps',
          of: [{ 
            type: 'object', 
            fields: [
              { name: 'stepNumber', type: 'string', title: 'Number (01)' },
              { name: 'title', type: 'string' }, 
              { name: 'description', type: 'text' }
            ] 
          }] 
        }
      ]
    }),

    // 6. SEO CONTENT BLOCK
    defineField({
      name: 'seoBlock',
      title: 'SEO Content Block',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'title', type: 'string', title: 'Title (Optional)' },
        { name: 'content', type: 'text', title: 'SEO Text', rows: 6 }
      ]
    }),

    // 8. FINAL CTA
    defineField({
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Start Wholesale Inquiry' }
      ]
    })
  ]
})