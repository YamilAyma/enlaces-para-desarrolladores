import { 
  Box, 
  Code2, 
  Cpu, 
  Database, 
  FileCode2, 
  Gamepad2, 
  Globe, 
  GraduationCap, 
  Hammer, 
  Image as ImageIcon, 
  Layers, 
  Layout, 
  LayoutTemplate, 
  Library, 
  Monitor, 
  Palette, 
  PenTool, 
  Bot, 
  Rocket, 
  Server, 
  Smartphone, 
  Terminal, 
  Wrench,
  Zap,
  BookOpen, 
  Mic
} from "lucide-react";

export const getCategoryIcon = (categoryName: string) => {
  const normalized = categoryName.toLowerCase();

  if (normalized.includes("pack")) return Layers;
  if (normalized.includes("api")) return Server;
  if (normalized.includes("técnico")) return Code2;
  if (normalized.includes("herramientas")) return Wrench;
  if (normalized.includes("web")) return Globe;
  if (normalized.includes("componentes")) return LayoutTemplate;
  if (normalized.includes("plantillas")) return Layout;
  if (normalized.includes("articulos")) return FileCode2;
  if (normalized.includes("documentación")) return Library;
  if (normalized.includes("cursos")) return GraduationCap;
  if (normalized.includes("tipografias")) return PenTool;
  if (normalized.includes("blogs")) return BookOpen;
  if (normalized.includes("self-hosted")) return Database;
  if (normalized.includes("ia")) return Bot; 
  if (normalized.includes("podcast")) return Mic;
  if (normalized.includes("otros")) return Box;
  if (normalized.includes("inspiración")) return Palette;
  if (normalized.includes("juegos")) return Gamepad2;
  if (normalized.includes("terminal")) return Terminal;
  if (normalized.includes("mobile") || normalized.includes("movil")) return Smartphone;
  if (normalized.includes("despliegue")) return Rocket;
  if (normalized.includes("frontend")) return Monitor;
  if (normalized.includes("backend")) return Server;

  // Default
  return Zap;
};
