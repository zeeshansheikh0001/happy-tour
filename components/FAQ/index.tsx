import React, { useEffect, useState } from 'react';
import { faqs as defaultFaqs } from '../../data/staticData';
import { FaqItem } from '../../types/staticData';
import SectionHeading from '../SectionHeading';
import styles from './FAQ.module.scss';

interface FAQProps {
  items?: FaqItem[];
  title?: string;
  description?: string;
  sectionId?: string;
  headingId?: string;
  compact?: boolean;
}

const FAQ: React.FC<FAQProps> = ({
  items = defaultFaqs,
  title = 'Your questions, answered',
  description,
  sectionId = 'faqs',
  headingId = 'faq-heading',
  compact = false,
}) => {
  const [openId, setOpenId] = useState('');

  useEffect(() => {
    setOpenId('');
  }, [items]);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section
      className={`${styles.section} ${compact ? styles.compact : ''}`}
      id={sectionId}
      aria-labelledby={headingId}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="Questions"
            icon="question"
            title={title}
            titleId={headingId}
            description={description || 'Holidays, activities, visas, and how a trip is confirmed.'}
            className={styles.faqHeading}
          />
        </div>

        <div className={styles.list}>
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  type="button"
                  id={buttonId}
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <ChevronIcon />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={styles.answer}
                >
                  <div className={styles.answerInner}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function ChevronIcon() {
  return (
    <svg className={styles.chevron} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default FAQ;
