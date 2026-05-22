export function slugify(text: string): string {
  // 1. Extraer solo el título principal antes de aclaraciones parentéticas o de formato
  // Ej: "📦 PACKS (Colección de recursos...)" -> "📦 PACKS"
  // Ej: "Self-Hosted / Autoalojado" -> "Self-Hosted"
  const cleanedText = text.split(/[([:/]/)[0];

  return cleanedText
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^\w\s-]/g, '') // Eliminar emojis y caracteres especiales no alfanuméricos, manteniendo espacios/guiones
    .trim()
    .replace(/\s+/g, '-') // Convertir espacios múltiples en un solo guion
    .replace(/--+/g, '-') // Evitar guiones consecutivos
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio y al final de la URL
}
