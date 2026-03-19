import { MetadataRoute } from 'next';
import { getLinks } from '@/lib/data';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://enlaces-para-desarrolladores.netlify.app';
  const categories = await getLinks();

  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/categoria/${slugify(category.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryEntries,
  ];
}
