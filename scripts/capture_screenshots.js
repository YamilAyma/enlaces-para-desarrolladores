const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const resources = [
  { name: 'snapframe', url: 'https://github.com/Pawandeep-prog/Snapframe' },
  { name: 'githubdaily', url: 'https://github.com/GitHubDaily/GitHubDaily' },
  { name: 'sleek_design', url: 'https://sleek.design/references' },
  { name: 'leaf', url: 'https://github.com/RivoLink/leaf' },
  { name: 'mafl', url: 'https://github.com/hywax/mafl' },
  { name: 'lawnicons', url: 'https://github.com/LawnchairLauncher/lawnicons' },
  { name: 'megapattern', url: 'https://tools.madebyvishesh.com/megapattern/' },
  { name: 'ossium_live', url: 'https://ossium.live/' },
  { name: 'docker_android', url: 'https://github.com/budtmo/docker-android' },
  { name: 'pdfcraft', url: 'https://github.com/PDFCraftTool/pdfcraft' },
  { name: 'cli_anything', url: 'https://github.com/HKUDS/CLI-Anything' },
  { name: 'it_tools', url: 'https://github.com/CorentinTh/it-tools' },
  { name: 'stirling_pdf', url: 'https://github.com/Stirling-Tools/Stirling-PDF' }
];

const screenshotsDir = path.join(process.cwd(), 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  for (const resource of resources) {
    const filename = `${resource.name}.png`;
    const filepath = path.join(screenshotsDir, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${resource.name}, already exists.`);
      continue;
    }

    console.log(`Capturing ${resource.name} (${resource.url})...`);
    const page = await context.newPage();
    try {
      await page.goto(resource.url, { waitUntil: 'networkidle', timeout: 30000 });
      // Wait a bit for animations/rendering
      await page.waitForTimeout(2000);
      await page.screenshot({ path: filepath });
      console.log(`Successfully saved to ${filename}`);
    } catch (error) {
      console.error(`Failed to capture ${resource.name}: ${error.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('All captures finished!');
})();
