
import { getFeaturedProducts } from "@/lib/sanity-data";
import { FeaturedProductsClients } from "./featured-products";
import { Product } from "./featured-products";

export async function FeaturedProducts() {
    const products: Product[] = await getFeaturedProducts()
    if (!products || products.length === 0) {         
  return null;  }
    return <FeaturedProductsClients products={products} />
} 