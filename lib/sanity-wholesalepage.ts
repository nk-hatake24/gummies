// Ajoute ceci à tes imports
import { cache } from 'react'
import { client } from "@/sanity/lib/client"


export interface WholesalePageData {
  hero?: { title: string; description: string; highlights: string[]; buttonText: string };
  overview?: { title: string; content: string };
  pricingMoq?: { title: string; content: string };
  whyChoose?: { title: string; description: string; points: { title: string; desc: string }[] };
  process?: { steps: { stepNumber: string; title: string; description: string }[] };
  seoBlock?: { title: string; content: string };
  finalCta?: { title: string; description: string; buttonText: string };
  faqs?: { question: string; answer: string }[];
}

const WHOLESALE_PAGE_QUERY = `{
  "settings": *[_type == "wholesalePage"][0]{
    hero,
    overview,
    pricingMoq,
    whyChoose,
    process,
    seoBlock,
    finalCta
  },
  "faqs": *[_type == "faq" && category->slug.current == "wholesale"] {
    question,
    answer
  }
}`;
export const getWholesalePageData = cache(async (): Promise<WholesalePageData> => {
  const data = await client.fetch(WHOLESALE_PAGE_QUERY, {}, { next: { revalidate: 3600 } });
  
  // Fusionner les objets pour simplifier l'utilisation
  return {
    ...data.settings,
    faqs: data.faqs
  };
});