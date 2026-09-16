import { describe, expect, it } from "vitest";
import { getCategoryColor } from "./colors";

describe("getCategoryColor", () => {
  const purpleTheme = {
    dot: "bg-purple-400 text-purple-400",
    glow: "shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    border: "border-purple-500/30",
    badge: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  const amberTheme = {
    dot: "bg-amber-400 text-amber-400",
    glow: "shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    border: "border-amber-500/30",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  const emeraldTheme = {
    dot: "bg-emerald-400 text-emerald-400",
    glow: "shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    border: "border-emerald-500/30",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  const cyanTheme = {
    dot: "bg-cyan-400 text-cyan-400",
    glow: "shadow-[0_0_8px_rgba(34,211,238,0.8)]",
    border: "border-cyan-500/30",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  };

  const roseTheme = {
    dot: "bg-rose-400 text-rose-400",
    glow: "shadow-[0_0_8px_rgba(251,113,133,0.8)]",
    border: "border-rose-500/30",
    badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  const orangeTheme = {
    dot: "bg-orange-400 text-orange-400",
    glow: "shadow-[0_0_8px_rgba(251,146,60,0.8)]",
    border: "border-orange-500/30",
    badge: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  };

  describe("Frontend / UI / Styling category (Purple)", () => {
    const frontendKeywords = [
      "Frontend",
      "UI",
      "CSS",
      "Iconos",
      "Componentes",
      "Animaciones",
      "Diseño",
      "Color",
    ];

    it.each(frontendKeywords)(
      "should return purple theme for '%s'",
      (category) => {
        expect(getCategoryColor(category)).toEqual(purpleTheme);
      }
    );
  });

  describe("AI / LLMs / Agents category (Amber)", () => {
    const aiKeywords = [
      "IA",
      "AI",
      "LLMs",
      "Agent",
      "Inteligencia Artificial",
      "Prompting",
      "Machine Learning",
    ];

    it.each(aiKeywords)("should return amber theme for '%s'", (category) => {
      expect(getCategoryColor(category)).toEqual(amberTheme);
    });
  });

  describe("Backend / APIs / Languages category (Emerald)", () => {
    const backendKeywords = [
      "Backend",
      "APIs",
      "Node.js",
      "Server",
      "Golang",
      "Rust",
      "Python",
      "Frameworks",
    ];

    it.each(backendKeywords)(
      "should return emerald theme for '%s'",
      (category) => {
        expect(getCategoryColor(category)).toEqual(emeraldTheme);
      }
    );
  });

  describe("DevOps / Cloud / Security category (Cyan)", () => {
    const devopsKeywords = [
      "DevOps",
      "Cloud",
      "Docker",
      "Linux",
      "Deployment",
      "Hosting",
      "Seguridad",
    ];

    it.each(devopsKeywords)("should return cyan theme for '%s'", (category) => {
      expect(getCategoryColor(category)).toEqual(cyanTheme);
    });
  });

  describe("Database / Storage category (Rose)", () => {
    const databaseKeywords = [
      "Database",
      "Base de datos",
      "SQL",
      "Data",
      "Storage",
      "Redis",
    ];

    it.each(databaseKeywords)(
      "should return rose theme for '%s'",
      (category) => {
        expect(getCategoryColor(category)).toEqual(roseTheme);
      }
    );
  });

  describe("Default / Fallback category (Orange)", () => {
    const fallbackCategories = [
      "Herramientas",
      "Productividad",
      "CLI",
      "General",
      "Utilidades",
      "Desconocido",
    ];

    it.each(fallbackCategories)(
      "should return default orange theme for '%s'",
      (category) => {
        expect(getCategoryColor(category)).toEqual(orangeTheme);
      }
    );
  });

  describe("Edge cases and boundary conditions", () => {
    it("should return default orange theme for empty string", () => {
      expect(getCategoryColor("")).toEqual(orangeTheme);
    });

    it("should handle mixed case and uppercase string inputs", () => {
      expect(getCategoryColor("FRONTEND")).toEqual(purpleTheme);
      expect(getCategoryColor("aI")).toEqual(amberTheme);
      expect(getCategoryColor("BACKEND")).toEqual(emeraldTheme);
      expect(getCategoryColor("ClOuD")).toEqual(cyanTheme);
      expect(getCategoryColor("sQl")).toEqual(roseTheme);
    });

    it("should handle leading and trailing whitespace", () => {
      expect(getCategoryColor("  frontend  ")).toEqual(purpleTheme);
      expect(getCategoryColor("\tai\n")).toEqual(amberTheme);
    });

    it("should handle categories with symbols and special characters", () => {
      expect(getCategoryColor("API (v2)")).toEqual(emeraldTheme);
      expect(getCategoryColor("Docker/Kubernetes")).toEqual(cyanTheme);
      expect(getCategoryColor("UI & UX")).toEqual(purpleTheme);
      expect(getCategoryColor("Data-Storage")).toEqual(roseTheme);
    });

    it("should follow priority order when string contains keywords from multiple categories", () => {
      // Frontend (1st) vs AI (2nd) -> Frontend wins
      expect(getCategoryColor("Frontend AI")).toEqual(purpleTheme);

      // AI (2nd) vs Backend (3rd) -> AI wins
      expect(getCategoryColor("AI Backend")).toEqual(amberTheme);

      // Backend (3rd) vs DevOps (4th) -> Backend wins
      expect(getCategoryColor("Backend DevOps")).toEqual(emeraldTheme);

      // DevOps (4th) vs Database (5th) -> DevOps wins
      expect(getCategoryColor("DevOps Database")).toEqual(cyanTheme);
    });

    it("should return object containing required properties with string values", () => {
      const result = getCategoryColor("Anything");

      expect(result).toHaveProperty("dot");
      expect(result).toHaveProperty("glow");
      expect(result).toHaveProperty("border");
      expect(result).toHaveProperty("badge");

      expect(typeof result.dot).toBe("string");
      expect(typeof result.glow).toBe("string");
      expect(typeof result.border).toBe("string");
      expect(typeof result.badge).toBe("string");

      expect(result.dot.length).toBeGreaterThan(0);
      expect(result.glow.length).toBeGreaterThan(0);
      expect(result.border.length).toBeGreaterThan(0);
      expect(result.badge.length).toBeGreaterThan(0);
    });
  });
});
