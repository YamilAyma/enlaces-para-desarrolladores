import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Article {
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

const articlesDirectory = path.join(process.cwd(), "content", "articles");

/**
 * Obtiene todos los artículos editoriales de content/articles/ que estén publicados (published === true).
 * Ordenados de forma descendente por fecha.
 */
export async function getAllArticles(): Promise<Article[]> {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        image: data.image || `/og/posts/${slug}.webp`,
        imageAlt: data.imageAlt || "",
        copy: data.copy || "",
        category: data.category || "",
        date: data.date
          ? data.date instanceof Date
            ? data.date.toISOString().split("T")[0]
            : String(data.date)
          : "",
        published: typeof data.published === "boolean" ? data.published : false,
        content: "",
        rawContent: content,
      };
    })
    .filter((article) => {
      if (!article.published) return false;
      if (!article.date) return false;
      const todayStr = new Date().toISOString().split("T")[0];
      return article.date <= todayStr;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allArticlesData;
}

/**
 * Obtiene un artículo específico por su slug y procesa su contenido Markdown a HTML.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.published === false) {
      return null;
    }

    if (data.date) {
      const postDateStr = data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date);
      const todayStr = new Date().toISOString().split("T")[0];
      if (postDateStr > todayStr) {
        return null;
      }
    }

    const processedContent = await marked.parse(content);

    return {
      slug,
      title: data.title || "",
      image: data.image || `/og/posts/${slug}.webp`,
      imageAlt: data.imageAlt || "",
      copy: data.copy || "",
      category: data.category || "",
      date: data.date
        ? data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : String(data.date)
        : "",
      published: typeof data.published === "boolean" ? data.published : false,
      content: processedContent,
      rawContent: content,
    };
  } catch (error) {
    console.error(`Error leyendo el artículo con slug ${slug}:`, error);
    return null;
  }
}
