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

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/og-default.jpg',
  ogImageAlt = 'Happy Trails Tourism',
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
  
  // Default canonical URL is the current page URL
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`
    : `https://happytrailstourism.com${router.asPath}`;
  
  const finalCanonicalUrl = canonicalUrl || currentUrl;
  
  // Generate organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Happy Trails Tourism',
    url: 'https://happytrailstourism.com',
    logo: 'https://happytrailstourism.com/images/logo.png',
    sameAs: [
      'https://facebook.com/happytrailstourism',
      'https://instagram.com/happytrailstourism',
      'https://twitter.com/happytrailstour'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1234567890',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi']
    }
  };
  
  // Generate website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Happy Trails Tourism',
    url: 'https://happytrailstourism.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://happytrailstourism.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  
  // Combine with any custom structured data
  const allStructuredData = [organizationSchema, websiteSchema, ...structuredData];
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content={author} />
      <meta httpEquiv="Content-Language" content={language} />
      <meta charSet="utf-8" />
      
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
      
      {/* Default language */}
      <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `https://happytrailstourism.com${ogImage}`} />
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
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `https://happytrailstourism.com${ogImage}`} />
      <meta name="twitter:site" content="@happytrailstour" />
      
      {/* Mobile App Tags */}
      <meta name="apple-itunes-app" content="app-id=myAppStoreID" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Web App Capability */}
      <meta name="theme-color" content="#FF7A00" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Happy Trails Tourism" />
      
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