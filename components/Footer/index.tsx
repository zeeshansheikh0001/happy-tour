import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { holidayDestinations, trustSocialLinks } from '../../data/staticData';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image
              src="/images/happyTrails-logo.png"
              alt="Happy Trails"
              width={200}
              height={30}
              className={styles.logo}
            />
            <p className={styles.brandText}>
              Holidays, activities, and visa help — planned with you, confirmed by the team.
            </p>
            <Link href="/customize?source=plan-trip" className={styles.planLink}>
              Request a plan
            </Link>
          </div>

          <nav className={styles.column} aria-label="Destinations">
            <h2 className={styles.heading}>Destinations</h2>
            {holidayDestinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/?destination=${destination.id}`}
                className={styles.link}
              >
                {destination.name}
              </Link>
            ))}
          </nav>

          <nav className={styles.column} aria-label="Explore">
            <h2 className={styles.heading}>Explore</h2>
            <Link href="/" className={styles.link}>Holidays</Link>
            <Link href="/activities" className={styles.link}>Activities</Link>
            <Link href="/activities?category=cruises" className={styles.link}>Yacht & Cruise</Link>
            <Link href="/?tab=visa" className={styles.link}>Visas</Link>
            <Link href="/faq" className={styles.link}>FAQs</Link>
          </nav>

          <nav className={styles.column} aria-label="Plan">
            <h2 className={styles.heading}>Plan</h2>
            <Link href="/#how-it-works" className={styles.link}>How it works</Link>
            <Link href="/#featured-holidays" className={styles.link}>Featured holidays</Link>
            <Link href="/faq#faqs" className={styles.link}>Cancellation & policies</Link>
            <a
              href={trustSocialLinks.find((link) => link.id === 'instagram')?.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className={styles.socialLinks}>
          <Link href="https://www.facebook.com/profile.php?id=61575506399505" target="_blank" className={styles.socialIcon} aria-label="Facebook">
            <FaFacebookF />
          </Link>
          <Link href="https://www.instagram.com/happytrailstourism/" target="_blank" className={styles.socialIcon} aria-label="Instagram">
            <FaInstagram />
          </Link>
          <Link href="https://twitter.com/happyTrails" target="_blank" className={styles.socialIcon} aria-label="Twitter">
            <FaTwitter />
          </Link>
          <Link href="https://linkedin.com/company/happyTrails" target="_blank" className={styles.socialIcon} aria-label="LinkedIn">
            <FaLinkedinIn />
          </Link>
          <Link href="https://youtube.com/happyTrails" target="_blank" className={styles.socialIcon} aria-label="YouTube">
            <FaYoutube />
          </Link>
        </div>

        <div className={styles.copyright}>
          © 2026 HappyTrails.com All rights reserved.
        </div>

        <div className={styles.disclaimer}>
          The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is
          intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
