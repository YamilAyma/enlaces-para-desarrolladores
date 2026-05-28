"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  copy: string;
}

export function ShareButton({ title, copy }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: title,
            text: copy,
            url: window.location.href,
          })
          .catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado al portapapeles");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none"
    >
      <Share2 className="w-4 h-4" />
      <span>Compartir</span>
    </button>
  );
}
