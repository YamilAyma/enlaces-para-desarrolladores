"use client";

import { useMemo, useState, useEffect } from "react";
import { LinkCard } from "@/components/link-card";
import { BentoGrid } from "@/components/bento-grid";
import { getCategoryIcon } from "@/lib/icons";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Loader2, Search, Star, Download, Copy, Trash2, Check } from "lucide-react";
import { createSearchIndex } from "@/lib/search";

interface LinkItem {
  title: string;
  url: string;
  description?: string;
}

interface Category {
  name: string;
  links: LinkItem[];
}

export function GalleryClientSide({ initialCategories }: { initialCategories: Category[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State
  const searchQuery = searchParams.get("q") || "";
  const activeCategory = searchParams.get("category") || "All";
  const [visibleCount, setVisibleCount] = useState(20);
  const [isFiltering, setIsFiltering] = useState(false);

  // Favorites 
  const [favorites, setFavorites] = useState<LinkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Safely load favorites on client mount and listen for synchronization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleSync = () => {
        try {
          const stored = localStorage.getItem("toolkit_favorites");
          if (stored) {
            setFavorites(JSON.parse(stored));
          } else {
            setFavorites([]);
          }
        } catch (e) {
          console.error("Failed to sync favorites", e);
        }
      };

      handleSync();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);

      window.addEventListener("toolkit-updated", handleSync);
      window.addEventListener("storage", handleSync);
      return () => {
        window.removeEventListener("toolkit-updated", handleSync);
        window.removeEventListener("storage", handleSync);
      };
    }
  }, []);

  const saveFavorites = (newFavs: typeof favorites) => {
    setFavorites(newFavs);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("toolkit_favorites", JSON.stringify(newFavs));
        window.dispatchEvent(new Event("toolkit-updated"));
      } catch (e) {
        console.error("Failed to save favorites", e);
      }
    }
  };

  const toggleFavorite = (item: LinkItem) => {
    const exists = favorites.some(fav => fav.url === item.url);
    if (exists) {
      saveFavorites(favorites.filter(fav => fav.url !== item.url));
    } else {
      saveFavorites([...favorites, { title: item.title, url: item.url, description: item.description }]);
    }
  };

  // Helper to sync URL w/ feedback
  const updateCategory = (cat: string) => {
    setIsFiltering(true);
    const params = new URLSearchParams(searchParams);
    if (cat && cat !== "All") {
        params.set("category", cat);
    } else {
        params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // Reset loading state after a brief delay to simulate 'processing' if instant
    setTimeout(() => setIsFiltering(false), 300); 
  };

  // Reset pagination when filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(20);
  }, [searchQuery, activeCategory]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  // Memoize search index creation
  const searchIndex = useMemo(() => {
    return createSearchIndex(initialCategories);
  }, [initialCategories]);

  // Toolkit Export Handlers
  const copyMarkdown = () => {
    const md = favorites
      .map(fav => `- [${fav.title}](${fav.url})${fav.description ? `: ${fav.description}` : ""}`)
      .join("\n");
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "developer-toolkit.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const clearFavorites = () => {
    if (confirm("¿Estás seguro de que deseas limpiar todo tu kit de herramientas?")) {
      saveFavorites([]);
      if (activeCategory === "⭐ Mi Toolkit") {
        updateCategory("All");
      }
    }
  };

  // Memoized Filtering
  const filteredCategories = useMemo(() => {
    let categories = initialCategories;

    // Prepend favorites as a synthetic category if loaded and not empty
    if (isLoaded && favorites.length > 0) {
      categories = [{ name: "⭐ Mi Toolkit", links: favorites }, ...initialCategories];
    }

    // 1. Filter by Search Query (Semantic/Fuzzy using MiniSearch)
    if (searchQuery.trim()) {
      const searchResults = searchIndex.search(searchQuery.trim());
      
      const categoryMap: { [key: string]: LinkItem[] } = {};
      searchResults.forEach(result => {
        const catName = result.category;
        if (!categoryMap[catName]) {
          categoryMap[catName] = [];
        }
        categoryMap[catName].push({
          title: result.title,
          url: result.url,
          description: result.description,
        });
      });

      // Filter favorites manually too
      if (isLoaded && favorites.length > 0) {
        const matchedUrls = new Set(searchResults.map(r => r.url));
        const filteredFavs = favorites.filter(fav => 
          matchedUrls.has(fav.url) || 
          fav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (fav.description && fav.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (filteredFavs.length > 0) {
          categoryMap["⭐ Mi Toolkit"] = filteredFavs;
        }
      }

      categories = categories.map(cat => ({
        ...cat,
        links: categoryMap[cat.name] || [],
      })).filter(cat => cat.links.length > 0);
    }

    // 2. Filter by Category
    if (activeCategory !== "All") {
      categories = categories.filter(cat => cat.name === activeCategory);
    }

    return categories;
  }, [initialCategories, searchQuery, activeCategory, searchIndex, favorites, isLoaded]);

  return (
    <div className="space-y-12" id="gallery">
      {/* Category Pills - Larger & Scrollbar hidden via global utility */}
      <div className="sticky top-[72px] z-30 bg-transparent backdrop-blur-md py-6">
         <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide mask-fade-right px-1">
                <Link
                    href="/"
                    className={`flex-shrink-0 rounded-full px-6 py-2.5 text-base font-bold transition-all duration-300 border shadow-sm ${
                        activeCategory === "All" 
                        ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_20px_rgba(202,252,0,0.4)] scale-105" 
                        : "bg-zinc-900 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white hover:border-white/20"
                    }`}
                >
                    Todos
                </Link>

                {isLoaded && favorites.length > 0 && (
                    <button
                        onClick={() => updateCategory("⭐ Mi Toolkit")}
                        className={`flex-shrink-0 rounded-full px-6 py-2.5 text-base font-bold transition-all duration-300 border shadow-sm cursor-pointer ${
                            activeCategory === "⭐ Mi Toolkit" 
                            ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_20px_rgba(202,252,0,0.4)] scale-105" 
                            : "bg-zinc-900/60 text-zinc-300 border-white/10 hover:bg-zinc-800 hover:text-white hover:border-white/20"
                        }`}
                    >
                        ⭐ Mi Toolkit ({favorites.length})
                    </button>
                )}

                {initialCategories.map(cat => (
                    <Link
                        key={cat.name}
                        href={`/categoria/${slugify(cat.name)}`}
                        className={`flex-shrink-0 rounded-full px-6 py-2.5 text-base font-bold transition-all duration-300 border shadow-sm ${
                            activeCategory === cat.name 
                            ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_20px_rgba(202,252,0,0.4)] scale-105" 
                            : "bg-zinc-900 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white hover:border-white/20"
                        }`}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
      </div>

      {/* Loading Overlay/State */}
      {isFiltering && (
         <div className="fixed inset-0 z-40 bg-background/20 backdrop-blur-[1px] pointer-events-none flex items-center justify-center">
             {/* Subtle loading indicator if needed */}
         </div>
      )}

      {/* Results Grid */}
      <div className={`space-y-16 min-h-[50vh] transition-opacity duration-200 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
        {filteredCategories.length === 0 ? (
            <div className="text-center py-20 animate-in fade-in zoom-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No se encontraron resultados</h3>
                <p className="text-muted-foreground mt-2">Intenta ajustar tu búsqueda para &quot;{searchQuery}&quot;</p>
                <button 
                    onClick={() => { router.replace(pathname); }}
                    className="mt-6 text-[var(--primary)] font-medium hover:underline"
                >
                    Limpiar filtros
                </button>
            </div>
        ) : (
            filteredCategories.map((category) => {
              const isToolkit = category.name === "⭐ Mi Toolkit";
              const Icon = isToolkit ? Star : getCategoryIcon(category.name);
              const displayedLinks = category.links.slice(0, visibleCount);

              return (
                <section key={category.name} id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-[var(--primary)] shadow-[0_0_15px_rgba(202,252,0,0.1)]">
                                <Icon className="h-6 w-6 animate-[pulse_3s_infinite]" />
                            </div>
                            <h2 className="text-3xl font-bold font-heading tracking-tight">{category.name}</h2>
                            <span className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-bold text-[var(--primary)] border border-white/10">
                                {category.links.length}
                            </span>
                        </div>

                        {isToolkit && (
                            <div className="flex items-center gap-2 self-start sm:self-auto">
                                <button
                                    onClick={copyMarkdown}
                                    className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                                    title="Copiar lista en Markdown para tu README"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-green-500 animate-in zoom-in" />
                                            <span>¡Copiado!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" />
                                            <span>Copiar Markdown</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={downloadJson}
                                    className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                                    title="Descargar Kit en JSON"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                    <span>JSON</span>
                                </button>
                                <button
                                    onClick={clearFavorites}
                                    className="flex items-center gap-1.5 rounded-full bg-red-950/20 border border-red-500/10 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-950/50 hover:border-red-500/30 transition-all cursor-pointer"
                                    title="Limpiar todos los favoritos"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Vaciar</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <BentoGrid>
                        {displayedLinks.map((link: LinkItem, index: number) => (
                            <LinkCard
                                key={`${link.url}-${index}`}
                                title={link.title}
                                url={link.url}
                                description={link.description}
                                isFavorite={favorites.some(fav => fav.url === link.url)}
                                onToggleFavorite={() => toggleFavorite(link)}
                            />
                        ))}
                    </BentoGrid>
                </section>
              );
            })
        )}
      </div>

      {/* Load More */}
      {filteredCategories.some(cat => cat.links.length > visibleCount) && (
        <div className="flex justify-center pt-8 pb-20">
            <button 
                onClick={handleLoadMore}
                className="group flex items-center gap-2 rounded-full border border-input bg-background/50 backdrop-blur px-8 py-3 text-sm font-medium transition-all hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] hover:shadow-[0_0_20px_rgba(202,252,0,0.4)]"
            >
                <span>Cargar más recursos</span>
                <Loader2 className="h-4 w-4 animate-spin hidden group-active:block" />
            </button>
        </div>
      )}
    </div>
  );
}
