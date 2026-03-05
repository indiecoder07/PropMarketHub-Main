'use client';

import { SignUp } from '@clerk/nextjs';
import { BRAND } from '@/lib/theme';
import styles from '../../sign-in/[[...sign-in]]/page.module.css';

export default function AdminSignUpPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.label}>PropMarketHub Admin</p>
        <SignUp
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
