import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sharp from "sharp";

const postsDirectory = path.join(process.cwd(), "posts");
const postsOutputDirectory = path.join(process.cwd(), "public", "og", "posts");
const categoriesOutputDirectory = path.join(process.cwd(), "public", "og");
const readmePath = path.join(process.cwd(), "..", "README.md");

// Asegurar que las carpetas de destino existan
if (!fs.existsSync(postsOutputDirectory)) {
  fs.mkdirSync(postsOutputDirectory, { recursive: true });
}
if (!fs.existsSync(categoriesOutputDirectory)) {
  fs.mkdirSync(categoriesOutputDirectory, { recursive: true });
}

/**
 * Función slugify idéntica a la utilizada en la aplicación
 */
function slugify(text) {
  const cleanedText = text.split(/[([:/]/)[0];

  return cleanedText
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^\w\s-]/g, '') // Eliminar emojis y caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/--+/g, '-') // Guiones múltiples
    .replace(/^-+|-+$/g, ''); // Remover guiones del principio y final
}

/**
 * Divide una cadena de texto en múltiples líneas de máximo N caracteres,
 * respetando las palabras completas para evitar cortes toscos.
 */
function splitTextIntoLines(text, maxChars = 32) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxChars) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Genera una plantilla SVG para la portada de los artículos del blog
 */
function generateSvgTemplate(title, category) {
  const cleanTitle = title || "Artículo del Blog";
  const cleanCategory = (category || "Recursos").toUpperCase();

  const titleLines = splitTextIntoLines(cleanTitle, 30);
  const lineHeight = 75;
  const totalTextHeight = titleLines.length * lineHeight;
  const startY = 315 - (totalTextHeight / 2) + 40;

  const textLinesSvg = titleLines
    .map((line, index) => {
      const yPos = startY + index * lineHeight;
      const escapedLine = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt bridge;");
      return `<text x="600" y="${yPos}" text-anchor="middle" fill="#ffffff" font-size="52" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.02em">${escapedLine}</text>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050505" />

  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="80%" cy="20%" r="65%">
      <stop offset="0%" stop-color="#CAFC00" stop-opacity="0.10" />
      <stop offset="50%" stop-color="#CAFC00" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#050505" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <g transform="translate(600, 110)">
    <rect x="-90" y="-20" width="180" height="38" rx="8" fill="rgba(202, 252, 0, 0.05)" stroke="rgba(202, 252, 0, 0.25)" stroke-width="1.5" />
    <text x="0" y="4" text-anchor="middle" fill="#CAFC00" font-size="12" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.15em">${cleanCategory}</text>
  </g>

  ${textLinesSvg}

  <g transform="translate(600, 520)">
    <circle cx="-135" cy="0" r="10" fill="none" stroke="#CAFC00" stroke-width="3" opacity="0.8" />
    <circle cx="-135" cy="0" r="3" fill="#CAFC00" />
    <text x="-115" y="6" fill="#88888b" font-size="16" font-weight="700" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">ENLACES PARA</text>
    <text x="15" y="6" fill="#ffffff" font-size="16" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">DESARROLLADORES</text>
    <text x="0" y="32" text-anchor="middle" fill="#52525b" font-size="13" font-weight="500" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.08em">enlaces-para-desarrolladores.netlify.app</text>
  </g>
</svg>`;
}

/**
 * Genera una plantilla SVG para las portadas de categoría (Diseño Asimétrico y Moderno)
 */
function generateCategorySvgTemplate(title, emoji, description, count) {
  const cleanTitle = title || "Recursos";
  const cleanEmoji = emoji || "📦";
  const cleanDesc = description || "Herramientas y enlaces seleccionados para desarrolladores.";
  
  // Título: máximo 20 caracteres por línea
  const titleLines = splitTextIntoLines(cleanTitle, 20);
  const titleLineHeight = 85;
  const startTitleY = 220;
  
  const titleSvg = titleLines.map((line, index) => {
    const yPos = startTitleY + index * titleLineHeight;
    const escapedLine = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<text x="80" y="${yPos}" fill="#ffffff" font-size="72" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.03em">${escapedLine}</text>`;
  }).join("\n");

  const titleHeight = titleLines.length * titleLineHeight;
  const startDescY = startTitleY + titleHeight - 15;
  
  // Descripción: máximo 45 caracteres
  const descLines = splitTextIntoLines(cleanDesc, 45);
  const descLineHeight = 36;
  
  const descSvg = descLines.map((line, index) => {
    const yPos = startDescY + index * descLineHeight;
    const escapedLine = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<text x="80" y="${yPos}" fill="#a1a1aa" font-size="24" font-weight="500" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.01em" opacity="0.9">${escapedLine}</text>`;
  }).join("\n");

  const descHeight = descLines.length * descLineHeight;
  const badgeY = startDescY + descHeight + 10;
  
  const badgeSvg = `
    <g transform="translate(80, ${badgeY})">
      <rect x="0" y="0" width="240" height="38" rx="8" fill="rgba(202, 252, 0, 0.06)" stroke="rgba(202, 252, 0, 0.3)" stroke-width="1.5" />
      <text x="120" y="24" text-anchor="middle" fill="#CAFC00" font-size="14" font-weight="800" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">${count} RECURSOS CURADOS</text>
    </g>
  `;

  return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050505" />

  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="85%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#CAFC00" stop-opacity="0.08" />
      <stop offset="50%" stop-color="#CAFC00" stop-opacity="0.01" />
      <stop offset="100%" stop-color="#050505" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Marca de agua / Emoji gigante a la derecha -->
  <g transform="translate(900, 215)">
    <text x="0" y="100" text-anchor="middle" font-size="280" opacity="0.12" font-family="system-ui, -apple-system, sans-serif">${cleanEmoji}</text>
  </g>

  <!-- LADO IZQUIERDO -->
  
  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="130" height="30" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2" />
    <text x="65" y="19" text-anchor="middle" fill="#88888b" font-size="10" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.15em">CATEGORÍA</text>
  </g>

  ${titleSvg}
  ${descSvg}
  ${badgeSvg}

  <!-- Pie de página estilizado a la izquierda -->
  <g transform="translate(80, 550)">
    <circle cx="10" cy="0" r="10" fill="none" stroke="#CAFC00" stroke-width="3" opacity="0.8" />
    <circle cx="10" cy="0" r="3" fill="#CAFC00" />
    
    <text x="30" y="6" fill="#88888b" font-size="15" font-weight="700" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">ENLACES PARA</text>
    <text x="155" y="6" fill="#ffffff" font-size="15" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">DESARROLLADORES</text>
    <text x="350" y="6" fill="#52525b" font-size="13" font-weight="500" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">|  enlaces-para-desarrolladores.netlify.app</text>
  </g>
</svg>`;
}

/**
 * Parsea el archivo README.md para extraer las categorías y el conteo de enlaces
 */
function parseReadmeForCategories(content) {
  const lines = content.split('\n');
  const categories = [];
  let currentCategory = null;

  for (let line of lines) {
    line = line.trim();

    // Headers (### Category Name)
    if (line.startsWith('### ')) {
      if (currentCategory) {
        categories.push(currentCategory);
      }
      
      const rawName = line.replace(/^###\s+/, '').trim();
      
      let emoji = "📦";
      let title = "";
      let description = "";

      // Extraer lo que esté entre paréntesis como descripción
      const parenMatch = rawName.match(/\(([^)]+)\)/);
      if (parenMatch) {
        description = parenMatch[1].trim();
      }

      // Limpiar texto sin el paréntesis
      let mainText = rawName.replace(/\([^)]+\)/, "").trim();

      // Detectar emoji al inicio
      const emojiMatch = mainText.match(/^([\p{Emoji_Presentation}\p{Emoji}]+)\s*(.*)$/u);
      if (emojiMatch) {
        emoji = emojiMatch[1];
        title = emojiMatch[2].trim();
      } else {
        // Fallback por si falla el regex Unicode
        const firstChar = Array.from(mainText)[0];
        if (firstChar && !/[a-zA-Z0-9]/.test(firstChar)) {
          emoji = firstChar;
          title = Array.from(mainText).slice(1).join("").trim();
        } else {
          title = mainText;
        }
      }

      currentCategory = { rawName, title, emoji, description, linksCount: 0 };
    } 
    // Contar recursos por categoría
    else if (line.startsWith('-') && currentCategory) {
      const enrichedMatch = line.match(/^-\s+\[(.*?)\]\((https?:\/\/[^\s\)]+)\):\s*(.*)/);
      if (enrichedMatch) {
        currentCategory.linksCount++;
      } else {
        const urlRegex = /(https?:\/\/[^\s\)]+)/;
        if (urlRegex.test(line)) {
          currentCategory.linksCount++;
        }
      }
    }
  }

  if (currentCategory) {
    categories.push(currentCategory);
  }

  return categories;
}

async function run() {
  console.log("===============================================================");
  console.log("Iniciando generación automática de portadas OG WebP...");
  console.log("===============================================================");

  // --- PARTE 1: Portadas para Blog ---
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames.filter((fileName) => fileName.endsWith(".md"));

    console.log(`\n[Blog] Procesando ${posts.length} posts...`);
    for (const fileName of posts) {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);
      const title = data.title || "Artículo sin título";
      const category = data.category || "Recursos";

      const outputFilePath = path.join(postsOutputDirectory, `${slug}.webp`);

      if (fs.existsSync(outputFilePath)) {
        console.log(`  - Portada existente para: "${slug}" (omitido)`);
        continue;
      }

      console.log(`  - Generando portada para post: "${slug}"...`);
      const svgContent = generateSvgTemplate(title, category);

      try {
        await sharp(Buffer.from(svgContent))
          .webp({ quality: 85 })
          .toFile(outputFilePath);
        console.log(`    ✓ Guardada: /public/og/posts/${slug}.webp`);
      } catch (error) {
        console.error(`    ⨯ Error en post "${slug}":`, error);
      }
    }
  } else {
    console.log("\n[Blog] No se encontró el directorio de posts.");
  }

  // --- PARTE 2: Portadas para Categorías (README.md) ---
  if (fs.existsSync(readmePath)) {
    const readmeContent = fs.readFileSync(readmePath, "utf8");
    const categories = parseReadmeForCategories(readmeContent);

    console.log(`\n[Categorías] Procesando ${categories.length} categorías de README.md...`);
    for (const category of categories) {
      const slug = slugify(category.title);
      const outputFilePath = path.join(categoriesOutputDirectory, `${slug}.webp`);

      if (fs.existsSync(outputFilePath)) {
        console.log(`  - Portada existente para categoría: "${slug}" (omitido)`);
        continue;
      }

      console.log(`  - Generando portada para categoría: "${category.title}" (Emoji: ${category.emoji})...`);
      const svgContent = generateCategorySvgTemplate(
        category.title,
        category.emoji,
        category.description,
        category.linksCount
      );

      try {
        await sharp(Buffer.from(svgContent))
          .webp({ quality: 85 })
          .toFile(outputFilePath);
        console.log(`    ✓ Guardada: /public/og/${slug}.webp`);
      } catch (error) {
        console.error(`    ⨯ Error en categoría "${category.title}":`, error);
      }
    }
  } else {
    console.warn(`\n[Categorías] No se encontró README.md en la ruta: ${readmePath}`);
  }

  console.log("\n===============================================================");
  console.log("Generación automática de portadas OG WebP completada.");
  console.log("===============================================================");
}

run();
