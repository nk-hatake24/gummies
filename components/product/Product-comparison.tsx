"use client"

import React from "react"
import { BatteryCharging, TrendingUp, MonitorSmartphone, Wind, Droplets } from "lucide-react"

// Mapping des icônes (String Sanity -> Composant React)
const ICON_MAP: Record<string, React.ElementType> = {
  battery: BatteryCharging,
  trending: TrendingUp,
  screen: MonitorSmartphone,
  wind: Wind,
  flavor: Droplets
};

interface VisualMetric {
  label: string;
  productValue: number;
  competitorValue: number;
}

interface KeyDifference {
  icon: string;
  title: string;
  description: string;
}

// Les données brutes venant de Sanity
export interface ComparisonData {
  enabled?: boolean;
  competitorName?: string;
  marketingText?: string;
  expertNote?: string;
  visualMetrics?: VisualMetric[];
  keyDifferences?: KeyDifference[];
}

interface ProductComparisonProps {
  productName: string;
  data?: ComparisonData; // Données Sanity optionnelles
}

export function ProductComparison({ productName, data }: ProductComparisonProps) {
  // Si la section n'est pas activée dans Sanity, on ne l'affiche pas
  if (!data?.enabled) return null;

  const competitorName = data.competitorName || "Standard Vapes";
  
  return (
    <section className="w-full py-16 border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* SECTION 1: FLAVOR NARRATIVE */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-serif text-2xl mb-4">The {productName} Experience</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {data.marketingText || `Discover why ${productName} is rapidly becoming the preferred choice for enthusiasts over the ${competitorName}.`}
            </p>
            
            {data.expertNote && (
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-sm font-medium text-foreground">
                  Expert's Take:
                </p>
                <p className="text-sm text-muted-foreground italic mt-1">
                  "{data.expertNote}"
                </p>
              </div>
            )}
          </div>
          
          {/* Visual Aid (Progress Bars) */}
          {data.visualMetrics && data.visualMetrics.length > 0 && (
            <div className="space-y-6">
              {data.visualMetrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>{metric.label}</span>
                    <span className="text-muted-foreground">vs {competitorName}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                    {/* Competitor Bar (Background Marker) */}
                    <div 
                      className="absolute top-0 bottom-0 bg-red-400/50 w-1 z-10" 
                      style={{ left: `${metric.competitorValue}%` }}
                      title={`${competitorName}: ${metric.competitorValue}%`}
                    />
                    {/* Product Bar (Fill) */}
                    <div 
                      className="h-full bg-foreground rounded-full transition-all duration-1000" 
                      style={{ width: `${metric.productValue}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: COMPARISON GRID */}
        {data.keyDifferences && data.keyDifferences.length > 0 && (
          <div>
            <div className="mb-10 max-w-2xl">
              <h2 className="font-serif text-3xl mb-4">Why {productName} wins</h2>
              <p className="text-muted-foreground text-lg">
                Comparing the {productName} against the {competitorName}:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {data.keyDifferences.map((point, index) => {
                // On récupère l'icône, ou on met une icône par défaut si oubliée
                const Icon = ICON_MAP[point.icon] || TrendingUp;
                
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="p-2 bg-muted rounded-md shrink-0">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl mb-2">{point.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}