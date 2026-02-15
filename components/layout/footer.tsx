"use client"

import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"
import { siteConfig, legalConfig } from "@/config/site.config"
import { footerData } from "@/config/footer.config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background border-t border-background/10">
      
      {/* FDA Warning Banner */}
      <div className="bg-accent/50 py-3 px-4">
        <p className="text-center text-[10px] md:text-xs text-white/90 font-medium uppercase tracking-wide">
          {legalConfig.fdaWarning}
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* COLUMN 1: BRAND (Statique car il contient le logo et les réseaux) */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="font-serif text-3xl tracking-tight leading-none block">
              <span className="block font-bold">BULK</span>
              <span className="block text-accent">VAPES</span> USA
            </Link>
            
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              {footerData.brand.description}
            </p>

            {/* <div className="flex items-center gap-4">
              <SocialLink href={siteConfig.social.instagram} icon={Instagram} label="IG" />
              <SocialLink href={siteConfig.social.twitter} icon={Twitter} label="X" />
              <SocialLink href="#" icon={Facebook} label="FB" />
            </div> */}
          </div>

          {/* COLUMNS 2-5: DYNAMIC SECTIONS */}
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-background mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-background/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-background/30 max-w-md text-center md:text-right">
            {legalConfig.complianceText}
          </p>
        </div>

      </div>
    </footer>
  )
}

// Petit composant helper pour les icônes sociales
function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-background/5 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 border border-white/5"
    >
      <Icon className="w-4 h-4" />
    </a>
  )
}