"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, Sparkles, Copy, Download, Trash2, X, CornerDownLeft } from "lucide-react";
import { createSearchIndex } from "@/lib/search";
import { slugify } from "@/lib/utils";

interface LinkItem {
  title: string;
  url: string;
  description?: string;
}

interface Category {
  name: string;
  links: LinkItem[];
}

interface CommandPaletteProps {
  categories: Category[];
}

export function CommandPalette({ categories }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorites, setFavorites] = useState<LinkItem[]>([]);
  const [copied, setCopied] = useState(false);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Sync favorites
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem("toolkit_favorites");
        if (stored) {
          setFavorites(JSON.parse(stored));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        console.error("Failed to load favorites in command palette", e);
      }
    };

    if (typeof window !== "undefined") {
      handleSync();
      window.addEventListener("toolkit-updated", handleSync);
      window.addEventListener("storage", handleSync);
      return () => {
        window.removeEventListener("toolkit-updated", handleSync);
        window.removeEventListener("storage", handleSync);
      };
    }
  }, [isOpen]);

  // MiniSearch Instance
  const searchIndex = useMemo(() => {
    return createSearchIndex(categories);
  }, [categories]);

  // Handle Ctrl+K / Cmd+K globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Reset query and selection when modal is toggled
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIndex(0);
      // Disable body scroll
      document.body.style.overflow = "hidden";
      // Focus input with a tiny delay for animation
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Actions structure
  const actions = useMemo(() => {
    if (favorites.length === 0) return [];
    return [
      {
        id: "action-copy",
        type: "action",
        title: "Copiar lista de favoritos como Markdown",
        subtitle: `${favorites.length} recursos guardados`,
        icon: Copy,
        handler: () => {
          const md = favorites
            .map((fav) => `- [${fav.title}](${fav.url})${fav.description ? `: ${fav.description}` : ""}`)
            .join("\n");
          navigator.clipboard.writeText(md).then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
              setIsOpen(false);
            }, 1000);
          });
        },
      },
      {
        id: "action-download",
        type: "action",
        title: "Descargar favoritos como JSON",
        subtitle: `${favorites.length} recursos guardados`,
        icon: Download,
        handler: () => {
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites, null, 2));
          const downloadAnchor = document.createElement("a");
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", "developer-toolkit.json");
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
          setIsOpen(false);
        },
      },
      {
        id: "action-clear",
        type: "action",
        title: "Vaciar todos los favoritos",
        subtitle: "Eliminar todos los recursos guardados en tu toolkit",
        icon: Trash2,
        danger: true,
        handler: () => {
          if (confirm("¿Estás seguro de que deseas limpiar todo tu kit de herramientas?")) {
            localStorage.setItem("toolkit_favorites", JSON.stringify([]));
            window.dispatchEvent(new Event("toolkit-updated"));
            setIsOpen(false);
          }
        },
      },
    ];
  }, [favorites]);

  // Search or List Categories
  const items = useMemo(() => {
    if (query.trim()) {
      // Perform MiniSearch search
      const results = searchIndex.search(query.trim());
      return results.slice(0, 8).map((res) => ({
        id: res.id,
        type: "link",
        title: res.title,
        url: res.url,
        description: res.description,
        category: res.category,
        icon: Terminal,
      }));
    } else {
      // Default: Action lists + Category list
      const categoryList = categories.map((cat) => ({
        id: `cat-${slugify(cat.name)}`,
        type: "category",
        title: `Ir a categoría: ${cat.name}`,
        subtitle: `${cat.links.length} recursos`,
        slug: slugify(cat.name),
        icon: Sparkles,
      }));
      return [...actions, ...categoryList];
    }
  }, [query, categories, actions, searchIndex]);

  // Adjust selection when items list change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
  }, [items]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[selectedIndex]) {
        handleSelectItem(items[selectedIndex]);
      }
    }
  };

  const handleSelectItem = (item: typeof items[number]) => {
    if (item.type === "action" && "handler" in item) {
      item.handler();
    } else if (item.type === "category" && "slug" in item) {
      router.push(`/categoria/${item.slug}`);
      setIsOpen(false);
    } else if (item.type === "link" && "url" in item) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Dynamic Command Keyboard Prompt indicator (Sticky corner or float) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 items-center gap-2 rounded-full bg-zinc-950/80 border border-white/10 px-4 text-xs font-bold text-zinc-400 backdrop-blur-md hover:text-[var(--primary)] hover:border-[var(--primary)]/30 hover:shadow-[0_0_20px_rgba(202,252,0,0.15)] transition-all cursor-pointer select-none"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded bg-white/5 border border-white/10 text-[10px] font-mono">
          ⌘
        </span>
        <span>+</span>
        <span className="flex h-5 w-5 items-center justify-center rounded bg-white/5 border border-white/10 text-[10px] font-mono">
          K
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-zinc-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col shadow-[0_0_50px_rgba(202,252,0,0.05)] z-10"
              onKeyDown={handleKeyDown}
            >
              {/* Search input header */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
                <Search className="h-5 w-5 text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Busca recursos, categorías, atajos del toolkit..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 outline-none text-base border-none font-medium focus:ring-0 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 hover:bg-white/10 rounded-md text-zinc-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <span className="rounded bg-zinc-900 border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500 font-mono select-none">
                  ESC
                </span>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="max-h-[350px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
              >
                {items.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-zinc-500">
                      No encontramos ningún recurso para &quot;<span className="text-zinc-300 font-medium">{query}</span>&quot;
                    </p>
                    <p className="text-xs text-zinc-600 mt-1">Prueba con palabras clave o una categoría distinta</p>
                  </div>
                ) : (
                  items.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;
                    const isAction = item.type === "action";
                    const isDanger = isAction && "danger" in item && item.danger;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className={`flex items-center justify-between px-4 py-3 mx-2 my-0.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-white/5 border-white/10 text-zinc-100"
                            : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5/30"
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                              isSelected
                                ? isDanger
                                  ? "bg-red-950/40 border-red-500/30 text-red-400"
                                  : "bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)] shadow-[0_0_10px_rgba(202,252,0,0.1)]"
                                : isDanger
                                ? "bg-red-950/10 border-red-500/10 text-red-400/80"
                                : "bg-zinc-900 border-white/5 text-zinc-400"
                            }`}
                          >
                            {isAction && item.id === "action-copy" && copied ? (
                              <span className="text-xs font-bold text-green-500">✓</span>
                            ) : (
                              <Icon className="h-4 w-4 shrink-0" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`text-sm font-semibold truncate ${
                                isSelected ? "text-zinc-100" : "text-zinc-300"
                              } ${isDanger ? "text-red-400" : ""}`}
                            >
                              {item.title}
                            </p>
                            {("subtitle" in item && item.subtitle) || ("description" in item && item.description) ? (
                              <p className="text-xs text-zinc-500 truncate mt-0.5">
                                {"subtitle" in item ? item.subtitle : item.description}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        {/* Badges and Helper tags */}
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {"category" in item && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[var(--primary)]">
                              {item.category}
                            </span>
                          )}
                          {isSelected && (
                            <span className="flex items-center gap-0.5 rounded bg-zinc-900 border border-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400 font-mono select-none">
                              <span>Enter</span>
                              <CornerDownLeft className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer status guide */}
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 bg-zinc-950 text-[10px] text-zinc-500 font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="font-mono">↑↓</span> Navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-mono">↵</span> Seleccionar
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Enlaces para Desarrolladores</span>
                  <span className="text-[var(--primary)] font-semibold">Premium</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
