"use client";

import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { getCategoryColor } from "@/lib/colors";

export interface LinkRowProps {
  title: string;
  url: string;
  description?: string;
  categoryName?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function LinkRow({
  title,
  url,
  description,
  categoryName,
  isFavorite = false,
  onToggleFavorite,
}: LinkRowProps) {
  const colors = getCategoryColor(categoryName || title);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between gap-2.5 px-3 py-2 rounded-md transition-all duration-200 hover:bg-zinc-900/60 border border-transparent hover:border-white/5"
    >
      {/* Contenedor principal de información (Línea continua) */}
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        {/* Punto de color luminoso */}
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${colors.dot} ${colors.glow} transition-transform duration-200 group-hover:scale-125`}
        />

        {/* Nombre / Título */}
        <span className="font-semibold text-xs sm:text-[13px] text-zinc-200 group-hover:text-white shrink-0 tracking-tight transition-colors">
          {title}
        </span>

        {/* Separador */}
        <span className="text-zinc-600 shrink-0 text-xs select-none">·</span>

        {/* Descripción truncada */}
        {description && (
          <span
            className="text-xs text-zinc-400 group-hover:text-zinc-300 truncate font-normal leading-relaxed transition-colors"
            title={description}
          >
            {description}
          </span>
        )}
      </div>

      {/* Acciones de la derecha: Favorito y Flecha exterior */}
      <div className="flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(e);
            }}
            className={`p-1 rounded-sm transition-all duration-150 ${
              isFavorite
                ? "text-amber-400 opacity-100 scale-110"
                : "text-zinc-500 hover:text-amber-300 hover:scale-110"
            }`}
            title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                isFavorite ? "fill-amber-400 text-amber-400" : "fill-none"
              }`}
            />
          </button>
        )}

        <div className="p-0.5 text-zinc-500 group-hover:text-zinc-200">
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}
