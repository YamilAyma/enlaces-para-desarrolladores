import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { Calendar, ChevronRight, BookOpen } from "lucide-react";

export const revalidate = 3600; // Revalidar la página cada hora

export const metadata = {
  title: "Blog Oficial | Recursos y Herramientas para Desarrolladores",
  description: "Guías, análisis y colecciones de herramientas de código abierto y utilidades para programadores y creadores.",
  openGraph: {
    title: "Blog Oficial | Enlaces para Desarrolladores",
    description: "Guías, análisis y colecciones de herramientas de código abierto y utilidades para programadores.",
    type: "website",
    url: "https://enlaces-para-desarrolladores.netlify.app/blog",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Enlaces para Desarrolladores Logo",
      },
    ],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Formatear fecha en español de forma limpia
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
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
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-[#0a0a0a] to-black" />
      <div className="fixed inset-0 z-[-1] bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <SiteHeader />

      <div className="pt-32 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Blog Hero Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--primary)]/10 blur-3xl rounded-full z-[-1]" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Artículos &amp; Guías</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight mb-4 text-white">
            Blog de <span className="text-[var(--primary)] filter drop-shadow-[0_0_15px_rgba(202,252,0,0.25)]">Enlaces</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg">
            Recursos explicados, guías paso a paso y la selección de utilidades de código abierto más potente de internet.
          </p>
        </div>

        {/* Posts Grid Layout */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-zinc-950/40 backdrop-blur-sm">
            <p className="text-zinc-500 text-lg">Próximamente se publicarán nuestros primeros artículos. ¡Mantente atento!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-zinc-950/60 hover:shadow-[0_0_30px_rgba(202,252,0,0.05)]"
              >
                {/* Header: Category & Date */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  {post.category && (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/25 uppercase tracking-wider">
                      {post.category}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>

                {/* Body Content */}
                <h2 className="text-xl font-bold font-heading text-white tracking-tight mb-3 group-hover:text-[var(--primary)] transition-colors duration-200 line-clamp-2 leading-tight">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.copy}
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-5 border-t border-white/5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[var(--primary)] hover:text-white transition-colors duration-200 group/link"
                  >
                    <span>Leer artículo completo</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
