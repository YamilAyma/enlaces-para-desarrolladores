import fs from 'fs';
import path from 'path';

export interface LinkItem {
  title: string;
  url: string;
}

export interface Category {
  name: string;
  links: LinkItem[];
}

export async function getLinks(): Promise<Category[]> {
  // README is one level up from "web" directory
  const readmePath = path.join(process.cwd(), '..', 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.warn("README.md not found at expected path:", readmePath);
    // Try current directory as fallback (in case of deployment differences/symlinks)
    if (fs.existsSync(path.join(process.cwd(), 'README.md'))) {
        return parseReadme(fs.readFileSync(path.join(process.cwd(), 'README.md'), 'utf-8'));
    }
    return [];
  }

  const content = fs.readFileSync(readmePath, 'utf-8');
  return parseReadme(content);
}

function parseReadme(content: string): Category[] {
  const lines = content.split('\n');
  const categories: Category[] = [];
  let currentCategory: Category | null = null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  for (let line of lines) {
    line = line.trim();

    // Headers (### Category Name)
    if (line.startsWith('### ')) {
      if (currentCategory) {
        categories.push(currentCategory);
      }
      // Remove "### " and optional emojis or extra chars
      const name = line.replace(/^###\s+/, '').trim();
      currentCategory = { name, links: [] };
    } 
    // List Items with Links (- Title: URL or - Title - URL)
    else if (line.startsWith('-') && currentCategory) {
      const match = line.match(urlRegex);
      if (match) {
        const url = match[0];
        // Extract title: Remove "- ", remove URL, clean up separators (: or -)
        let title = line.substring(1).replace(url, '').trim();
        // Remove trailing separators
        title = title.replace(/[:\-]+$/, '').trim();
        
        if (title && url) {
            currentCategory.links.push({ title, url });
        }
      }
    }
  }

  if (currentCategory) {
    categories.push(currentCategory);
  }

  return categories;
}
