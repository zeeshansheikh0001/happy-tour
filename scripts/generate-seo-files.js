const fs = require('fs');
const path = require('path');

const publicPath = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

const robotsTxt = `# Happy Trails Tourism robots.txt
User-agent: *
Allow: /

Sitemap: https://happytrailstourism.com/sitemap.xml
`;

fs.writeFileSync(path.join(publicPath, 'robots.txt'), robotsTxt);
console.log('robots.txt generated');

const baseUrl = 'https://happytrailstourism.com';
const date = new Date().toISOString().split('T')[0];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const source = fs.readFileSync(path.join(process.cwd(), 'data/staticData.ts'), 'utf8');
const toursStart = source.indexOf('export const tours');
const toursEnd = source.indexOf('const isOffFocusTour');
const toursBlock = source.slice(toursStart, toursEnd);
const titles = [...toursBlock.matchAll(/^ {4}title: '([^']+)',?$/gm)].map((match) => match[1]);
const offFocus = /thailand|bangkok|phuket|krabi|pattaya|bali/i;
const tourPaths = titles
  .filter((title) => !offFocus.test(title))
  .map((title) => `/tours/${slugify(title)}`);

const destinations = ['dubai', 'vietnam', 'ladakh', 'kashmir', 'north-east-india'];

const urls = [
  { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
  ...destinations.map((id) => ({
    loc: `${baseUrl}/?destination=${id}`,
    priority: '0.9',
    changefreq: 'weekly',
  })),
  { loc: `${baseUrl}/activities`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${baseUrl}/activities?category=cruises`, priority: '0.7', changefreq: 'weekly' },
  { loc: `${baseUrl}/activities?category=events`, priority: '0.7', changefreq: 'weekly' },
  { loc: `${baseUrl}/tours/dubai`, priority: '0.8', changefreq: 'weekly' },
  ...tourPaths.map((tourPath) => ({
    loc: `${baseUrl}${tourPath}`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  { loc: `${baseUrl}/faq`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${baseUrl}/customize`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${baseUrl}/?tab=visa`, priority: '0.6', changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml generated (${urls.length} urls, ${tourPaths.length} tours)`);
