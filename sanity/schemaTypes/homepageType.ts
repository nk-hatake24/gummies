// sanity/schemas/homePage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Tabs to organize the input fields
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    // --- SEO SECTION ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      description: 'These settings control how your page appears on Google and social media.',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title used for search engines and browser tabs.',
          validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by Google.')
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Summary seen on Google search results.',
          validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by Google.')
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image displayed when sharing the link on Facebook, Twitter, WhatsApp, etc.'
        })
      ]
    }),

    // --- GROUPE 1 : HERO SECTION ---
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'smallTitle',
          title: 'Small Title (Top Tag)',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text', 
          rows: 3,
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
          {
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
            description: 'Important for SEO and accessiblity.',
            validation: (Rule) => Rule.required(),
          }
        ]
        })
      ]
    }),

    // --- GROUPE 2 : BULK SECTION ---
    defineField({
      name: 'bulkSection',
      title: 'Bulk Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text' 
        }),
        defineField({
          name: 'BulkImage',
          title: 'Bulk Background Image',
          type: 'image',
          options: {
            hotspot: true, 
          },
          fields: [
          {
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
            description: 'Important for SEO and accessiblity.',
            validation: (Rule) => Rule.required(),
          }
        ]
        })
      ]
    }),

     // 2. TESTIMONIALS
       // --- JUST TESTIMONIALS ---
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'array',
      group: 'content',
      description: 'Add customer reviews here. Stats and Compliance icons are hardcoded.',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'content', 
            type: 'text', 
            title: 'Review Content', 
            rows: 3,
            validation: Rule => Rule.required()
          },
          { 
            name: 'author', 
            type: 'string', 
            title: 'Author Name',
            validation: Rule => Rule.required()
          },
          { 
            name: 'role', 
            type: 'string', 
            title: 'Role / Location',
            description: 'e.g. "Vape Shop Owner, Texas"'
          },
        ]
      }]
    }),
    


    // --- GROUPE 3 : WHOLESALE SECTION ---
    defineField({
      name: 'wholesaleSection',
      title: 'Wholesale Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'minimumOrder',
          title: 'Minimum Order',
          type: 'string',
          description: 'e.g., "500 Units" or "$1000 minimum"',
        })
      ]
    })
  ]
})