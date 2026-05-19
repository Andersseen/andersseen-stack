import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE_URL = 'https://andersseen-stack.pages.dev';

const routes = [
  '/',
  '/volt-ui',
  '/quartz',
  '/angular-movement',
  '/lumen-icons',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(process.cwd(), 'dist/client/sitemap.xml');
writeFileSync(outPath, sitemap, 'utf-8');
console.log(`Sitemap written to ${outPath}`);
