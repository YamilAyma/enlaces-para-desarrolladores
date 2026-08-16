"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { LinkRow } from "@/components/link-row";
import { getCategoryIcon } from "@/lib/icons";
import { getCategoryColor } from "@/lib/colors";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Loader2, Search, Star, Download, Copy, Trash2, Check, X } from "lucide-react";
import { createSearchIndex } from "@/lib/search";
import { SITE_CONFIG } from "@/lib/site-config";

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
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State
  const searchQuery = searchParams.get("q") || "";
  const activeCategory = searchParams.get("category") || "All";
  const [visibleCount, setVisibleCount] = useState<number>(SITE_CONFIG.defaultPageSize);
  const [isFiltering, setIsFiltering] = useState(false);

  // Favorites / Toolkit
  const [favorites, setFavorites] = useState<LinkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Focus search input when pressing '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    const exists = favorites.some((fav) => fav.url === item.url);
    if (exists) {
      saveFavorites(favorites.filter((fav) => fav.url !== item.url));
    } else {
      saveFavorites([
        ...favorites,
        { title: item.title, url: item.url, description: item.description },
      ]);
    }
  };

  // Helper to sync URL params
  const updateCategory = (cat: string) => {
    setIsFiltering(true);
    const params = new URLSearchParams(searchParams);
    if (cat && cat !== "All") {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setTimeout(() => setIsFiltering(false), 200);
  };

  const handleSearchChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val.trim()) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(SITE_CONFIG.defaultPageSize);
  }, [searchQuery, activeCategory]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + SITE_CONFIG.defaultPageSize);
  };

  // Memoize search index creation
  const searchIndex = useMemo(() => {
    return createSearchIndex(initialCategories);
  }, [initialCategories]);

  // Toolkit Export Handlers
  const copyMarkdown = () => {
    const md = favorites
      .map((fav) => `- [${fav.title}](${fav.url})${fav.description ? `: ${fav.description}` : ""}`)
      .join("\n");
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement("a");
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

    // 1. Filter by Search Query
    if (searchQuery.trim()) {
      const searchResults = searchIndex.search(searchQuery.trim());

      const categoryMap: { [key: string]: LinkItem[] } = {};
      searchResults.forEach((result) => {
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

      // Filter favorites manually
      if (isLoaded && favorites.length > 0) {
        const matchedUrls = new Set(searchResults.map((r) => r.url));
        const filteredFavs = favorites.filter(
          (fav) =>
            matchedUrls.has(fav.url) ||
            fav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (fav.description &&
              fav.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (filteredFavs.length > 0) {
          categoryMap["⭐ Mi Toolkit"] = filteredFavs;
        }
      }

      categories = categories
        .map((cat) => ({
          ...cat,
          links: categoryMap[cat.name] || [],
        }))
        .filter((cat) => cat.links.length > 0);
    }

    // 2. Filter by Category
    if (activeCategory !== "All") {
      categories = categories.filter((cat) => cat.name === activeCategory);
    }

    return categories;
  }, [initialCategories, searchQuery, activeCategory, searchIndex, favorites, isLoaded]);

  return (
    <div className="space-y-10" id="gallery">
      {/* Barra de Búsqueda y Píldoras de Filtro estilo desengs */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium tracking-widest text-zinc-400 uppercase">
            Explorar Recursos
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {initialCategories.reduce((acc, cat) => acc + cat.links.length, 0)} herramientas
          </span>
        </div>

        {/* Input de Búsqueda Minimalista */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar recursos, herramientas, librerías... (Presiona '/' para buscar)"
            className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Píldoras de Categoría con Puntos de Color */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
          <button
            onClick={() => updateCategory("All")}
            className={`flex-shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer ${
              activeCategory === "All"
                ? "bg-zinc-100 text-black border-zinc-100 font-semibold"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span>Todos</span>
          </button>

          {isLoaded && favorites.length > 0 && (
            <button
              onClick={() => updateCategory("⭐ Mi Toolkit")}
              className={`flex-shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer ${
                activeCategory === "⭐ Mi Toolkit"
                  ? "bg-amber-400 text-black border-amber-400 font-semibold"
                  : "bg-zinc-900/60 text-amber-300/80 border-amber-500/20 hover:text-amber-300 hover:border-amber-500/40"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>⭐ Mi Toolkit ({favorites.length})</span>
            </button>
          )}

          {initialCategories.map((cat) => {
            const colors = getCategoryColor(cat.name);
            const isSelected = activeCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => updateCategory(isSelected ? "All" : cat.name)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-zinc-100 text-black border-zinc-100 font-semibold"
                    : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados: Secciones en 3 Columnas de Líneas */}
      <div className={`space-y-12 min-h-[50vh] transition-opacity duration-200 ${isFiltering ? "opacity-50" : "opacity-100"}`}>
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 rounded-lg bg-zinc-950/40">
            <Search className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-zinc-300">No se encontraron recursos</h3>
            <p className="text-xs text-zinc-500 mt-1">Intenta con otro término de búsqueda para &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                router.replace(pathname);
              }}
              className="mt-4 text-xs font-mono text-[var(--primary)] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isToolkit = category.name === "⭐ Mi Toolkit";
            const colors = getCategoryColor(category.name);
            const displayedLinks = category.links.slice(0, visibleCount);

            return (
              <section
                key={category.name}
                id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="space-y-3"
              >
                {/* Cabecera de Categoría */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${colors.dot} ${colors.glow}`} />
                    <Link
                      href={`/categoria/${slugify(category.name)}`}
                      className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                    <span className="text-xs font-mono text-zinc-600">
                      ({category.links.length})
                    </span>
                  </div>

                  {isToolkit && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyMarkdown}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                        title="Copiar lista en Markdown"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3 w-3 text-green-400" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Markdown</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadJson}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                        title="Descargar JSON"
                      >
                        <Download className="h-3 w-3" />
                        <span>JSON</span>
                      </button>
                      <button
                        onClick={clearFavorites}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/20 border border-red-500/10 text-[11px] font-mono text-red-400 hover:bg-red-950/50 transition-colors"
                        title="Limpiar favoritos"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Limpiar</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3 Columnas en Desktop / 1 Columna en Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                  {displayedLinks.map((link: LinkItem, index: number) => (
                    <LinkRow
                      key={`${link.url}-${index}`}
                      title={link.title}
                      url={link.url}
                      description={link.description}
                      categoryName={category.name}
                      isFavorite={favorites.some((fav) => fav.url === link.url)}
                      onToggleFavorite={() => toggleFavorite(link)}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Botón Cargar Más */}
      {filteredCategories.some((cat) => cat.links.length > visibleCount) && (
        <div className="flex justify-center pt-6 pb-16">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-6 py-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-600 transition-all cursor-pointer"
          >
            <span>Cargar más recursos</span>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          </button>
        </div>
      )}
    </div>
  );
}
