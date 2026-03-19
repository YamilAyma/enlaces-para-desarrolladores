import { MetadataRoute } from 'next';
import { getLinks } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://enlaces-para-desarrolladores.netlify.app';
  const categories = await getLinks();

  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/?category=${encodeURIComponent(category.name)}`,
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
