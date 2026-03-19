import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const readmePath = path.join(rootDir, 'README.md');
const outputPath = path.join(rootDir, 'web', 'public', 'llms.txt');

function generateLlmsTxt() {
    if (!fs.existsSync(readmePath)) {
        console.error('README.md not found');
        return;
    }

    const content = fs.readFileSync(readmePath, 'utf-8');
    const lines = content.split('\n');

    let llmsContent = '# Enlaces para Desarrolladores\n\n';
    llmsContent += '> Una colección curada de cientos de recursos, herramientas y bibliotecas para potenciar tu desarrollo.\n\n';
    llmsContent += 'Este archivo proporciona un mapa de recursos optimizado para asistentes de IA y LLMs. Contiene categorías que van desde IA y Packs hasta Cursos e Inspiración.\n\n';

    let currentCategory = '';
    const categoryRegex = /^###\s+(.*)/;
    const linkRegex = /^-\s+\[(.*?)\]\((https?:\/\/[^\s\)]+)\):\s*(.*)/;

    for (let line of lines) {
        line = line.trim();

        const catMatch = line.match(categoryRegex);
        if (catMatch) {
            currentCategory = catMatch[1].trim();
            llmsContent += `## ${currentCategory}\n\n`;
            continue;
        }

        const linkMatch = line.match(linkRegex);
        if (linkMatch && currentCategory) {
            const [, title, url, description] = linkMatch;
            llmsContent += `- [${title}](${url}): ${description}\n`;
        }
    }

    // Add optional section as per spec
    llmsContent += '\n## Optional\n\n';
    llmsContent += '- [Sitio Web](https://enlaces-para-desarrolladores.netlify.app): Versión interactiva con búsqueda y filtros.\n';
    llmsContent += '- [GitHub Repository](https://github.com/YamilAyma/enlaces-para-desarrolladores): Código fuente y contribuciones.\n';
    llmsContent += '- [Author](https://github.com/YamilAyma): Autor del repositorio como proyecto - Ingeniería de Software con IA, Automatización Digital.\n';

    fs.writeFileSync(outputPath, llmsContent);
    console.log(`llms.txt generated successfully at ${outputPath}`);
}

generateLlmsTxt();
