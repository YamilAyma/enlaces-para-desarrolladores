import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const readmePath = path.join(rootDir, 'README.md');

// Colores ANSI para la consola
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';

function printHelp() {
    console.log(`
${BOLD}${CYAN}🔍 Buscador de Enlaces en Lote para README.md${RESET}

Uso:
  ${BOLD}node scripts/search-links.mjs <url1> [url2] [url3]...${RESET}
  ${BOLD}node scripts/search-links.mjs <archivo.json>${RESET} (Debe ser un array de strings)
  ${BOLD}node scripts/search-links.mjs <archivo.txt>${RESET} (Un enlace por línea)

Ejemplos:
  node scripts/search-links.mjs https://github.com/anthropics/knowledge-work-plugins
  node scripts/search-links.mjs links.json
`);
}

function normalizeUrl(url) {
    try {
        // Normaliza eliminando barras al final, pasándolo a minúsculas y quitando protocolo para una búsqueda más difusa
        let clean = url.trim().toLowerCase();
        clean = clean.replace(/^(https?:\/\/)?(www\.)?/, '');
        clean = clean.replace(/\/$/, ''); // eliminar barra al final
        return clean;
    } catch {
        return url.trim().toLowerCase();
    }
}

function searchLinks() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        printHelp();
        return;
    }

    if (!fs.existsSync(readmePath)) {
        console.error(`${RED}Error: No se encontró el archivo README.md en ${readmePath}${RESET}`);
        process.exit(1);
    }

    let linksToSearch = [];

    // Comprobar si el primer argumento es un archivo que existe
    const firstArg = args[0];
    if (args.length === 1 && fs.existsSync(firstArg)) {
        const ext = path.extname(firstArg).toLowerCase();
        const content = fs.readFileSync(firstArg, 'utf-8');
        if (ext === '.json') {
            try {
                const parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                    linksToSearch = parsed;
                } else {
                    console.error(`${RED}Error: El archivo JSON debe contener un array de URLs.${RESET}`);
                    process.exit(1);
                }
            } catch (err) {
                console.error(`${RED}Error al parsear el archivo JSON: ${err.message}${RESET}`);
                process.exit(1);
            }
        } else {
            // Archivo de texto: una URL por línea
            linksToSearch = content
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0 && !line.startsWith('#'));
        }
    } else {
        linksToSearch = args;
    }

    if (linksToSearch.length === 0) {
        console.error(`${RED}Error: No se proporcionaron URLs para buscar.${RESET}`);
        process.exit(1);
    }

    const readmeContent = fs.readFileSync(readmePath, 'utf-8');
    const lines = readmeContent.split('\n');

    console.log(`\n${BOLD}${CYAN}Buscando ${linksToSearch.length} recurso(s) en README.md...${RESET}\n`);

    let duplicatesFound = 0;
    let newResources = [];

    linksToSearch.forEach((url) => {
        const normalized = normalizeUrl(url);
        if (!normalized) return;

        let found = false;
        let foundLineNumber = -1;
        let foundContent = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Búsqueda de coincidencia difusa en la línea
            if (line.toLowerCase().includes(normalized)) {
                found = true;
                foundLineNumber = i + 1;
                foundContent = line.trim();
                break;
            }
        }

        if (found) {
            duplicatesFound++;
            console.log(`[${RED}DUPLICADO${RESET}] ${BOLD}${url}${RESET}`);
            console.log(`  └ Línea ${YELLOW}${foundLineNumber}${RESET}: ${CYAN}${foundContent}${RESET}\n`);
        } else {
            newResources.push(url);
            console.log(`[${GREEN}NUEVO${RESET}] ${BOLD}${url}${RESET} - No existe en el archivo.\n`);
        }
    });

    console.log(`${BOLD}==================================================${RESET}`);
    console.log(`${BOLD}Resumen de la búsqueda:${RESET}`);
    console.log(`- Total buscados: ${BOLD}${linksToSearch.length}${RESET}`);
    console.log(`- Duplicados encontrados: ${RED}${BOLD}${duplicatesFound}${RESET}`);
    console.log(`- Nuevos recursos (libres): ${GREEN}${BOLD}${newResources.length}${RESET}`);
    console.log(`${BOLD}==================================================${RESET}\n`);

    if (newResources.length > 0) {
        console.log(`${GREEN}Puedes agregar estos ${newResources.length} nuevos recursos tranquilamente.${RESET}`);
    }
}

searchLinks();
