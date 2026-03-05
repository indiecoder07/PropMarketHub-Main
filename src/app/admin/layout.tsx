import type { Metadata } from 'next';
import { PostsProvider } from '@/context/PostsContext';
import adminStyles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostsProvider>
      <section className={adminStyles.section}>
        <div className="container">{children}</div>
      </section>
    </PostsProvider>
  );
}
