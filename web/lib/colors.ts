export interface CategoryColor {
  dot: string;
  glow: string;
  border: string;
  badge: string;
}

export function getCategoryColor(categoryName: string): CategoryColor {
  const norm = categoryName.toLowerCase();

  // Frontend / UI / Icons / Styling / React / Vue / CSS
  if (
    norm.includes("frontend") ||
    norm.includes("ui") ||
    norm.includes("css") ||
    norm.includes("icon") ||
    norm.includes("component") ||
    norm.includes("animac") ||
    norm.includes("diseño") ||
    norm.includes("color")
  ) {
    return {
      dot: "bg-purple-400 text-purple-400",
      glow: "shadow-[0_0_8px_rgba(192,132,252,0.8)]",
      border: "border-purple-500/30",
      badge: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    };
  }

  // AI / LLMs / Agents / Prompts / Machine Learning
  if (
    norm.includes("ia") ||
    norm.includes("ai") ||
    norm.includes("llm") ||
    norm.includes("agent") ||
    norm.includes("inteligencia") ||
    norm.includes("prompt") ||
    norm.includes("machine")
  ) {
    return {
      dot: "bg-amber-400 text-amber-400",
      glow: "shadow-[0_0_8px_rgba(251,191,36,0.8)]",
      border: "border-amber-500/30",
      badge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    };
  }

  // Backend / APIs / Node / Python / Go / Rust
  if (
    norm.includes("backend") ||
    norm.includes("api") ||
    norm.includes("node") ||
    norm.includes("server") ||
    norm.includes("go") ||
    norm.includes("rust") ||
    norm.includes("python") ||
    norm.includes("framework")
  ) {
    return {
      dot: "bg-emerald-400 text-emerald-400",
      glow: "shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      border: "border-emerald-500/30",
      badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    };
  }

  // DevOps / Cloud / Docker / Linux / Hosting / Security
  if (
    norm.includes("devops") ||
    norm.includes("cloud") ||
    norm.includes("docker") ||
    norm.includes("linux") ||
    norm.includes("deploy") ||
    norm.includes("host") ||
    norm.includes("seguridad")
  ) {
    return {
      dot: "bg-cyan-400 text-cyan-400",
      glow: "shadow-[0_0_8px_rgba(34,211,238,0.8)]",
      border: "border-cyan-500/30",
      badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    };
  }

  // Database / Storage / Postgres / SQL / Redis
  if (
    norm.includes("database") ||
    norm.includes("base de datos") ||
    norm.includes("sql") ||
    norm.includes("data") ||
    norm.includes("storage") ||
    norm.includes("redis")
  ) {
    return {
      dot: "bg-rose-400 text-rose-400",
      glow: "shadow-[0_0_8px_rgba(251,113,133,0.8)]",
      border: "border-rose-500/30",
      badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    };
  }

  // Tools / Productivity / CLI / General utilities (default)
  return {
    dot: "bg-orange-400 text-orange-400",
    glow: "shadow-[0_0_8px_rgba(251,146,60,0.8)]",
    border: "border-orange-500/30",
    badge: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  };
}
