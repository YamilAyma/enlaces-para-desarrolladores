"use client";

import { HeroNetworkBackground } from "@/components/hero-network-background";
import { Github, PlusCircle, Command } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative isolate flex flex-col items-center justify-center pt-4 pb-12 text-center max-w-3xl mx-auto">
      {/* SVG de Red de Internet Animada de Fondo */}
      <HeroNetworkBackground />

      {/* Contenido en capa superior */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Titular Editorial Compacto y Elegante */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-3 text-zinc-100 font-serif leading-[1.25]">
          El <span className="italic font-serif text-[var(--primary)]">Directorio Definitivo</span>
          <br />
          de Recursos para <span className="italic font-serif text-white">Desarrolladores</span>.
        </h1>

        {/* Subtítulo Estilo desengs */}
        <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-5">
          Curado minuciosamente por la comunidad — para programadores, creadores e ingenieros de software.
        </p>

        {/* Enlaces y Metadatos Rápidos */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-zinc-400 mb-6">
          <button
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
              );
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-white/20 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <Command className="h-3 w-3 text-[var(--primary)]" />
            <span>⌘K Buscar</span>
          </button>

          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-white/20 hover:text-white transition-colors text-xs"
          >
            <Github className="h-3 w-3" />
            <span>Código Abierto</span>
          </a>

          <a
            href={SITE_CONFIG.links.contributing}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-white/20 hover:text-white transition-colors text-xs"
          >
            <PlusCircle className="h-3 w-3 text-emerald-400" />
            <span>Proponer Recurso</span>
          </a>
        </div>

        {/* Línea Divisoria Editorial */}
        <div className="w-full max-w-sm h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>
    </section>
  );
}
