import React from "react"
import type { ComparisonData } from "@/lib/sanity-data" // Assure-toi d'importer le type

interface CategoryComparisonProps {
  data?: ComparisonData | null;
}

export function CategoryComparison({ data }: CategoryComparisonProps) {
  // Si pas de données dans Sanity, on n'affiche rien pour ne pas casser le site
  if (!data || !data.headers || data.headers.length === 0) return null;

  const { title, description, headers, rows } = data;

  return (
    <section className="w-full py-16 lg:py-24 border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header Dynamique */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4 text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Comparison Table Dynamique */}
        <div className="relative w-full overflow-x-auto rounded-lg border border-border shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                {/* Boucle sur les en-têtes (Headers) */}
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`py-5 px-4 font-serif text-lg text-foreground font-medium w-[20%] ${
                      index === 0 ? "pl-6" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {rows && rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  {/* Colonne 1 : Le nom de la Feature */}
                  <td className="py-4 pl-6 pr-4 font-medium text-foreground">
                    {row.feature}
                  </td>

                  {/* Colonnes suivantes : Les valeurs dynamiques */}
                  {row.values && row.values.map((val, valIndex) => (
                    <td key={valIndex} className="py-4 px-4 text-muted-foreground text-sm md:text-base">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}