import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;
export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://enlaces-para-desarrolladores.netlify.app";

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const imageUrl = post.image.startsWith("http")
        ? post.image
        : `${siteUrl}${post.image}`;

      // Formatear la fecha a formato RFC 822 (estándar para RSS)
      const postDate = new Date(post.date);
      const rfc822Date = isNaN(postDate.getTime())
        ? new Date().toUTCString()
        : postDate.toUTCString();

      // Escapar caracteres especiales de XML para evitar malformaciones
      const escapeXml = (unsafe: string) => {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
      };

      // Usamos el campo 'copy' en la descripción como texto plano
      const descriptionText = post.copy || post.title;

      // Determinar dinámicamente el tipo MIME en base a la extensión del archivo de imagen
      const imageType = imageUrl.endsWith(".webp")
        ? "image/webp"
        : imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")
        ? "image/jpeg"
        : "image/png";

      // Escapar el texto base para garantizar validez XML y luego insertar etiquetas <br/> literales
      const contentEncodedText = escapeXml(descriptionText).replace(/\n/g, "<br/>");

      const escapedImageAlt = post.imageAlt ? escapeXml(post.imageAlt) : escapeXml(post.title);

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${rfc822Date}</pubDate>
      <description>${escapeXml(descriptionText)}</description>
      <content:encoded>${contentEncodedText}</content:encoded>
      <enclosure url="${imageUrl}" length="0" type="${imageType}" />
      <media:content url="${imageUrl}" medium="image" type="${imageType}">
        <media:description type="plain">${escapedImageAlt}</media:description>
      </media:content>
    </item>`;
    })
    .join("");

  const rssFeedXml = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Enlaces para Desarrolladores | Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Artículos, guías y recursos de código abierto para desarrolladores.</description>
    <language>es-ES</language>
    <atom:link href="${siteUrl}/posts/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
