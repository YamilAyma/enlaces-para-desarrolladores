import fs from 'fs';
import path from 'path';

export interface LinkItem {
  title: string;
  url: string;
  description?: string;
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
    // List Items with Links
    else if (line.startsWith('-') && currentCategory) {
      // 1. Try to match the new format: - [Title](URL): Description
      const enrichedMatch = line.match(/^-\s+\[(.*?)\]\((https?:\/\/[^\s\)]+)\):\s*(.*)/);
      
      if (enrichedMatch) {
        const [, title, url, description] = enrichedMatch;
        currentCategory.links.push({ 
          title: title.trim(), 
          url: url.trim(), 
          description: description.trim() 
        });
      } else {
        // 2. Fallback to old formats or simple URL search
        const urlRegex = /(https?:\/\/[^\s\)]+)/;
        const match = line.match(urlRegex);
        
        if (match) {
          const url = match[0];
          let titleLine = line.substring(1).trim();
          
          // Try to extract title if bracketed
          let title = '';
          const bracketMatch = titleLine.match(/\[(.*?)\]/);
          if (bracketMatch) {
            title = bracketMatch[1];
          } else {
            // Fallback: Remove URL and separators
            title = titleLine.replace(url, '').trim().replace(/[:\-]+$/, '').trim();
          }

          // Extract description by taking everything after the URL + possible separator
          const afterUrlMatch = line.match(new RegExp(`${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)?:?\\s*(.*)`));
          const description = afterUrlMatch ? afterUrlMatch[1].trim() : '';

          if (title && url) {
            currentCategory.links.push({ title, url, description });
          }
        }
      }
    }
  }

  if (currentCategory) {
    categories.push(currentCategory);
  }

  return categories;
}
