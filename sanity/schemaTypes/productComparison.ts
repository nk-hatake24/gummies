import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productComparison',
  title: 'Product Comparison Logic',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Comparison Section',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'competitorName',
      title: 'Competitor Name',
      description: 'e.g. "Standard Disposables" or "Elf Bar BC5000"',
      type: 'string',
    }),
    defineField({
      name: 'marketingText',
      title: 'Marketing Hook',
      description: 'Why is this product better? (Replaces the default text)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'expertNote',
      title: 'Sommelier/Expert Note',
      description: 'Short punchy quote about the quality.',
      type: 'text',
      rows: 2
    }),
    // Les barres de progression visuelles
    defineField({
      name: 'visualMetrics',
      title: 'Visual Metrics (Bars)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label (ex: Sweetness)' },
          { name: 'productValue', type: 'number', title: 'This Product Score (0-100)' },
          { name: 'competitorValue', type: 'number', title: 'Competitor Score (0-100)' }
        ],
        preview: {
            select: { title: 'label', val: 'productValue' },
            prepare({ title, val }) { return { title: `${title} (${val}%)` } }
        }
      }],
      validation: rule => rule.max(3)
    }),
    // La grille de 4 points forts
    defineField({
      name: 'keyDifferences',
      title: 'Key Differences (Grid)',
      type: 'array',
      validation: rule => rule.max(4),
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'icon', 
            title: 'Icon', 
            type: 'string',
            options: {
                list: [
                    { title: 'Battery / Charging', value: 'battery' },
                    { title: 'Longevity / Up', value: 'trending' },
                    { title: 'Screen / Tech', value: 'screen' },
                    { title: 'Airflow / Wind', value: 'wind' },
                    { title: 'Flavor / Drop', value: 'flavor' }
                ]
            }
          },
          { name: 'title', type: 'string', title: 'Feature Title' },
          { name: 'description', type: 'text', title: 'Comparison Description', rows: 3 }
        ]
      }]
    })
  ]
})