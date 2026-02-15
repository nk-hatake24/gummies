import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comparisonTable',
  title: 'Comparison Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Compare Categories',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
    }),
    // 1. Les Colonnes (En-têtes)
    defineField({
      name: 'headers',
      title: 'Table Headers (Columns)',
      description: 'First item should be "Feature". Then add category names (e.g., Disposables, Pods...)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(2).error('You need at least a Feature column and one Category column.'),
    }),
    // 2. Les Lignes (Données)
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Comparison Row',
        fields: [
          {
            name: 'feature',
            title: 'Feature Name (First Column)',
            type: 'string',
            description: 'e.g., Maintenance, Battery Life...' 
          },
          {
            name: 'values',
            title: 'Cell Values',
            description: 'Add values corresponding to your headers order (skipping the Feature column).',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ],
        preview: {
          select: {
            title: 'feature',
            val0: 'values.0',
            val1: 'values.1'
          },
          prepare({ title, val0, val1 }) {
            return {
              title: title || 'New Row',
              subtitle: `${val0 || ''} | ${val1 || ''}...`
            }
          }
        }
      }]
    })
  ],
})