import React, { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  holidayDestinations,
  visaDestinations,
  visaDocuments,
  visaFaqs,
  visaHelpSteps,
  visaHeroSlides,
} from '../../data/staticData';
import DatePicker from '../DatePicker';
import FAQ from '../FAQ';
import Icon3D from '../Icon3D';
import SectionHeading from '../SectionHeading';
import styles from './Visa.module.scss';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  destination: string;
  travelDate: string;
  visaType: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = {
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  destination: '',
  travelDate: '',
  visaType: 'Tourist',
  message: '',
};

const HERO_SLIDE_MS = 5500;

const Visa: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const indiaCard = holidayDestinations.find((destination) => destination.id === 'ladakh');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % visaHeroSlides.length);
    }, HERO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Enter a valid email';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.nationality.trim()) errors.nationality = 'Nationality is required';
    if (!formData.destination) errors.destination = 'Choose a destination';
    if (!formData.travelDate) errors.travelDate = 'Travel date is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
  };

  const chooseDestination = (id: string) => {
    setFormData((prev) => ({ ...prev, destination: id }));
    setFormErrors((prev) => ({ ...prev, destination: undefined }));
    document.getElementById('visa-request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="visa-heading">
        <div className={styles.heroSlides} aria-hidden="true">
          {visaHeroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.heroSlide} ${index === heroIndex ? styles.heroSlideActive : ''}`}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100vw"
                className={styles.heroImage}
                unoptimized
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className={styles.heroInner}>
          <SectionHeading
            as="h1"
            align="center"
            tone="inverse"
            eyebrow="Visas"
            icon="passport"
            title="Visa help for the trip you are planning"
            titleId="visa-heading"
            description="Happy Trails helps with tourist visas for Dubai and Vietnam. India holidays usually do not need a tourist visa for Indian passports. This is a request — you do not pay here."
            action={{ href: '#visa-request', label: 'Request visa help' }}
          />
          <div className={styles.heroActions}>
            <a href="#visa-destinations" className={styles.ghostCta}>
              See destinations
            </a>
          </div>
          <div className={styles.heroDots} role="tablist" aria-label="Destination slides">
            {visaHeroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-label={`${slide.name}, ${slide.country}`}
                aria-selected={index === heroIndex}
                className={`${styles.heroDot} ${index === heroIndex ? styles.heroDotActive : ''}`}
                onClick={() => setHeroIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        id="visa-destinations"
        aria-labelledby="visa-destinations-heading"
      >
        <div className={styles.inner}>
          <SectionHeading
            eyebrow="Destinations"
            icon="map"
            title="Where we help"
            titleId="visa-destinations-heading"
            description="Visa help is for Dubai and Vietnam. Ladakh, Kashmir, and North East India trips usually do not need a tourist visa for Indian passports."
          />

          <div className={styles.destGrid}>
            {visaDestinations.map((destination) => (
              <article key={destination.id} className={styles.destCard}>
                <button
                  type="button"
                  className={styles.destMedia}
                  onClick={() => chooseDestination(destination.id)}
                >
                  <Image
                    src={destination.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className={styles.destImage}
                    unoptimized
                  />
                  <span className={styles.destShade} />
                  <span className={styles.destCopy}>
                    <span className={styles.destName}>{destination.name}</span>
                    <span className={styles.destCountry}>{destination.country}</span>
                  </span>
                </button>
                <p className={styles.destNote}>{destination.note}</p>
                <div className={styles.destActions}>
                  <button
                    type="button"
                    className={styles.textButton}
                    onClick={() => chooseDestination(destination.id)}
                  >
                    Request help
                  </button>
                  <Link href={`/?destination=${destination.id}`} className={styles.textLink}>
                    View holidays
                  </Link>
                </div>
              </article>
            ))}
            {indiaCard && (
              <article className={styles.destCard}>
                <Link href={`/?destination=${indiaCard.id}`} className={styles.destMedia}>
                  <Image
                    src={indiaCard.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className={styles.destImage}
                    unoptimized
                  />
                  <span className={styles.destShade} />
                  <span className={styles.destCopy}>
                    <span className={styles.destName}>India</span>
                    <span className={styles.destCountry}>Ladakh, Kashmir & North East</span>
                  </span>
                </Link>
                <p className={styles.destNote}>
                  Usually no tourist visa for Indian passports. Open the destination to see holidays.
                </p>
                <div className={styles.destActions}>
                  <Link href={`/?destination=${indiaCard.id}`} className={styles.textLink}>
                    View holidays
                  </Link>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className={styles.sand} aria-labelledby="visa-steps-heading">
        <div className={styles.inner}>
          <SectionHeading
            eyebrow="How it works"
            icon="clipboard"
            title="From enquiry to a confirmed filing"
            titleId="visa-steps-heading"
            description="The team checks what the destination asks for. Approval is always with the immigration authority."
          />

          <ol className={styles.steps}>
            {visaHelpSteps.map((step, index) => (
              <li key={step.id} className={styles.step}>
                <span className={styles.stepIndex}>0{index + 1}</span>
                <div className={styles.cardHeading}>
                  <Icon3D name={step.icon} alt="" size={28} />
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="visa-docs-heading">
        <div className={styles.inner}>
          <SectionHeading
            eyebrow="Documents"
            icon="clipboard"
            title="What is usually asked"
            titleId="visa-docs-heading"
            description="Exact papers change by nationality and destination. Use this as a starting list, not a final checklist."
          />

          <ul className={styles.docGrid}>
            {visaDocuments.map((item) => (
              <li key={item.id} className={styles.docCard}>
                <div className={styles.cardHeading}>
                  <Icon3D name={item.icon} alt="" size={28} />
                  <h3 className={styles.docTitle}>{item.title}</h3>
                </div>
                <p className={styles.docText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.noteBand} aria-labelledby="visa-fees-heading">
        <div className={styles.noteInner}>
          <div>
            <SectionHeading
              eyebrow="Fees"
              icon="clipboard"
              title="Fees stay separate"
              titleId="visa-fees-heading"
              description="Government visa fees, portal charges, and any embassy appointment costs are paid to those authorities. Happy Trails confirms the amount after the enquiry. Requirements and processing windows change — the team checks the current rule before you file."
            />
          </div>
        </div>
      </section>

      <section className={`${styles.sand} ${styles.request}`} id="visa-request" aria-labelledby="visa-request-heading">
        <div className={styles.formWrap}>
          {submitted ? (
            <div className={styles.success} role="status">
              <SectionHeading
                eyebrow="Visa"
                icon="passport"
                title="Request received"
                description="The team will confirm documents, government fees, and a processing window. There is no payment on this form."
              />
              <button
                type="button"
                className={styles.primaryCta}
                onClick={() => {
                  setSubmitted(false);
                  setFormData(EMPTY_FORM);
                }}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <SectionHeading
                eyebrow="Start here"
                icon="passport"
                title="Request visa help"
                titleId="visa-request-heading"
                description="No payment now. Share who is travelling and where. The team replies with next steps."
              />

              <div className={styles.fields}>
                <label className={styles.field}>
                  <span>Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Name as in the passport"
                    aria-invalid={Boolean(formErrors.fullName)}
                  />
                  {formErrors.fullName && <em>{formErrors.fullName}</em>}
                </label>

                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@email.com"
                    aria-invalid={Boolean(formErrors.email)}
                  />
                  {formErrors.email && <em>{formErrors.email}</em>}
                </label>

                <label className={styles.field}>
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="Mobile number"
                    aria-invalid={Boolean(formErrors.phone)}
                  />
                  {formErrors.phone && <em>{formErrors.phone}</em>}
                </label>

                <label className={styles.field}>
                  <span>Nationality</span>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    autoComplete="country-name"
                    placeholder="As in the passport"
                    aria-invalid={Boolean(formErrors.nationality)}
                  />
                  {formErrors.nationality && <em>{formErrors.nationality}</em>}
                </label>

                <label className={styles.field}>
                  <span>Destination</span>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    data-empty={!formData.destination || undefined}
                    aria-invalid={Boolean(formErrors.destination)}
                  >
                    <option value="">Where to?</option>
                    {visaDestinations.map((destination) => (
                      <option key={destination.id} value={destination.id}>
                        {destination.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.destination && <em>{formErrors.destination}</em>}
                </label>

                <label className={styles.field}>
                  <span>Visa type</span>
                  <select name="visaType" value={formData.visaType} onChange={handleChange}>
                    <option value="Tourist">Tourist</option>
                    <option value="Transit">Transit</option>
                    <option value="Business">Business</option>
                  </select>
                </label>

                <div className={`${styles.field} ${styles.wide}`}>
                  <span id="visa-travel-date-label">Travel date</span>
                  <DatePicker
                    value={formData.travelDate}
                    labelledBy="visa-travel-date-label"
                    invalid={Boolean(formErrors.travelDate)}
                    onChange={(travelDate) => {
                      setFormData((prev) => ({ ...prev, travelDate }));
                      if (travelDate) {
                        setFormErrors((prev) => ({ ...prev, travelDate: undefined }));
                      }
                    }}
                  />
                  {formErrors.travelDate && <em>{formErrors.travelDate}</em>}
                </div>

                <label className={`${styles.field} ${styles.wide}`}>
                  <span>Anything the team should know</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Travel companions, a holiday already in mind, or a previous refusal"
                  />
                </label>
              </div>

              <button type="submit" className={styles.primaryCta}>
                Request visa help
                <Icon3D name="arrow" alt="" size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      <FAQ
        items={visaFaqs}
        title="Visa questions"
        description="Answers about destinations we help with, documents, fees, and what happens after you send a request."
        sectionId="visa-faqs"
        headingId="visa-faq-heading"
        compact
      />
    </div>
  );
};

export default Visa;
