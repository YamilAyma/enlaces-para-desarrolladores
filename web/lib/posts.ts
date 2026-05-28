import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  copy: string;
  category: string;
  date: string;
  published: boolean;
  content: string;
  rawContent: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Obtiene todos los posts de la carpeta posts/ que estén publicados (published === true).
 * Ordenados de forma descendente por fecha.
 */
export async function getAllPosts(): Promise<Post[]> {
  // Asegurar que el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Usar gray-matter para analizar la sección de metadatos del post
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        image: data.image || `/og/posts/${slug}.webp`,
        imageAlt: data.imageAlt || "",
        copy: data.copy || "",
        category: data.category || "",
        date: data.date ? String(data.date) : "",
        published: typeof data.published === "boolean" ? data.published : false,
        content: "", // No convertimos el Markdown a HTML aquí por rendimiento en listados
        rawContent: content,
      };
    })
    // Filtrar para mostrar solo los publicados
    .filter((post) => post.published)
    // Ordenar posts por fecha de forma descendente
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

/**
 * Obtiene un post específico por su slug y procesa su contenido Markdown a HTML.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Si no está publicado, no se debe retornar públicamente
    if (data.published === false) {
      return null;
    }

    // Convertir Markdown a HTML usando marked de forma segura
    const processedContent = await marked.parse(content);

    return {
      slug,
      title: data.title || "",
      image: data.image || `/og/posts/${slug}.webp`,
      imageAlt: data.imageAlt || "",
      copy: data.copy || "",
      category: data.category || "",
      date: data.date ? String(data.date) : "",
      published: typeof data.published === "boolean" ? data.published : false,
      content: processedContent,
      rawContent: content,
    };
  } catch (error) {
    console.error(`Error leyendo el post con slug ${slug}:`, error);
    return null;
  }
}
