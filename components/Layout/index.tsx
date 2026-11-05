import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Footer from '../Footer';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const bare = router.pathname === '/customize';

    return (
        <div className={styles.layout}>
            <main className={styles.main}>{children}</main>
            {bare ? null : <Footer />}
        </div>
    );
};

export default Layout;
