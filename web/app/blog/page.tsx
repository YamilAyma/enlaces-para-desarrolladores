import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { getCategoryColor } from "@/lib/colors";
import { SITE_CONFIG } from "@/lib/site-config";
import { ChevronRight, BookOpen, ArrowUpRight } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: `Blog Oficial | ${SITE_CONFIG.name}`,
  description:
    "Guías, análisis y colecciones de herramientas de código abierto y utilidades para programadores y creadores.",
  openGraph: {
    title: `Blog Oficial | ${SITE_CONFIG.name}`,
    description:
      "Guías, análisis y colecciones de herramientas de código abierto y utilidades para programadores.",
    type: "website",
    url: `${SITE_CONFIG.url}/blog`,
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

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--primary)] selection:text-black relative overflow-x-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />

      <SiteHeader />

      <div className="pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Blog Hero Header */}
        <div className="text-center mb-12 relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono uppercase tracking-wider mb-4">
            <BookOpen className="w-3 h-3 text-[var(--primary)]" />
            <span>Editorial &amp; Guías</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight mb-3 text-zinc-100">
            Artículos &amp; <span className="italic font-serif text-[var(--primary)]">Análisis</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans">
            Guías paso a paso, comparativas de herramientas y recursos explicados a fondo.
          </p>
        </div>

        {/* 3 Columnas en Desktop / 1 Columna en Mobile */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 rounded-lg bg-zinc-950/40">
            <p className="text-zinc-500 text-sm font-mono">
              Próximamente se publicarán nuestros primeros artículos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => {
              const colors = getCategoryColor(post.category || "General");

              return (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-lg border border-zinc-900 bg-zinc-950/60 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/40"
                >
                  {/* Category Dot & Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      {post.category || "Artículo"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {post.copy}
                  </p>

                  {/* Read Link */}
                  <div className="mt-auto pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[var(--primary)] group-hover:underline"
                    >
                      <span>Leer artículo</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
