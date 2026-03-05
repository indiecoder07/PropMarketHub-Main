'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { usePosts } from '@/context/PostsContext';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  const { posts, loading, deletePost, togglePublish, fetchPosts } = usePosts();

  // Refetch every time the dashboard mounts — layout persists so context
  // doesn't auto-refetch when returning from /admin/new or /admin/edit
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.heading}>Blog Admin</h1>
          <p className={styles.subheading}>Manage your blog posts</p>
        </div>
        <Link href="/admin/new" className={styles.newPostBtn}>
          + New Post
        </Link>
      </div>

      {loading ? (
        <p className={styles.loadingText}>Loading posts…</p>
      ) : posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No posts yet</p>
          <p className={styles.emptyText}>Create your first blog post to get started.</p>
          <Link href="/admin/new" className={styles.emptyBtn}>
            Create First Post
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Date</th>
                <th className={`${styles.th} ${styles.thRight}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.postTitle}>{post.title}</span>
                    {post.tags && post.tags.length > 0 && (
                      <div className={styles.tagRow}>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className={styles.td}>
                    <button
                      onClick={() => togglePublish(post)}
                      className={`${styles.statusBtn} ${post.published ? styles.statusPublished : styles.statusDraft}`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>

                  <td className={`${styles.td} ${styles.dateText}`}>
                    {formatDate(post.created_at)}
                  </td>

                  <td className={`${styles.td} ${styles.tdRight}`}>
                    <div className={styles.actions}>
                      <Link href={`/blog/${post.slug}`} target="_blank" className={styles.viewLink}>
                        View
                      </Link>
                      <Link href={`/admin/edit/${post.id}`} className={styles.editLink}>
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(post.id, post.title)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
