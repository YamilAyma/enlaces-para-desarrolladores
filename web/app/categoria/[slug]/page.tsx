import { Metadata } from "next";
import { getLinks } from "@/lib/data";
import { slugify } from "@/lib/utils";
import { getCategoryColor } from "@/lib/colors";
import { notFound } from "next/navigation";
import { LinkRow } from "@/components/link-row";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_CONFIG } from "@/lib/site-config";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-static";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getLinks();
  return categories.map((category) => ({
    slug: slugify(category.name),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getLinks();
  const category = categories.find((c) => slugify(c.name) === slug);

  if (!category) return {};

  const title = `${category.name} - ${SITE_CONFIG.name}`;
  const description = `Explora las mejores herramientas y enlaces de ${category.name} curados para desarrolladores.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/categoria/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `/og/${slugify(category.name)}.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og/${slugify(category.name)}.webp`, "/logo.png"],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getLinks();
  const category = categories.find((c) => slugify(c.name) === slug);

  if (!category) {
    notFound();
  }

  const colors = getCategoryColor(category.name);

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_CONFIG.url}/categoria/${slug}/#webpage`,
    "url": `${SITE_CONFIG.url}/categoria/${slug}`,
    "name": `${category.name} - ${SITE_CONFIG.name}`,
    "description": `Explora las mejores herramientas y enlaces de ${category.name} curados para desarrolladores.`,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
    },
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--primary)] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <SiteHeader />

      <div className="pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Volver al directorio</span>
        </Link>

        <header className="mb-10 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-2 mb-2">
            <span className={`h-2 w-2 rounded-full ${colors.dot} ${colors.glow}`} />
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Categoría
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-zinc-100 tracking-tight mb-2">
            {category.name}
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl font-sans">
            {category.links.length} recursos seleccionados para potenciar tu desarrollo en esta área.
          </p>
        </header>

        {/* 3 Columnas en Desktop / 1 Columna en Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1 mb-12">
          {category.links.map((link, index) => (
            <LinkRow
              key={`${link.url}-${index}`}
              title={link.title}
              url={link.url}
              description={link.description}
              categoryName={category.name}
            />
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
