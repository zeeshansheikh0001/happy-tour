import React from 'react';
import Icon3D from '../Icon3D';
import SectionHeading from '../SectionHeading';
import styles from './VisaTeaser.module.scss';

interface VisaTeaserProps {
    destinationId?: string;
}

const VisaTeaser: React.FC<VisaTeaserProps> = ({ destinationId }) => {
    if (destinationId && destinationId !== 'dubai' && destinationId !== 'vietnam') {
        return null;
    }

    const text =
        destinationId === 'dubai'
            ? 'Visa help is available for Dubai holidays. Government visa fees are paid separately.'
            : destinationId === 'vietnam'
            ? 'Visa help is available for Vietnam holidays. Government visa fees are paid separately.'
            : 'Visa help is for Dubai and Vietnam holidays. India trips usually do not need a tourist visa for Indian passports. Fees are paid separately.';

    const photo =
        destinationId === 'dubai'
            ? 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80'
            : destinationId === 'vietnam'
            ? 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?auto=format&fit=crop&w=1600&q=80'
            : 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80';

    return (
        <section className={styles.section} id="visa-help" aria-labelledby="visa-teaser-heading">
            <div className={styles.inner} style={{ backgroundImage: `url(${photo})` }}>
                <SectionHeading
                    title="Need help with a tourist visa?"
                    titleId="visa-teaser-heading"
                    description={text}
                    action={{ href: '/?tab=visa', label: 'View visa help' }}
                    tone="inverse"
                    className={styles.visaHeading}
                />
            </div>
        </section>
    );
};

export default VisaTeaser;
