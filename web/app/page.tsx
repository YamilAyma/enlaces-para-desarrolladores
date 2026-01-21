import { Suspense } from "react";
import { getLinks } from "@/lib/data";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { GalleryClientSide } from "@/components/gallery-clientside";

// Revalidate every hour (if we want to pick up README changes without rebuild on Vercel/ISR)
export const revalidate = 3600;

export default async function Home() {
  const categories = await getLinks();

  return (
    <main className="min-h-screen bg-[var(--background)] selection:bg-[var(--primary)] selection:text-black relative overflow-x-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-[#0a0a0a] to-black" />
      <div className="fixed inset-0 z-[-1] bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <SiteHeader />
      <div className="pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
         <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground animate-pulse">Loading developer resources...</div>}>
            <GalleryClientSide initialCategories={categories} />
         </Suspense>
      </div>
    </main>
  );
}
