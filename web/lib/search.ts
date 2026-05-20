import MiniSearch from 'minisearch';

export interface SearchableItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
}

/**
 * Creates and indexes a new MiniSearch instance using the categories data.
 */
export function createSearchIndex(categories: { name: string; links: any[] }[]): MiniSearch<SearchableItem> {
  const miniSearch = new MiniSearch<SearchableItem>({
    fields: ['title', 'description', 'category'], // Fields to index for searching
    storeFields: ['title', 'url', 'description', 'category'], // Fields to include in search results
    searchOptions: {
      boost: { title: 2, category: 1.5, description: 1 },
      fuzzy: 0.2, // Multi-character typo tolerance
      prefix: true, // Matches prefixes of terms (e.g., "rea" matches "react")
    }
  });

  const documents: SearchableItem[] = [];
  
  categories.forEach(category => {
    category.links.forEach((link, index) => {
      documents.push({
        id: `${category.name}-${link.url}-${index}`,
        title: link.title || '',
        url: link.url || '',
        description: link.description || '',
        category: category.name,
      });
    });
  });

  miniSearch.addAll(documents);
  return miniSearch;
}
