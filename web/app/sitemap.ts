import { MetadataRoute } from 'next';
import { getLinks } from '@/lib/data';
import { slugify } from '@/lib/utils';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://enlaces-para-desarrolladores.netlify.app';
  const categories = await getLinks();
  const posts = await getAllPosts();

  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/categoria/${slugify(category.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryEntries,
    ...blogEntries,
  ];
}
