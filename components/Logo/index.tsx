import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <div className={styles.logo__content}>
          <span className={styles.logo__text}>HappyTrails</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo; 