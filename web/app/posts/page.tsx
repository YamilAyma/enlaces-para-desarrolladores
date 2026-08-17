import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { getCategoryColor } from "@/lib/colors";
import { SITE_CONFIG } from "@/lib/site-config";
import { Rss, Calendar, ArrowUpRight, Sparkles } from "lucide-react";
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

  // Formatear fecha en español
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateStr).toLocaleDateString("es-ES", options);
    } catch {
      return dateStr;
    }
  };

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

        {/* Listado de Posts / Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 rounded-lg bg-zinc-950/40">
            <p className="text-zinc-500 text-sm font-mono">
              Próximamente se publicarán las primeras entregas diarias.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const colors = getCategoryColor(post.category || "General");
              const postImage = post.image || `/og/posts/${post.slug}.webp`;

              return (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-xl border border-zinc-900 bg-zinc-950/70 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 hover:shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                >
                  {/* Image Container with link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative w-full aspect-video overflow-hidden bg-zinc-900 block"
                  >
                    <Image
                      src={postImage}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  </Link>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Meta Bar: Category + Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                          {post.category || "Recursos"}
                        </span>
                      </div>

                      {post.date && (
                        <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                          <Calendar className="w-3 h-3 text-zinc-600" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                        {post.title}
                      </Link>
                    </h2>

                    {/* Copy Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                      {post.copy}
                    </p>

                    {/* Bottom Action Link */}
                    <div className="mt-auto pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[var(--primary)] group-hover:underline"
                      >
                        <span>Ver recursos</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>

                      <span className="text-[10px] text-zinc-600 font-mono">
                        {post.slug}
                      </span>
                    </div>
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
