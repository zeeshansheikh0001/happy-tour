/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import { figtree } from '../styles/font';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    
    render() {
        return (
            <Html lang="en" className={`${figtree.variable} ${figtree.className}`}>
                <Head>
                    {/* Google Analytics */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GSF4NSZF80"></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-GSF4NSZF80');
                            `
                        }}
                    />
                    
                    {/* Preconnect to domains */}
                    <link rel="preconnect" href="https://www.google-analytics.com" />
                    
                    {/* Favicon */}
                    <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
                    <link rel="icon" href="/favicons/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                    <link rel="manifest" href="/favicons/site.webmanifest" />
                    <meta name="theme-color" content="#FF7A00" />
                    
                    {/* DNS Prefetch for Performance */}
                    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                    <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                    
                    {/* Mobile Web App meta tags */}
                    <meta name="application-name" content="Happy Trails Tourism" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                    <meta name="apple-mobile-web-app-title" content="Happy Trails Tourism" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    
                    {/* Core Web Vitals optimization hints */}
                    <link rel="preload" as="image" href="/images/logo.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
