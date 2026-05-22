import Image from "next/image";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-8 pb-12 text-center max-w-4xl mx-auto">
      {/* Resplandor radial de fondo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--color-primary)/0.03,_transparent_60%)] pointer-events-none" />
      
      {/* Elemento de Marca Visual (Logotipo Premium) */}
      <div className="relative mb-6 animate-in fade-in zoom-in duration-700">
        <div className="absolute inset-0 bg-[var(--primary)]/10 blur-[50px] rounded-full scale-75" />
        <div className="relative h-28 w-80 md:h-36 md:w-[480px]">
          <Image 
              src="/logo.png" 
              alt="Logotipo de Enlaces para Desarrolladores" 
              fill 
              className="object-contain filter drop-shadow-[0_0_15px_rgba(202,252,0,0.1)]" 
              priority
          />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
        Recursos Premium para <span className="text-[var(--primary)] drop-shadow-[0_0_20px_rgba(202,252,0,0.2)]">Desarrolladores</span>
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-zinc-400 font-sans leading-relaxed mb-8">
        Una colección curada con cientos de recursos de vanguardia, herramientas de código abierto y utilidades seleccionadas cuidadosamente para potenciar y acelerar tu flujo de trabajo de programación.
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/5 text-zinc-400 text-sm font-semibold shadow-inner mb-2 animate-pulse duration-[3000ms]">
        <Sparkles className="h-4 w-4 text-[var(--primary)]" />
        <span>Acceso libre e inmediato a cientos de herramientas y APIs</span>
      </div>
    </section>
  );
}
