import fs from 'fs';
import path from 'path';

// Colores ANSI
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';

async function fetchUrlContent() {
    const url = process.argv[2];

    if (!url) {
        console.log(`
${BOLD}${CYAN}📖 Lector de Sitios Web Optimizado para IA${RESET}

Uso:
  ${BOLD}node scripts/fetch-reader.mjs <url>${RESET}

Ejemplo:
  node scripts/fetch-reader.mjs https://github.com/anthropics/knowledge-work-plugins
`);
        return;
    }

    console.log(`\n${CYAN}⏳ Extrayendo contenido limpio de:${RESET} ${BOLD}${url}${RESET}...`);

    try {
        const jinaUrl = `https://r.jina.ai/${url}`;
        const response = await fetch(jinaUrl, {
            headers: {
                'Accept': 'text/plain'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        
        // Mostrar los primeros 1000 caracteres de vista previa en consola de forma bonita
        console.log(`\n${GREEN}✔ Contenido extraído con éxito! Vista previa (primeros 1000 caracteres):${RESET}\n`);
        console.log(`${BOLD}--------------------------------------------------${RESET}`);
        console.log(text.slice(0, 1000));
        console.log(`${BOLD}--------------------------------------------------${RESET}`);
        console.log(`\n${YELLOW}💡 Nota: Contenido completo disponible en memoria/contexto.${RESET}\n`);

        return text;
    } catch (err) {
        console.error(`\n${RED}❌ Error al extraer contenido:${RESET} ${err.message}`);
        process.exit(1);
    }
}

fetchUrlContent();
