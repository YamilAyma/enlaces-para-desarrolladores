import Image from "next/image";
import { Github } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-20 text-center">
      
      {/* Replaced Text with Logo - INCREASED SIZE */}
      <div className="relative h-32 w-96 md:h-40 md:w-[600px] mb-8 animate-in fade-in zoom-in duration-500">
        <Image 
            src="/logo.png" 
            alt="Enlaces para Desarrolladores" 
            fill 
            className="object-contain" 
            priority
        />
      </div>
      
      <p className="mt-4 max-w-2xl text-xl text-muted-foreground font-sans leading-relaxed">
        Discover hundreds of carefully selected resources, tools, and libraries to power up your development workflow.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a 
            href="#gallery"
            className="rounded-full bg-[var(--primary)] px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(202,252,0,0.3)]"
        >
            Explore Resources
        </a>
        <a 
            href="https://github.com/YamilAyma/enlaces-para-desarrolladores"
            target="_blank"
            className="flex items-center gap-2 rounded-full border border-input bg-background/50 px-8 py-4 text-lg font-medium transition-colors hover:bg-[var(--muted)]"
        >
            <Github className="h-5 w-5" />
            <span>Submit Link</span>
        </a>
      </div>
    </section>
  );
}
