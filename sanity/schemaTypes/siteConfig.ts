// sanity/schemas/siteConfig.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  // 1. Organize fields into tabs
  groups: [
    { name: 'general', title: 'General & Contact' },
    { name: 'business', title: 'Business (Shipping/Crypto)' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'legal', title: 'Legal & Trust' },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    // --- GENERAL ---
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Info',
      type: 'object',
      group: 'general',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone Display', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp Number', type: 'string' },
        { name: 'address', title: 'Address', type: 'text' },
      ]
    }),

    // --- BUSINESS (Shipping & Crypto) ---
    defineField({
      name: 'shipping',
      title: 'Shipping Settings',
      type: 'object',
      group: 'business',
      fields: [
        { name: 'freeShippingThreshold', title: 'Free Shipping Threshold ($)', type: 'number' },
        { name: 'standardRate', title: 'Standard Rate ($)', type: 'number' },
        { name: 'expressRate', title: 'Express Rate ($)', type: 'number' },
      ]
    }),
    defineField({
      name: 'crypto',
      title: 'Crypto Settings',
      type: 'object',
      group: 'business',
      fields: [
        { name: 'enabled', title: 'Enable Crypto', type: 'boolean' },
        { name: 'discountPercent', title: 'Crypto Discount (%)', type: 'number' },
        { name: 'btcWallet', title: 'BTC Wallet Address', type: 'string' },
        { name: 'ethWallet', title: 'ETH Wallet Address', type: 'string' },
        { name: 'usdtWallet', title: 'USDT Wallet Address', type: 'string' },
        { name: 'ltcWallet', title: 'LTC Wallet Address', type: 'string' },
      ]
    }),

    // --- NAVIGATION ---
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          title: 'Menu Item',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link / Path' },
            { 
              name: 'children', 
              title: 'Sub Menu', 
              type: 'array', 
              of: [{ 
                type: 'object', 
                fields: [
                  { name: 'label', type: 'string' }, 
                  { name: 'href', type: 'string' }
                ] 
              }] 
            }
          ]
        }
      ]
    }),

    // --- LEGAL & TRUST ---
    defineField({
      name: 'legal',
      title: 'Legal Text',
      type: 'object',
      group: 'legal',
      fields: [
        { name: 'ageRestriction', title: 'Age Restriction', type: 'number', initialValue: 21 },
        { name: 'fdaWarning', title: 'FDA Warning', type: 'text' },
        { name: 'disclaimer', title: 'Footer Disclaimer', type: 'text' },
      ]
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      group: 'legal',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon Name (Lucide)', type: 'string', description: 'e.g. shield-check, truck' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
        ]
      }]
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'Global SEO',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Default Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Default Meta Description', type: 'text' },
        { name: 'ogImage', title: 'Default Social Share Image', type: 'image' },
        { name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string' },
        { name: 'socialInstagram', title: 'Instagram URL', type: 'url' },
        { name: 'socialTwitter', title: 'Twitter/X URL', type: 'url' },
      ]
    }),
  ]
})