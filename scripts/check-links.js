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
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const request = client.get(url, { 
            timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Link Checker Bot)' } 
        }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ url, ok: true });
            } else {
                resolve({ url, ok: false, status: res.statusCode });
            }
        });

        request.on('error', (err) => {
            resolve({ url, ok: false, error: err.message });
        });

        request.on('timeout', () => {
            request.destroy();
            resolve({ url, ok: false, error: 'Timeout' });
        });
    });
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
