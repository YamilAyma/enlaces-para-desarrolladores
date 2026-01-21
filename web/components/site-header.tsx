"use client";

import { motion } from "framer-motion";
import { Search, Github, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState,  Suspense, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SiteHeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTerm(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setTerm(value);
    startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("q", value);
        } else {
            params.delete("q");
        }
        router.replace(`/?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <Link href="/" onClick={() => router.replace('/')} className="flex items-center gap-2 group">
             <div className="relative h-12 w-12 overflow-hidden rounded-xl"> 
                <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill 
                    className="object-cover transition-transform group-hover:scale-110" 
                />
             </div>
             <div className="flex flex-col leading-none">
                <span className="text-xs text-muted-foreground font-medium">Enlaces para</span>
                <span className="text-base font-bold font-heading text-foreground tracking-tight">Desarrolladores</span>
             </div>
        </Link>
      </div>

      <div />

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" /> : <Search className="h-4 w-4" />}
            </div>
            <input 
                type="text"
                placeholder="Buscar recursos..."
                value={term}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-48 lg:w-64 rounded-full border border-input bg-background/50 px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-all group-focus-within:w-72 group-focus-within:bg-background"
            />
        </div>
        
        <a 
            href="https://github.com/YamilAyma/enlaces-para-desarrolladores" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-input bg-background/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--muted)]"
        >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Submit Link</span>
        </a>
      </div>
    </motion.header>
  );
}

export function SiteHeader() {
    return (
        <Suspense fallback={<header className="fixed top-0 z-50 h-20 w-full bg-background" />}>
            <SiteHeaderContent />
        </Suspense>
    )
}
