"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryColor } from "@/lib/colors";
import type { Post } from "@/lib/posts";
import {
  Calendar,
  ExternalLink,
  X,
  Sparkles,
  Link as LinkIcon,
  Check,
  Share2,
} from "lucide-react";

interface PostsArchiveProps {
  posts: Post[];
}

interface ParsedResource {
  name: string;
  description: string;
  link: string;
}

function parsePostContent(rawContent: string) {
  const lines = rawContent.split(/\r?\n/);
  const introLines: string[] = [];
  const resources: ParsedResource[] = [];
  let footerNote = "";
  let inIntro = true;
  let inFooter = false;

  let currentName = "";
  let currentDesc = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "---") {
      if (inIntro) {
        inIntro = false;
      } else if (!inFooter && resources.length > 0) {
        inFooter = true;
      }
      continue;
    }

    if (inIntro) {
      if (line) introLines.push(line);
      continue;
    }

    if (inFooter) {
      if (line) footerNote = (footerNote ? footerNote + " " : "") + line;
      continue;
    }

    // Procesar recursos
    if (line.toLowerCase().startsWith("link:")) {
      const link = line.replace(/^link:\s*/i, "").trim();
      if (currentName || currentDesc) {
        resources.push({
          name: currentName,
          description: currentDesc,
          link,
        });
        currentName = "";
        currentDesc = "";
      }
    } else if (line.includes(":") && !line.toLowerCase().startsWith("http")) {
      const colonIndex = line.indexOf(":");
      currentName = line.substring(0, colonIndex).trim();
      currentDesc = line.substring(colonIndex + 1).trim();
    } else if (line) {
      if (currentDesc) {
        currentDesc += " " + line;
      } else if (currentName) {
        currentDesc = line;
      } else if (line.startsWith("🤖") || line.toLowerCase().includes("nota:")) {
        inFooter = true;
        footerNote = line;
      }
    }
  }

  return {
    intro: introLines.join(" "),
    resources,
    footerNote,
  };
}

export function PostsArchive({ posts }: PostsArchiveProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };
    if (selectedPost) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPost]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateStr).toLocaleDateString("es-ES", options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      {/* Grid de Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20 border border-zinc-900 rounded-xl bg-zinc-950/40">
          <p className="text-zinc-500 text-sm font-mono">
            Próximamente se publicarán las primeras entregas diarias de recursos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const colors = getCategoryColor(post.category || "General");
            const postImage = post.image || `/og/posts/${post.slug}.webp`;

            return (
              <article
                key={post.slug}
                id={post.slug}
                className="group relative flex flex-col rounded-xl border border-zinc-900 bg-zinc-950/80 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.9)] cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {/* Imagen del Post */}
                <div className="relative w-full aspect-video overflow-hidden bg-zinc-900 block">
                  <Image
                    src={postImage}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Meta: Categoría + Fecha */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        {post.category || "Recursos"}
                      </span>
                    </div>

                    {post.date && (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                        <Calendar className="w-3 h-3 text-zinc-600" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    )}
                  </div>

                  {/* Título */}
                  <h2 className="text-base font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>

                  {/* Copy */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {post.copy}
                  </p>

                  {/* Botón Ver Recursos (Abre modal) */}
                  <div className="mt-auto pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                      }}
                      className="inline-flex items-center gap-1 text-[var(--primary)] group-hover:underline font-bold focus:outline-none"
                    >
                      <span>Ver recursos</span>
                      <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <span className="text-[10px] text-zinc-600 font-mono">
                      {post.slug}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal Tooltip Lateral / Dialog de Recursos */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>{selectedPost.category || "Recursos"}</span>
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {formatDate(selectedPost.date)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Título & Copy */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                    {selectedPost.title}
                  </h3>
                  {selectedPost.copy && (
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      {selectedPost.copy}
                    </p>
                  )}
                </div>

                {/* Lista Parseada de Recursos */}
                {(() => {
                  const { intro, resources, footerNote } = parsePostContent(
                    selectedPost.rawContent
                  );

                  return (
                    <div className="space-y-4">
                      {intro && (
                        <div className="text-xs font-mono text-zinc-400 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80">
                          {intro}
                        </div>
                      )}

                      {resources.length > 0 ? (
                        <div className="space-y-3">
                          {resources.map((res, idx) => (
                            <div
                              key={idx}
                              className="group relative p-4 rounded-xl border border-zinc-900 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">
                                  {res.name}
                                </h4>
                                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                                  {res.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(res.link)}
                                  title="Copiar enlace"
                                  className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors text-xs"
                                >
                                  {copiedLink === res.link ? (
                                    <Check className="w-3.5 h-3.5 text-[var(--primary)]" />
                                  ) : (
                                    <LinkIcon className="w-3.5 h-3.5" />
                                  )}
                                </button>

                                <a
                                  href={res.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold bg-[var(--primary)] text-black hover:bg-[var(--primary)]/90 transition-all shadow-[0_0_10px_rgba(202,252,0,0.15)]"
                                >
                                  <span>Visitar</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Si no se pudieron parsear ítems específicos, mostrar rawContent limpio */
                        <div className="text-xs text-zinc-300 font-mono whitespace-pre-wrap bg-zinc-900/40 p-4 rounded-lg border border-zinc-800">
                          {selectedPost.rawContent}
                        </div>
                      )}

                      {footerNote && (
                        <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                          {footerNote}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Footer Modal */}
              <div className="px-6 py-3 border-t border-zinc-900 bg-zinc-900/30 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Enlaces para Desarrolladores</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedPost.title,
                          text: selectedPost.copy,
                          url: window.location.href,
                        });
                      } else {
                        copyToClipboard(window.location.href);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
