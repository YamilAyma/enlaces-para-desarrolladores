import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { Rss, Sparkles } from "lucide-react";
import { PostsArchive } from "@/components/posts-archive";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Archivo de Publicaciones | ${SITE_CONFIG.name}`,
  description:
    "Colección cronológica de entregas diarias de herramientas, librerías y recursos curados de código abierto para desarrolladores.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/posts`,
  },
  openGraph: {
    title: `Archivo de Publicaciones | ${SITE_CONFIG.name}`,
    description:
      "Colección cronológica de entregas diarias de herramientas, librerías y recursos de código abierto.",
    type: "website",
    url: `${SITE_CONFIG.url}/posts`,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Logo`,
      },
    ],
  },
};

export default async function PostsArchivePage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--primary)] selection:text-black relative overflow-x-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />

      <SiteHeader />

      <div className="pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Archive Hero Header */}
        <div className="text-center mb-14 relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3 text-[var(--primary)]" />
            <span>Feed &amp; Entregas Diarias</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight mb-3 text-zinc-100">
            Archivo de <span className="italic font-serif text-[var(--primary)]">Publicaciones</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-xl mx-auto mb-6">
            Colección cronológica de recursos curados y publicados diariamente para programadores e ingenieros de software.
          </p>

          <a
            href="/posts/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black font-mono text-xs font-bold transition-all duration-200 shadow-[0_0_15px_rgba(202,252,0,0.12)] group"
          >
            <Rss className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>Suscribirse vía RSS</span>
          </a>
        </div>

        {/* Client-side Posts Grid with Modal */}
        <PostsArchive posts={posts} />
      </div>

      <SiteFooter />
    </main>
  );
}
