import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  keywords?: string;
  structuredData?: Record<string, any>[];
  language?: string;
  author?: string;
  publishedAt?: string;
  modifiedAt?: string;
  noIndex?: boolean;
  alternateUrls?: {[lang: string]: string};
}

const SITE_URL = 'https://happytrailstourism.com';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';
const SAME_AS = [
  'https://www.instagram.com/happytrailstourism/',
  'https://www.facebook.com/profile.php?id=61575506399505',
  'https://twitter.com/happyTrails',
  'https://linkedin.com/company/happyTrails',
];

function canonicalFor(asPath: string) {
  const [rawPath, rawQuery = ''] = asPath.split('#')[0].split('?');
  const path = rawPath || '/';
  const params = new URLSearchParams(rawQuery);
  const destination = params.get('destination');
  const tab = params.get('tab');
  const location = params.get('location');
  const category = params.get('category');

  if (path === '/') {
    if (tab === 'activities') return `${SITE_URL}/activities`;
    if (tab === 'visa') return `${SITE_URL}/?tab=visa`;
    if (destination) return `${SITE_URL}/?destination=${encodeURIComponent(destination)}`;
    return SITE_URL;
  }

  const kept = new URLSearchParams();
  if (location) kept.set('location', location);
  if (category) kept.set('category', category);
  const query = kept.toString();
  return `${SITE_URL}${path}${query ? `?${query}` : ''}`;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'Dubai skyline',
  keywords = 'travel, tours, activities, holiday, vacation packages, dubai tours, vietnam tours, ladakh packages',
  structuredData = [],
  language = 'en',
  author = 'Happy Trails Tourism',
  publishedAt,
  modifiedAt,
  noIndex = false,
  alternateUrls = {},
}) => {
  const router = useRouter();
  
  // Format the title to include the brand name
  const formattedTitle = title.includes('Happy Trails') ? title : `${title} | Happy Trails Tourism`;
  const finalCanonicalUrl = canonicalUrl || canonicalFor(router.asPath);
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  
  // Generate organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Happy Trails Tourism',
    url: SITE_URL,
    sameAs: SAME_AS,
  };
  
  // Generate website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Happy Trails Tourism',
    url: SITE_URL,
  };
  
  // Combine with any custom structured data
  const allStructuredData = [organizationSchema, websiteSchema, ...structuredData];
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta httpEquiv="Content-Language" content={language} />
      
      {/* Robots Directives */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Alternate Language URLs */}
      {Object.entries(alternateUrls).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {Object.keys(alternateUrls).length > 0 && (
        <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Happy Trails Tourism" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : `${language}_${language.toUpperCase()}`} />
      
      {/* Publication and Modification dates for articles */}
      {publishedAt && ogType === 'article' && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {modifiedAt && ogType === 'article' && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@happyTrails" />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
};

export default SEO; 