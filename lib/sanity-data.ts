// lib/sanity-data.ts
import { cache } from 'react' // <--- IMPORTANT pour la déduplication
import { client } from "@/sanity/lib/client";


// ==========================================
// CONFIGURATION DU CACHE (ISR)
// ==========================================
// 3600s = 1 heure. Google verra les mises à jour max 1h après.
// C'est le meilleur équilibre perf/fraîcheur.
const REVALIDATE_TIME = 3600; 

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================


import { siteConfig as staticConfig, navigation as staticNav, trustBadges as staticBadges, CRYPTO_WALLETS as staticWallets, legalConfig as staticLegal } from "@/config/site.config"




// ... (Keep your existing REVALIDATE_TIME and types) ...

const SITE_CONFIG_QUERY = `*[_type == "siteConfig"][0]{
  name,
  tagline,
  url,
  contact,
  shipping,
  
  // 1. Fetch Crypto Fields
  crypto {
    enabled,
    discountPercent,
    acceptedCurrencies,
    btcWallet,
    ethWallet,
    usdtWallet,
    ltcWallet
  },

  // 2. Fetch Navigation with children
  mainNav[] {
    label,
    href,
    children[] { label, href }
  },

  // 3. Fetch Legal
  legal,

  // 4. Fetch Trust Badges
  trustBadges[] {
    icon,
    title,
    description
  },

  seo {
    metaTitle,
    metaDescription,
    ogImage, // ... add your image projection here
    googleAnalyticsId,
    socialInstagram,
    socialTwitter
  }
}`

export const getSiteConfig = cache(async () => {
  try {
    const sanityData = await client.fetch(SITE_CONFIG_QUERY, {}, { next: { revalidate: 3600 } });

    if (!sanityData) return { 
        siteConfig: staticConfig, 
        navigation: staticNav, 
        trustBadges: staticBadges, 
        legalConfig: staticLegal,
        cryptoWallets: staticWallets
    };

    // --- MAPPING LOGIC (Transform Sanity Data to Static Structure) ---

    // A. Reconstruct 'siteConfig'
    const dynamicSiteConfig = {
      ...staticConfig,
      name: sanityData.name || staticConfig.name,
      tagline: sanityData.tagline || staticConfig.tagline,
      contact: { ...staticConfig.contact, ...sanityData.contact },
      social: {
        instagram: sanityData.seo?.socialInstagram || staticConfig.social.instagram,
        twitter: sanityData.seo?.socialTwitter || staticConfig.social.twitter,
      },
      shipping: { ...staticConfig.shipping, ...sanityData.shipping },
      crypto: { 
        enabled: sanityData.crypto?.enabled ?? staticConfig.crypto.enabled,
        discountPercent: sanityData.crypto?.discountPercent ?? staticConfig.crypto.discountPercent,
        acceptedCurrencies: sanityData.crypto?.acceptedCurrencies || staticConfig.crypto.acceptedCurrencies,
      }
    };

    // B. Reconstruct 'CRYPTO_WALLETS' (Mapping fields to keys)
    const dynamicWallets = {
      btc: sanityData.crypto?.btcWallet || staticWallets.btc,
      eth: sanityData.crypto?.ethWallet || staticWallets.eth,
      usdt: sanityData.crypto?.usdtWallet || staticWallets.usdt,
      ltc: sanityData.crypto?.ltcWallet || staticWallets.ltc,
    };

    // C. Reconstruct 'navigation'
    // If Sanity has nav, use it. Otherwise fallback to static.
    const dynamicNav = sanityData.mainNav?.length > 0 ? sanityData.mainNav : staticNav;

    // D. Reconstruct 'trustBadges'
    const dynamicBadges = sanityData.trustBadges?.length > 0 ? sanityData.trustBadges : staticBadges;

    // E. Reconstruct 'legalConfig'
    const dynamicLegal = {
        ...staticLegal,
        ...sanityData.legal
    };

    // Return everything in one object
    return {
      siteConfig: dynamicSiteConfig,
      navigation: dynamicNav,
      trustBadges: dynamicBadges,
      legalConfig: dynamicLegal,
      cryptoWallets: dynamicWallets // New dynamic wallet object
    };

  } catch (error) {
    console.error("❌ Failed to fetch site config", error);
    return { 
        siteConfig: staticConfig, 
        navigation: staticNav, 
        trustBadges: staticBadges, 
        legalConfig: staticLegal,
        cryptoWallets: staticWallets
    };
  }
});

export interface SanityImage {
  asset: {
    _ref: string;
    url?: string;
    metadata?: {
      lqip: string; // Low Quality Image Placeholder (base64 blur)
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      }
    }
  };
  alt?: string;
  hotspot?: any;
  crop?: any;
}

export interface HomePageData {
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
  heroSection: {
    smallTitle?: string;
    title?: string;
    description?: string;
    heroImage?: SanityImage;
  };
  bulkSection: { 
    title?: string;
    description?: string;
    BulkImage?: SanityImage;
  };
  wholesaleSection: {
    minimumOrder?: string;
  };
  testimonials?: { 
    content: string; 
    author: string; 
    role: string; 
  }[];
}

// ==========================================
// 2. REQUÊTES OPTIMISÉES (GROQ)
// ==========================================

// Fragment réutilisable pour récupérer les images avec leur metadata (pour le flou/blur placeholder)
// Cela améliore énormément le Core Web Vitals (LCP & CLS) pour le SEO.
const IMAGE_PROJECTION = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions
    }
  },
  hotspot,
  crop,
  alt
`;

const HOME_QUERY = `*[_type == "homePage"][0]{
    seo {
      metaTitle,
      metaDescription,
      ogImage { ${IMAGE_PROJECTION} }
    },
    heroSection {
      smallTitle,
      title,
      description, 
      heroImage { ${IMAGE_PROJECTION} }
    },
    bulkSection { 
      title,
      description,
      BulkImage { ${IMAGE_PROJECTION} }
    },
    wholesaleSection {
      minimumOrder
    },
     testimonials[] {
      content,
      author,
      role
    },
}`;

// const SITE_CONFIG_QUERY = `*[_type == "siteConfig"][0]{
//   name,
//   tagline,
//   url,
//   contact,
//   shipping,
//   crypto,
//   mainNav,
//   legal,
//   trustBadges,
//   seo {
//     metaTitle,
//     metaDescription,
//     ogImage { ${IMAGE_PROJECTION} },
//     googleAnalyticsId,
//     socialInstagram,
//     socialTwitter
//   }
// }`;

// ==========================================
// 3. FONCTIONS DE FETCH (Data Fetching)
// ==========================================

/**
 * Récupère les données de la Home Page
 * Utilise React Cache pour éviter les doublons + Next.js Revalidate pour la vitesse CDN
 */
export const getHomePageData = cache(async (): Promise<HomePageData> => {
  try {
    const data = await client.fetch<HomePageData>(
      HOME_QUERY,
      {}, 
      { 
        // OPTIMISATION MAJEURE : Cache les données sur le serveur Vercel
        next: { revalidate: REVALIDATE_TIME } 
      }
    );
    
    // Si pas de données, on retourne un objet vide sécurisé pour éviter le crash
    return data || {
        seo: {},
        heroSection: {},
        bulkSection: {},
        wholesaleSection: {}, 
        testimonials: []
    };

  } catch (error) {
    console.error("❌ Error fetching HomePage data:", error);
    // Retour de secours pour ne pas casser la page
    return {
        seo: {},
        heroSection: {},
        bulkSection: {},
        wholesaleSection: {},
        testimonials: []
    };
  }
});

/**
 * Récupère la config du site avec stratégie "Smart Fallback"
 * Sanity est prioritaire, le fichier local sert de roue de secours.
 */
// export const getSiteConfig = cache(async () => {
//   try {
//     const sanityData = await client.fetch(
//       SITE_CONFIG_QUERY, 
//       {}, 
//       { 
//         // Config change rarement, on peut cacher plus longtemps (ex: 1 jour)
//         // Mais 1h est safe pour commencer.
//         next: { revalidate: 3600 } 
//       }
//     );

//     if (!sanityData) {
//       console.warn("⚠️ Sanity SiteConfig not found, using static fallback.");
//       return staticConfig;
//     }

//     // FUSION INTELLIGENTE :
//     // On prend le fichier statique comme base, et on écrase avec les données Sanity présentes.
//     // Cela garantit que si tu oublies de remplir un champ dans Sanity, le site a quand même une valeur.
//     return {
//       ...staticConfig,
//       ...sanityData,
//       contact: { 
//         ...staticConfig.contact, 
//         ...(sanityData.contact || {}) 
//       },
//       shipping: { 
//         ...staticConfig.shipping, 
//         ...(sanityData.shipping || {}) 
//       },
//       // Fusionner le SEO spécifiquement pour ne rien perdre
//       seo: {
//          metaTitle: sanityData.seo?.metaTitle || staticConfig.name,
//          metaDescription: sanityData.seo?.metaDescription || staticConfig.description,
//          ...sanityData.seo
//       }
//     };

//   } catch (error) {
//     console.error("❌ Error fetching Site Config:", error);
//     // En cas d'erreur critique (API down), on sert le fichier statique
//     return staticConfig;
//   }
// });

import { PortableTextBlock } from 'sanity'

// ... tes imports existants ...

// 1. TYPES MIS À JOUR
export interface CategoryPayload {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: SanityImage;
  aboutSection?: {
    title?: string;
    content?: PortableTextBlock[]; // Le contenu riche
    image?: SanityImage;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface ProductPayload {
  _id: string;
  name: string;
  slug: string;
  categorySlug: string; // Pour les liens
  images: SanityImage[];
  variants: any[]; // Simplifié pour l'exemple
  specs: { label: string; value: string }[];
  tags?: string[];
}

// 2. REQUÊTES GROQ

// Récupère une seule catégorie avec tout son contenu "About"
const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  description,
  image { ${IMAGE_PROJECTION} },
  aboutSection {
    title,
    content, 
    image { ${IMAGE_PROJECTION} }
  },
  seo
}`;

// Récupère les produits de cette catégorie
const PRODUCTS_BY_CAT_QUERY = `*[_type == "product" && category->slug.current == $slug] | order(variants[0].price asc) {
  _id,
  name,
  "slug": slug.current,
  "categorySlug": category->slug.current,
  images[] { ${IMAGE_PROJECTION} },
  variants,
  tags
}`;

// 3. FONCTION DE FETCH COMBINÉE
export const getCategoryPageData = cache(async (slug: string) => {
  const [category, products] = await Promise.all([
    client.fetch<CategoryPayload>(CATEGORY_QUERY, { slug }, { next: { revalidate: 3600 } }),
    client.fetch<ProductPayload[]>(PRODUCTS_BY_CAT_QUERY, { slug }, { next: { revalidate: 3600 } })
  ]);

  return { category, products };
});


const ALL_CATEGORIES_QUERY = `*[_type == "category"] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  description,
  image { ${IMAGE_PROJECTION} }
}`;

export const getAllCategories = cache(async () => {
  return await client.fetch(ALL_CATEGORIES_QUERY, {}, { next: { revalidate: 3600 } });
});


// lib/sanity-data.ts

// ... tes autres interfaces ...

export interface ComparisonData {
  title: string;
  description?: string;
  headers: string[];
  rows: {
    feature: string;
    values: string[];
  }[];
}

// Requête GROQ
const COMPARISON_QUERY = `*[_type == "comparisonTable"][0]{
  title,
  description,
  headers,
  rows[]{
    feature,
    values
  }
}`;

// Fonction de fetch
export const getComparisonTable = cache(async () => {
  const data = await client.fetch<ComparisonData>(COMPARISON_QUERY, {}, { next: { revalidate: 3600 } });
  return data;
});



const PRODUCT_CARD_PROJECTION = `
  _id,
  name,
  "slug": slug.current,
  "categoryId": category->slug.current, // Pour les filtres
  shortDescription,
  images[] { ${IMAGE_PROJECTION} },
  variants,
  tags,
  "featured": "featured" in tags,
  "new": "new" in tags,
  "bestseller": "bestseller" in tags,
  "createdAt": _createdAt
`;

// 1. Récupérer TOUS les produits (pour la page /products)
export const getAllProducts = cache(async () => {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    ${PRODUCT_CARD_PROJECTION}
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 3600 } });
});

// 1b. Récupérer les produits avec le tag "featured"
export const getFeaturedProducts = cache(async () => {
  const query = `*[_type == "product" && "featured" in tags] | order(_createdAt desc) {
    ${PRODUCT_CARD_PROJECTION}
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 3600 } });
});

// 2. Récupérer UN produit complet (pour la page /product/[slug])
export const getProductBySlug = cache(async (slug: string) => {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    category->{
      name,
      "slug": slug.current
    },
    images[] { 
      asset,
      alt,
      "id": imageId // Important pour le mapping variante <-> image
    },
    variants[]{
      ...,
      "id": coalesce(id, _key) // Fallback si id manque
    },
     moqSection {
      title,
      description,
      tiers[] { label, discount, features }
    },
    comparison {
      enabled,
      competitorName,
      marketingText,
      expertNote,
      visualMetrics,
      keyDifferences
    },
      faq[] {
    _key,
    question,
    answer
  },
    relatedProducts[]->{
      ${PRODUCT_CARD_PROJECTION}
    }
  }`;
  return await client.fetch(query, { slug }, { next: { revalidate: 3600 } });
});






// 1. Types pour la FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategoryData {
  id: string; // Ce sera le slug
  label: string;
  items: FAQItem[];
}

// 2. Requête pour la Home Page (Les 5 questions "Featured")
const FEATURED_FAQ_QUERY = `*[_type == "faq" && isFeatured == true][0...5]{
  question,
  answer
}`;

// 3. Requête pour la Page FAQ (Groupé par catégories)
// On récupère les catégories, et pour chaque cat, on récupère les FAQs liées
const ALL_FAQS_QUERY = `*[_type == "faqCategory"] | order(order asc) {
  "id": slug.current,
  "label": name,
  "items": *[_type == "faq" && references(^._id)] {
    question,
    answer
  }
}`;

// 4. Fonctions exportées
export const getFeaturedFAQs = cache(async () => {
  return await client.fetch<FAQItem[]>(FEATURED_FAQ_QUERY, {}, { next: { revalidate: 3600 } });
});

export const getFAQPageData = cache(async () => {
  // On filtre pour ne garder que les catégories qui ont des questions
  const data = await client.fetch<FAQCategoryData[]>(ALL_FAQS_QUERY, {}, { next: { revalidate: 3600 } });
  return data.filter(cat => cat.items.length > 0);
});




const CATEGORIES_MENU_QUERY = `*[_type == "category"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  image
}`;

export const getCategoriesForMenu = cache(async () => {
  return await client.fetch<CategoryPayload[]>(CATEGORIES_MENU_QUERY, {}, { next: { revalidate: 3600 } });
});