import React from 'react';
import { useRouter } from 'next/router';
import CustomizePackage from '../components/CustomizePackage';
import SEO from '../components/SEO';
import { EnquirySource } from '../lib/customize/model';

const SOURCES: EnquirySource[] = ['package-card', 'package-detail', 'plan-trip'];

const CustomizePage: React.FC = () => {
    const router = useRouter();

    const sourceQuery = Array.isArray(router.query.source)
        ? router.query.source[0]
        : router.query.source;
    const packageQuery = Array.isArray(router.query.package)
        ? router.query.package[0]
        : router.query.package;
    const idQuery = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    const destinationQuery = Array.isArray(router.query.destination)
        ? router.query.destination[0]
        : router.query.destination;
    const interestQuery = Array.isArray(router.query.interest)
        ? router.query.interest[0]
        : router.query.interest;
    const source = SOURCES.includes(sourceQuery as EnquirySource)
        ? (sourceQuery as EnquirySource)
        : packageQuery || idQuery
        ? 'package-detail'
        : 'plan-trip';

    return (
        <>
            <SEO
                title="Customize your package"
                description="Tell us the destination, dates, and preferences. No payment now. The team reviews the enquiry and shares a quote."
            />
            {router.isReady ? (
                <CustomizePackage
                    source={source}
                    packageQuery={packageQuery}
                    idQuery={idQuery}
                    destinationQuery={destinationQuery}
                    interestQuery={interestQuery}
                />
            ) : (
                <p style={{ padding: '32px var(--page-gutter)' }}>Loading...</p>
            )}
        </>
    );
};

export default CustomizePage;
