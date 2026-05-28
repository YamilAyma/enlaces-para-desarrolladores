import Link from "next/link";
import { Github, Globe, Heart, FileText, Rss } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-md pt-16 pb-12 mt-20 relative">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Multi-column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo and Brand info */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-sm font-black font-heading text-white tracking-tight uppercase">
                Enlaces para <span className="text-[var(--primary)]">Desarrolladores</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Una colección curada de cientos de recursos de código abierto, herramientas y bibliotecas para potenciar tu flujo de trabajo de programación.
            </p>
          </div>

          {/* Column 2: Resources Categories Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Recursos</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/categoria/packs" className="hover:text-[var(--primary)] transition-colors duration-200">
                  Packs de Recursos
                </Link>
              </li>
              <li>
                <Link href="/categoria/listas" className="hover:text-[var(--primary)] transition-colors duration-200">
                  Listas Curadas
                </Link>
              </li>
              <li>
                <Link href="/categoria/roadmaps" className="hover:text-[var(--primary)] transition-colors duration-200">
                  Rutas de Aprendizaje
                </Link>
              </li>
              <li>
                <Link href="/categoria/apis" className="hover:text-[var(--primary)] transition-colors duration-200">
                  APIs para Devs
                </Link>
              </li>
              <li>
                <Link href="/categoria/tecnico" className="hover:text-[var(--primary)] transition-colors duration-200">
                  Herramientas Técnicas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Blog & Automations */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Blog &amp; Feed</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/blog" className="hover:text-[var(--primary)] transition-colors duration-200">
                  Artículos &amp; Guías
                </Link>
              </li>
              <li>
                <a 
                  href="/posts/rss.xml" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--primary)] transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  <Rss className="w-3.5 h-3.5" />
                  <span>Feed RSS</span>
                </a>
              </li>
              <li>
                <a 
                  href="/llms.txt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--primary)] transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Para agentes de IA</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Repo / Project */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Contribuciones</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li>
                <a 
                  href="https://github.com/YamilAyma/enlaces-para-desarrolladores" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors duration-200"
                >
                  Repositorio GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/YamilAyma/enlaces-para-desarrolladores/blob/main/LICENSE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors duration-200"
                >
                  Licencia MIT
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/YamilAyma/enlaces-para-desarrolladores/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors duration-200"
                >
                  Reportar Errores
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright Info */}
          <div className="text-xs text-zinc-500 flex flex-col items-center md:items-start gap-1">
            <span>&copy; {currentYear} Enlaces para Desarrolladores.</span>
            <span>Todos los derechos reservados.</span>
          </div>

          {/* Author Backlink Attribution */}
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

          {/* Social Icons */}
          <div className="flex items-center gap-2">
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
