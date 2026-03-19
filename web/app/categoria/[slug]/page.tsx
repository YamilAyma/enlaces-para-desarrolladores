import { Metadata } from 'next';
import { getLinks } from '@/lib/data';
import { slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { LinkCard } from '@/components/link-card';
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-static';

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
  const category = categories.find(c => slugify(c.name) === slug);

  if (!category) return {};

  const title = `${category.name} - Recursos para Desarrolladores`;
  const description = `Explora las mejores herramientas y enlaces de ${category.name} curados para desarrolladores.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: `/og/${slugify(category.name)}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Enlaces para Desarrolladores",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og/${slugify(category.name)}.png`, "/logo.png"],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getLinks();
  const category = categories.find(c => slugify(c.name) === slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--primary)] selection:text-black">
      <SiteHeader />
      
      <div className="pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[var(--primary)] transition-colors mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al inicio
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {category.name}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            {category.links.length} recursos seleccionados para potenciar tu desarrollo en esta categoría.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.links.map((link, index) => (
            <LinkCard
              key={`${link.url}-${index}`}
              title={link.title}
              url={link.url}
              description={link.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
