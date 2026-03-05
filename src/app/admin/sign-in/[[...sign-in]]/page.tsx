'use client';

import { SignIn } from '@clerk/nextjs';
import { BRAND } from '@/lib/theme';
import styles from './page.module.css';

export default function AdminSignInPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.label}>PropMarketHub Admin</p>
        <SignIn
          appearance={{
            variables: {
              colorPrimary: BRAND.colorPrimary,
              colorText:    BRAND.colorText,
              borderRadius: BRAND.borderRadius,
            },
          }}
        />
      </div>
    </div>
  );
}
