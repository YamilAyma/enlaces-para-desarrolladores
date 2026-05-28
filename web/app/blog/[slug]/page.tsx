import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Calendar, ArrowLeft, Clock, BookOpen } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidar cada hora

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// Generar los parámetros estáticos para todas las páginas en tiempo de compilación (Static Site Generation)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generar metadatos dinámicos para SEO (Open Graph, Twitter) de cada post
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const siteUrl = "https://enlaces-para-desarrolladores.netlify.app";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${siteUrl}${post.image}`;

  return {
    title: post.title,
    description: post.copy,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.copy,
      type: "article",
      url: postUrl,
      publishedTime: post.date,
      authors: ["Yamil Ayma"],
      images: [
        {
          url: imageUrl,
          alt: post.imageAlt || post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.copy,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Calcular tiempo estimado de lectura aproximado (200 palabras por minuto)
  const calculateReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time} min de lectura`;
  };

  const readingTime = calculateReadingTime(post.rawContent);

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

      <div className="pt-32 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Back Link Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-[var(--primary)] transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Volver al blog</span>
        </Link>

        {/* Article Header info */}
        <header className="mb-10">
          {post.category && (
            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/20 uppercase tracking-wider mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-zinc-500 border-y border-white/5 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-xs">Por</span>
              <span className="font-bold text-zinc-300">Yamil Ayma</span>
            </div>
          </div>
        </header>

        {/* Dynamic HTML Content with custom styles (Markdown compiler result) */}
        <article className="prose-custom mb-16 text-zinc-300 leading-relaxed text-base sm:text-lg">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="space-y-6"
          />
        </article>

        {/* Stylesheet inline para formatear el Markdown de forma premium y limpia */}
        <style dangerouslySetInnerHTML={{ __html: `
          .prose-custom h2 {
            font-size: 1.5rem;
            font-weight: 800;
            color: #ffffff;
            margin-top: 2rem;
            margin-bottom: 1rem;
            letter-spacing: -0.025em;
          }
          .prose-custom h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #ffffff;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .prose-custom p {
            margin-bottom: 1.25rem;
            color: #d4d4d8;
          }
          .prose-custom strong {
            color: #ffffff;
            font-weight: 600;
          }
          .prose-custom a {
            color: #CAFC00;
            text-decoration: underline;
            text-underline-offset: 4px;
            font-weight: 600;
            transition: color 0.2s;
          }
          .prose-custom a:hover {
            color: #ffffff;
          }
          .prose-custom ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
            space-y: 0.5rem;
          }
          .prose-custom ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .prose-custom li {
            margin-bottom: 0.5rem;
          }
          .prose-custom code {
            font-family: monospace;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
            color: #f4f4f5;
            border: 1px border rgba(255, 255, 255, 0.05);
          }
          .prose-custom pre {
            background-color: #09090b;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 0.75rem;
            padding: 1.25rem;
            overflow-x: auto;
            margin-bottom: 1.5rem;
            font-family: monospace;
          }
          .prose-custom pre code {
            background-color: transparent;
            padding: 0;
            border-radius: 0;
            border: none;
            color: #e4e4e7;
          }
          .prose-custom blockquote {
            border-left: 4px solid #CAFC00;
            padding-left: 1.25rem;
            font-style: italic;
            color: #a1a1aa;
            margin: 1.5rem 0;
          }
        ` }} />

        {/* Footer actions / Share */}
        <footer className="border-t border-white/5 pt-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la lista</span>
          </Link>

          <ShareButton title={post.title} copy={post.copy} />
        </footer>
      </div>

      <SiteFooter />
    </main>
  );
}
