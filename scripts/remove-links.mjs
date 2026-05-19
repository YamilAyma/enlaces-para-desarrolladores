import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener rutas de directorio del módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de rutas predeterminadas
const README_PATH = path.join(__dirname, '../README.md');
const JSON_INPUT_PATH = path.join(__dirname, 'urls_to_remove.json');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  bold: '\x1b[1m'
};

/**
 * Normaliza una URL para comparaciones tolerantes a protocolo, www y barra diagonal final
 * @param {string} urlStr 
 * @returns {string}
 */
function normalizeUrl(urlStr) {
  if (!urlStr) return '';
  let clean = urlStr.trim().toLowerCase();
  
  // Remover protocolos http/https
  clean = clean.replace(/^https?:\/\//i, '');
  
  // Remover www.
  clean = clean.replace(/^www\./i, '');
  
  // Remover barra diagonal final si existe
  clean = clean.replace(/\/$/, '');
  
  return clean;
}

/**
 * Intenta extraer URLs contenidas entre paréntesis `(...)` en un enlace Markdown de la línea
 * @param {string} line 
 * @returns {string[]}
 */
function extractMarkdownUrls(line) {
  // Regex para capturar el contenido del paréntesis en enlaces Markdown [text](url)
  const regex = /\[.*?\]\((.*?)\)/g;
  const urls = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function main() {
  console.log(`${colors.cyan}${colors.bold}🧹 Iniciando Script de Limpieza Quirúrgica de Enlaces...${colors.reset}\n`);

  const args = process.argv.slice(2);
  let targetFile = README_PATH;
  let urlsToRemove = [];

  // Parsear argumentos opcionales
  let testMode = false;
  const commandUrls = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--test') {
      testMode = true;
      targetFile = path.join(__dirname, 'README.test.md');
    } else if (args[i] === '--file' && args[i + 1]) {
      targetFile = path.resolve(args[i + 1]);
      i++;
    } else if (!args[i].startsWith('--')) {
      commandUrls.push(args[i]);
    }
  }

  // 1. Obtener URLs del archivo JSON si existe
  if (fs.existsSync(JSON_INPUT_PATH)) {
    try {
      const jsonData = fs.readFileSync(JSON_INPUT_PATH, 'utf8');
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        urlsToRemove = urlsToRemove.concat(parsed);
        console.log(`${colors.green}ℹ️ Se cargaron ${parsed.length} URLs desde ${JSON_INPUT_PATH}${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️ Advertencia: El archivo JSON no tiene un formato de array de strings.${colors.reset}`);
      }
    } catch (error) {
      console.log(`${colors.red}❌ Error al leer o parsear ${JSON_INPUT_PATH}: ${error.message}${colors.reset}`);
    }
  }

  // 2. Combinar con URLs suministradas directamente como argumentos
  if (commandUrls.length > 0) {
    urlsToRemove = urlsToRemove.concat(commandUrls);
    console.log(`${colors.green}ℹ️ Se cargaron ${commandUrls.length} URLs desde argumentos de consola.${colors.reset}`);
  }

  // Eliminar duplicados en la lista de entrada y filtrar vacíos
  urlsToRemove = [...new Set(urlsToRemove.map(u => u.trim()))].filter(Boolean);

  if (urlsToRemove.length === 0) {
    console.log(`${colors.red}${colors.bold}❌ Error: No se suministraron URLs para eliminar.${colors.reset}`);
    console.log(`\nUso del script:`);
    console.log(`  1. Crea un archivo JSON en: scripts/urls_to_remove.json con formato: ["url1", "url2"]`);
    console.log(`  2. O pásalas como argumentos directos: node scripts/remove-links.mjs "https://ejemplo.com"`);
    console.log(`  3. Agrega la bandera --test si deseas trabajar sobre el entorno de prueba simulado.\n`);
    process.exit(1);
  }

  console.log(`${colors.cyan}🎯 Total de URLs únicas a procesar: ${urlsToRemove.length}${colors.reset}`);
  console.log(`${colors.cyan}📂 Archivo objetivo: ${targetFile}${colors.reset}\n`);

  if (!fs.existsSync(targetFile)) {
    console.log(`${colors.red}❌ Error: El archivo objetivo no existe en la ruta: ${targetFile}${colors.reset}`);
    process.exit(1);
  }

  // Leer y procesar el archivo objetivo
  const fileContent = fs.readFileSync(targetFile, 'utf8');
  const lines = fileContent.split(/\r?\n/);
  const newLines = [];

  const removedUrls = new Map(); // url -> { lineNum, lineContent }
  const normalizedUrlsToRemoveMap = new Map(); // normalizedUrl -> originalUrl

  urlsToRemove.forEach(url => {
    normalizedUrlsToRemoveMap.set(normalizeUrl(url), url);
  });

  let linesProcessed = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const extractedUrls = extractMarkdownUrls(line);
    let shouldRemoveLine = false;
    let matchedOriginalUrl = null;

    // Verificar si alguna URL de la línea coincide con las URLs a eliminar
    for (const extUrl of extractedUrls) {
      const normalizedExt = normalizeUrl(extUrl);
      if (normalizedUrlsToRemoveMap.has(normalizedExt)) {
        shouldRemoveLine = true;
        matchedOriginalUrl = normalizedUrlsToRemoveMap.get(normalizedExt);
        break;
      }
    }

    // Como salvaguarda adicional, si no es una línea vacía y no fue capturada por la regex anterior,
    // comprobamos si contiene la URL de manera explícita (para URLs sueltas o formatos no estándar)
    if (!shouldRemoveLine && line.trim().startsWith('- [')) {
      for (const [normUrl, origUrl] of normalizedUrlsToRemoveMap.entries()) {
        if (normalizeUrl(line).includes(normUrl)) {
          shouldRemoveLine = true;
          matchedOriginalUrl = origUrl;
          break;
        }
      }
    }

    if (shouldRemoveLine) {
      removedUrls.set(matchedOriginalUrl, {
        lineNum: i + 1,
        content: line.trim()
      });
    } else {
      newLines.push(line);
    }
    linesProcessed++;
  }

  // Guardar cambios si hubo eliminaciones
  if (removedUrls.size > 0) {
    fs.writeFileSync(targetFile, newLines.join('\n'), 'utf8');
    console.log(`${colors.green}${colors.bold}✅ Archivo actualizado exitosamente con las eliminaciones quirúrgicas.${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}⚠️ No se encontró ninguna coincidencia en el archivo. No se realizaron cambios.${colors.reset}\n`);
  }

  // ==========================================
  // GENERAR REPORTE DETALLADO DE EJECUCIÓN
  // ==========================================
  console.log(`${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}                 📊 REPORTE DE LIMPIEZA DE ENLACES              ${colors.reset}`);
  console.log(`${colors.cyan}================================================================${colors.reset}`);

  console.log(`\n${colors.green}${colors.bold}🟢 ENLACES ELIMINADOS EXITOSAMENTE (${removedUrls.size}):${colors.reset}`);
  if (removedUrls.size > 0) {
    removedUrls.forEach((info, url) => {
      console.log(`  - ${colors.green}ELIMINADO:${colors.reset} ${url}`);
      console.log(`    ${colors.bold}Línea:${colors.reset} ${info.lineNum}`);
      console.log(`    ${colors.bold}Entrada original:${colors.reset} ${info.content}`);
      console.log();
    });
  } else {
    console.log(`  Ninguno.`);
  }

  const notFoundUrls = urlsToRemove.filter(url => !removedUrls.has(url));
  console.log(`\n${colors.red}${colors.bold}🔴 ENLACES NO ENCONTRADOS EN EL ARCHIVO (${notFoundUrls.length}):${colors.reset}`);
  if (notFoundUrls.length > 0) {
    notFoundUrls.forEach(url => {
      console.log(`  - ${colors.red}NO ENCONTRADO:${colors.reset} ${url}`);
    });
  } else {
    console.log(`  Todos los enlaces suministrados fueron procesados y eliminados.`);
  }

  console.log(`\n${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.cyan}Líneas procesadas en total: ${linesProcessed} | Estado final: Completado.${colors.reset}`);
}

main().catch(err => {
  console.error(`${colors.red}❌ Error crítico durante la ejecución: ${err.message}${colors.reset}`);
  process.exit(1);
});
