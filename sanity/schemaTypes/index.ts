import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import homepageType from './homepageType'
import product from './product'
import { categories } from '@/config/products.config'
import categoryComparison from './categoryComparison'
import categoryProduct from './categoryProduct'
import productComparison from './productComparison'
import faq from './faq'
import faqCategory from './faqCategory'
import wholepage from './wholepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, homepageType, product,categoryComparison, categoryProduct, productComparison, faq, faqCategory, wholepage  ],
}
