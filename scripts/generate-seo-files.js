const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicPath = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

// Generate robots.txt
const robotsTxt = `# Happy Trails Tourism robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://happytrailstourism.com/sitemap.xml

# Crawl delay for heavy crawlers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10
`;

// Write robots.txt to public folder
fs.writeFileSync(path.join(publicPath, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt generated');

// For sitemap.xml, we need the tour data
// Since we can't directly import ES modules in CommonJS, we'll create a simpler sitemap
// that includes the main routes

// Generate sitemap.xml
const routes = [
  '',
  '/tours',
  '/tours/dubai',
  '/visas',
];

const baseUrl = 'https://happytrailstourism.com';
const date = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
</urlset>`;

// Write sitemap.xml to public folder
fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated');

console.log('SEO files generation complete'); 