import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
