import { getCategoriesForMenu } from "@/lib/sanity-data"
import { Header } from "./header.client"

export async function HeaderWrapper() {
  // Fetch des données (Server-side)
  const categories = await getCategoriesForMenu()

  // On passe les données au composant Client
  return <Header categories={categories} />
}