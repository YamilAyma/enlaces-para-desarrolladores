import { ArrowUpRight, Star } from "lucide-react";
import React from "react";

interface LinkCardProps {
  title: string;
  url: string;
  description?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function LinkCard({ title, url, description, isFavorite = false, onToggleFavorite }: LinkCardProps) {
  // Extract domain for display
  let domain = "";
  try {
    domain = new URL(url).hostname.replace("www.", "");
  } catch {
    domain = url;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:bg-black backdrop-blur-sm"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight text-zinc-100 group-hover:text-[var(--primary)] transition-colors duration-300 line-clamp-2">
            {title}
            </h3>
            <div className="flex items-center gap-2">
                {onToggleFavorite && (
                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleFavorite(e);
                        }}
                        className={`rounded-full p-1.5 transition-all duration-300 border ${
                            isFavorite 
                            ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_10px_rgba(202,252,0,0.4)] scale-105" 
                            : "bg-white/5 border-white/5 text-zinc-400 hover:text-[var(--primary)] hover:bg-white/10 hover:border-white/10 hover:scale-105"
                        }`}
                        title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                    >
                        <Star className={`h-4 w-4 shrink-0 ${isFavorite ? "fill-black" : "fill-none"}`} />
                    </button>
                )}
                <div className="rounded-full bg-white/5 p-1.5 transition-colors border border-transparent group-hover:bg-[var(--primary)] group-hover:text-black group-hover:border-[var(--primary)]">
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
            </div>
        </div>
        
        {description && (
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                {description}
            </p>
        )}

        <p className="text-sm font-medium text-zinc-500 font-mono truncate group-hover:text-zinc-400 transition-colors">
            {domain}
        </p>
      </div>

      {/* Metallic Shine Effect */}
      <div className="absolute inset-0 -z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
      
      {/* Subtle Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  );
}
