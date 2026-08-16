import { Suspense } from "react";
import { getLinks } from "@/lib/data";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { GalleryClientSide } from "@/components/gallery-clientside";
import { SiteFooter } from "@/components/site-footer";
import { SITE_CONFIG } from "@/lib/site-config";

// Revalidate every hour (literal required by Next.js static AST analyzer)
export const revalidate = 3600;

export default async function Home() {
  const categories = await getLinks();

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--primary)] selection:text-black relative overflow-x-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />
      
      <SiteHeader />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": SITE_CONFIG.name,
            "description": SITE_CONFIG.description,
            "url": SITE_CONFIG.url,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": categories.map((cat, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "item": {
                  "@type": "CreativeWorkSeries",
                  "name": cat.name,
                  "description": `Recursos sobre ${cat.name}`
                }
              }))
            }
          })
        }}
      />

      <div className="pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
         <Hero />
         <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground animate-pulse">Cargando recursos de desarrollo...</div>}>
            <GalleryClientSide initialCategories={categories} />
         </Suspense>
      </div>

      <SiteFooter />
    </main>
  );
}
