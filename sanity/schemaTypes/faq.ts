import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text', // Ou 'array' of 'block' si tu veux du gras/liens
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this to show this question in the short list on the home page.',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category.name'
    }
  }
})