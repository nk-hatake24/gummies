import { cache } from 'react'
import { client } from "@/sanity/lib/client"

// Fragment pour récupérer les images proprement
const IMAGE_PROJECTION = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions
    }
  },
  alt
`

// 1. Récupérer tous les posts pour la liste
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage { ${IMAGE_PROJECTION} },
  "author": author->{name, image { ${IMAGE_PROJECTION} }},
  "categories": categories[]->title,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
}`

// 2. Récupérer un post unique par son slug
const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage { ${IMAGE_PROJECTION} },
  "author": author->{name, image { ${IMAGE_PROJECTION} }, bio},
  "categories": categories[]->title,
  body
}`

export const getBlogPosts = cache(async () => {
  return await client.fetch(POSTS_QUERY, {}, { next: { revalidate: 60 } }) // Cache 60s
})

export const getBlogPostBySlug = cache(async (slug: string) => {
  return await client.fetch(SINGLE_POST_QUERY, { slug }, { next: { revalidate: 60 } })
})