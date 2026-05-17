const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const readmePath = path.join(__dirname, '..', 'README.md');
const content = fs.readFileSync(readmePath, 'utf8');

// Regex para extraer URLs
const urlRegex = /(https?:\/\/[^\s\)]+)/g;
const links = content.match(urlRegex) || [];

// Limpiar duplicados
const uniqueLinks = [...new Set(links)];

console.log(`Encontrados ${uniqueLinks.length} enlaces únicos. Empezando validación...`);

async function checkLink(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
            },
            signal: AbortSignal.timeout(15000)
        });

        if (response.ok) {
            return { url, ok: true };
        } else {
            return { url, ok: false, status: response.status };
        }
    } catch (err) {
        return { 
            url, 
            ok: false, 
            error: err.name === 'TimeoutError' ? 'Timeout' : err.message 
        };
    }
}

async function run() {
    const brokenLinks = [];
    
    // Procesar en batches de 5 para no saturar
    const batchSize = 10;
    for (let i = 0; i < uniqueLinks.length; i += batchSize) {
        const batch = uniqueLinks.slice(i, i + batchSize);
        console.log(`Checking batch ${Math.floor(i/batchSize) + 1}...`);
        const results = await Promise.all(batch.map(checkLink));
        
        results.forEach(res => {
            if (!res.ok) {
                console.log(`ERROR: ${res.url} (${res.status || res.error})`);
                brokenLinks.push(res);
            }
        });
    }

    if (brokenLinks.length > 0) {
        console.log(`\n Se encontraron ${brokenLinks.length} enlaces rotos.`);
        fs.writeFileSync('broken_links.json', JSON.stringify(brokenLinks, null, 2));
        process.exit(1); // Error para que GitHub Actions detecte fallo
    } else {
        console.log('\n Todos los enlaces están ok.');
    }
}

run();
