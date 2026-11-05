import type { AppProps } from 'next/app';

import ErrorBoundary from '@components/ErrorBoundary';
import Layout from '@components/Layout';
import { CurrencyProvider } from '../context/CurrencyContext';
import { figtree } from '../styles/font';

import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <div className={`${figtree.variable} ${figtree.className} appFont`}>
        <ErrorBoundary>
            <CurrencyProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CurrencyProvider>
        </ErrorBoundary>
    </div>
);

export default MyApp;
