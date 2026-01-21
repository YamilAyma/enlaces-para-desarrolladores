"use client";

import { useMemo, useState, useEffect } from "react";
import { LinkCard } from "@/components/link-card";
import { BentoGrid } from "@/components/bento-grid";
import { getCategoryIcon } from "@/lib/icons";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Loader2, Search } from "lucide-react";

interface Category {
  name: string;
  links: any[];
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
    setVisibleCount(20);
  }, [searchQuery, activeCategory]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  // Memoized Filtering
  const filteredCategories = useMemo(() => {
    let categories = initialCategories;

    // 1. Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      categories = categories.map(cat => ({
        ...cat,
        links: cat.links.filter(link => 
          link.title.toLowerCase().includes(lowerQuery) || 
          link.url.toLowerCase().includes(lowerQuery)
        )
      })).filter(cat => cat.links.length > 0);
    }

    // 2. Filter by Category
    if (activeCategory !== "All") {
      categories = categories.filter(cat => cat.name === activeCategory);
    }

    return categories;
  }, [initialCategories, searchQuery, activeCategory]);

  return (
    <div className="space-y-12" id="gallery">
      {/* Category Pills - Larger & Scrollbar hidden via global utility */}
      <div className="sticky top-[72px] z-30 bg-transparent backdrop-blur-md py-6">
         <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide mask-fade-right px-1">
                <button
                    onClick={() => updateCategory("All")}
                    className={`flex-shrink-0 rounded-full px-6 py-2.5 text-base font-semibold transition-all duration-300 border shadow-sm ${
                        activeCategory === "All" 
                        ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_20px_rgba(202,252,0,0.4)] scale-105" 
                        : "bg-background/80 backdrop-blur text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground hover:border-foreground/20"
                    }`}
                >
                    Todos
                </button>
                {initialCategories.map(cat => (
                    <button
                        key={cat.name}
                        onClick={() => updateCategory(cat.name)}
                        className={`flex-shrink-0 rounded-full px-6 py-2.5 text-base font-semibold transition-all duration-300 border shadow-sm ${
                            activeCategory === cat.name 
                            ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_20px_rgba(202,252,0,0.4)] scale-105" 
                            : "bg-background/80 backdrop-blur text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground hover:border-foreground/20"
                        }`}
                    >
                        {cat.name}
                    </button>
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
              const Icon = getCategoryIcon(category.name);
              const displayedLinks = category.links.slice(0, visibleCount);

              return (
                <section key={category.name} id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-[var(--primary)] shadow-[0_0_15px_rgba(202,252,0,0.1)]">
                            <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold font-heading tracking-tight">{category.name}</h2>
                        <span className="ml-auto rounded-full bg-zinc-900 px-3 py-1 text-sm font-bold text-[var(--primary)] border border-white/10">
                            {category.links.length}
                        </span>
                    </div>

                    <BentoGrid>
                        {displayedLinks.map((link: any, index: number) => (
                            <LinkCard
                                key={`${link.url}-${index}`}
                                title={link.title}
                                url={link.url}
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
