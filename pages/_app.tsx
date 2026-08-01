import type { AppProps } from 'next/app';

import ErrorBoundary from '@components/ErrorBoundary';
import Layout from '@components/Layout';
import { CurrencyProvider } from '../context/CurrencyContext';

import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ErrorBoundary>
        <CurrencyProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CurrencyProvider>
    </ErrorBoundary>
);

export default MyApp;
