import Link from "next/link";
import { Github, Globe, Heart } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-md py-12 mt-20 relative">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand/Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-sm font-black font-heading text-white tracking-tight uppercase">
                Enlaces para <span className="text-[var(--primary)]">Desarrolladores</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500">
              &copy; {currentYear} Todos los derechos reservados.
            </p>
          </div>

          {/* Author/Backlink Attribution */}
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>Creado con</span>
            <Heart className="h-3.5 w-3.5 fill-[var(--primary)] text-[var(--primary)] animate-pulse" />
            <span>por</span>
            <a
              href="https://yamilayma.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-100 hover:text-[var(--primary)] transition-all duration-300 relative group py-0.5"
            >
              Yamil Ayma
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Social / Repo Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://yamilayma.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              title="Sitio Web de Yamil Ayma"
              className="text-zinc-500 hover:text-[var(--primary)] transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/YamilAyma/enlaces-para-desarrolladores"
              target="_blank"
              rel="noopener noreferrer"
              title="Repositorio en GitHub"
              className="text-zinc-500 hover:text-[var(--primary)] transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
