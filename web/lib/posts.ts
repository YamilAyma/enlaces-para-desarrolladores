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

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Obtiene todos los posts diarios de recursos de content/posts/ que estén publicados (published === true).
 * Ordenados de forma descendente por fecha.
 */
export async function getAllPosts(): Promise<Post[]> {
  let fileNames: string[];
  try {
    fileNames = await fs.promises.readdir(postsDirectory);
  } catch {
    return [];
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        image: data.image || `/og/posts/${slug}.webp`,
        imageAlt: data.imageAlt || "",
        copy: data.copy || "",
        category: data.category || "Recursos",
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
    .filter((post) => {
      if (!post.published) return false;
      if (!post.date) return false;
      return post.date <= todayStr;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

/**
 * Obtiene un post diario específico por su slug y procesa su contenido Markdown a HTML.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
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
      category: data.category || "Recursos",
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
    console.error(`Error leyendo el post diario con slug ${slug}:`, error);
    return null;
  }
}
