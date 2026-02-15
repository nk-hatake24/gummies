import { HeroClient } from "@/components/home/hero/hero.client";
import { BulkIntroSectionClient } from "./BulkIntroSection.client";
// Import types from wherever you defined them in Step 1
import { HomePageData } from "@/lib/sanity-data"; 

// HERO COMPONENT
export function Hero({ data }: { data: HomePageData['heroSection'] }) {
  if (!data) return null; // Safety check
  return <HeroClient {...data}/>;
}

// BULK SECTION COMPONENT
export function BulkIntroSection({ data }: { data: HomePageData['bulkSection'] }) {  
  if (!data) return null;
  return <BulkIntroSectionClient {...data} />;
}