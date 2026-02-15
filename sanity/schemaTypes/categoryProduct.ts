import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Product Category',
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
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Used for cards and meta description fallback',
    }),
    // --- LE CŒUR DE TON OPTIMISATION ---
    defineField({
      name: 'aboutSection',
      title: 'About This Category (SEO & Info)',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { 
          name: 'content', 
          type: 'array', 
          title: 'Rich Content',
          of: [{ type: 'block' }] // Permet gras, h2, listes, etc.
        },
        { name: 'image', type: 'image', title: 'Side Image' }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    // SEO SPECIFIQUE
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' }
      ]
    })
  ],
})