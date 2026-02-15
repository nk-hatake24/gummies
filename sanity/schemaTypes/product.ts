import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: { hotspot: true },
        fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'imageId', type: 'string', title: 'Image ID', description: 'ID unique pour lier aux variantes (ex: blue)' }
        ] 
      }],
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'variants', //flavors eg banana ice
      title: 'Variants',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'id', type: 'string', title: 'Unique ID' },
          { name: 'sku', type: 'string' },
          { name: 'price', type: 'number' },
          { name: 'compareAtPrice', type: 'number' },
          { name: 'minOrder', type: 'number', initialValue: 1 },
          { name: 'maxOrder', type: 'number', initialValue: 50 },
          { name: 'isWholesale', type: 'boolean', initialValue: false },
          { name: 'inStock', type: 'boolean', initialValue: true },
          { name: 'imageId', type: 'string', title: 'Linked Image ID' }
        ],
        preview: {
            select: { title: 'name', price: 'price' },
            prepare({ title, price }) {
                return { title: `${title} - $${price}` }
            }
        }
      }]
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'value', type: 'string' }
        ]
      }]
    }),
    defineField({
        name: 'relatedProducts',
        title: 'Related Products',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }]
    }),
    defineField({
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
            list: [
                { title: 'Featured', value: 'featured' },
                { title: 'New', value: 'new' },
                { title: 'Bestseller', value: 'bestseller' }
            ]
        }
    }),
    // Section Comparison
    defineField({
      name: 'comparison',
      title: 'Comparison Section (SEO & Conversion)',
      type: 'productComparison', 
      options: { collapsible: true, collapsed: true } 
    }),
    
    // --- SECTION MOQ (Corrigée : Fermée correctement) ---
    defineField({
      name: 'moqSection',
      title: 'MOQ & Bulk Pricing (Bottom Section)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Volume Discounts'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'tiers',
          title: 'Pricing Tiers',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string', title: 'Label (ex: 50+ Units)' },
              { name: 'discount', type: 'string', title: 'Discount/Price (ex: $12.50/ea)' },
              { name: 'features', type: 'string', title: 'Feature (ex: Free Shipping)' }
            ]
          }]
        })
      ] // Fin des fields de moqSection
    }), // Fin de moqSection

    // --- SECTION FAQ (Déplacée ici : Au même niveau que les autres) ---
    defineField({
      name: 'faq',
      title: 'Product FAQ',
      description: 'Specific questions related to this product.',
      type: 'array',
      of: [{
        type: 'object',
        icon: () => '❓',
        options: { collapsible: true, collapsed: true },
        fields: [
          { 
            name: 'question', 
            type: 'string', 
            title: 'Question', 
            validation: (Rule) => Rule.required() 
          },
          { 
            name: 'answer', 
            type: 'text', 
            title: 'Answer', 
            rows: 3,
            validation: (Rule) => Rule.required() 
          }
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'answer'
          }
        }
      }]
    }),

  ], // Fin du tableau fields principal

  preview: {
    select: {
      title: 'name',
      media: 'images.0'
    }
  }
})