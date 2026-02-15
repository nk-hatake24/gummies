import { Package, CheckCircle2, TrendingDown } from "lucide-react"

interface ProductMoqProps {
  data?: {
    title?: string
    description?: string
    tiers?: { label: string; discount: string; features?: string }[]
  }
}

export function ProductMoq({ data }: ProductMoqProps) {
  // Fallback si pas de données dans Sanity
  if (!data || !data.tiers) return null

  return (
    <div className="bg-secondary/20 border border-border rounded-xl p-8 lg:p-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
          <TrendingDown className="h-6 w-6 text-accent" />
        </div>
        <h2 className="font-serif text-3xl mb-3">{data.title || "Volume Discounts"}</h2>
        <p className="text-muted-foreground">{data.description || "Buy more, save more. Mix and match flavors allowed within master cases."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.tiers.map((tier, index) => (
          <div key={index} className="bg-background border border-border p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {tier.label}
            </span>
            <span className="text-3xl font-bold text-accent mb-4">
              {tier.discount}
            </span>
            {tier.features && (
              <div className="flex items-center gap-2 text-sm text-foreground/80 bg-secondary/50 px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {tier.features}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}