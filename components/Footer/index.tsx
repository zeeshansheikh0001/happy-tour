import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image 
            src="/images/happyTrails-logo.png"
            alt="Happy Trails"
            width={200}
            height={30}
            className={styles.logo}
          />
        </div>
        
        <div className={styles.socialLinks}>
          <Link href="https://www.facebook.com/profile.php?id=61575506399505" target="_blank" className={styles.socialIcon}>
            <FaFacebookF />
          </Link>
          <Link href="https://www.instagram.com/happytrailstourism/" target="_blank" className={styles.socialIcon}>
            <FaInstagram />
          </Link>
          <Link href="https://twitter.com/happyTrails" target="_blank" className={styles.socialIcon}>
            <FaTwitter />
          </Link>
          <Link href="https://linkedin.com/company/happyTrails" target="_blank" className={styles.socialIcon}>
            <FaLinkedinIn />
          </Link>
          <Link href="https://youtube.com/happyTrails" target="_blank" className={styles.socialIcon}>
            <FaYoutube />
          </Link>
        </div>
        
        <div className={styles.copyright}>
          © 2025   HappyTrails.com All rights reserved.
        </div>
        
        <div className={styles.disclaimer}>
          The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is
          intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
        </div>
        <div className={styles.madeWithLoveContainer}>
          <span className={styles.madeWithLove}>Made with </span>❤️
        </div>
      </div>
    </footer>
  );
};

export default Footer; 