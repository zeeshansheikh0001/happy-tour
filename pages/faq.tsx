import React from 'react';
import { useRouter } from 'next/router';
import FAQ from '../components/FAQ';
import Header from '../components/Header';
import SEO from '../components/SEO';
import { faqs } from '../data/staticData';

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const FAQPage: React.FC = () => {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === 'tours') router.push('/');
    if (tab === 'activities') router.push('/activities');
    if (tab === 'visa') router.push('/?tab=visa');
  };

  const handleNavigate = (id: string) => {
    router.push(id === 'explore' ? '/' : `/?destination=${id}`);
  };

  return (
    <div>
      <SEO
        title="FAQs | Happy Trails Tourism"
        description="Answers about Happy Trails holidays, flight-inclusive packages, visas, customisation, and how a trip is confirmed."
        keywords="happy trails faq, holiday package questions, dubai tour booking, visa assistance, flight inclusive holidays"
        structuredData={[faqStructuredData]}
      />
      <Header
        activeTab="tours"
        onTabChange={handleTabChange}
        onNavigate={handleNavigate}
      />
      <FAQ />
    </div>
  );
};

export default FAQPage;
