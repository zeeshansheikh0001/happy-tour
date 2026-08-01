import React, { ReactNode } from 'react';
import Footer from '../Footer';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 