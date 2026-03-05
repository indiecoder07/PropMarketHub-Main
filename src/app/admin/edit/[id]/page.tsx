'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/RichTextEditor/RichTextEditor';
import type { Post } from '@/lib/db';
import styles from '../../form.module.css';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }   = use(params);
  const router   = useRouter();
  const [saving,  setSaving]  = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title:            '',
    slug:             '',
    excerpt:          '',
    content:          '',
    cover_image:      '',
    published:        false,
    author:           'PropMarketHub',
    tags:             '',
    meta_title:       '',
    meta_description: '',
  });

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data: { post: Post }) => {
        const p = data.post;
        setForm({
          title:            p.title            || '',
          slug:             p.slug             || '',
          excerpt:          p.excerpt          || '',
          content:          p.content          || '',
          cover_image:      p.cover_image      || '',
          published:        p.published        || false,
          author:           p.author           || 'PropMarketHub',
          tags:             (p.tags || []).join(', '),
          meta_title:       p.meta_title       || '',
          meta_description: p.meta_description || '',
        });
      })
      .catch(() => alert('Failed to load post.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return alert('Title and slug are required.');
    setSaving(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.refresh(); // invalidate Next.js cache so dashboard sees updated post
        router.push('/admin');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update post.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error — check the browser console for details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.loadingText}>Loading post…</p>;

  return (
    <div>
      <h1 className={styles.heading}>Edit Post</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid2}>
          <div>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              className={styles.input}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Slug *</label>
            <input
              type="text"
              className={styles.input}
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>Excerpt</label>
          <textarea
            className={styles.textarea}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className={styles.label}>Content</label>
          <RichTextEditor
            content={form.content}
            onChange={(html: string) => setForm({ ...form, content: html })}
          />
        </div>

        <div className={styles.grid2}>
          <div>
            <label className={styles.label}>Cover Image URL</label>
            <input
              type="url"
              className={styles.input}
              value={form.cover_image}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.label}>Tags (comma-separated)</label>
            <input
              type="text"
              className={styles.input}
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div>
            <label className={styles.label}>SEO Title</label>
            <input
              type="text"
              className={styles.input}
              value={form.meta_title}
              onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.label}>SEO Description</label>
            <input
              type="text"
              className={styles.input}
              value={form.meta_description}
              onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>Author</label>
          <input
            type="text"
            className={styles.inputNarrow}
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
        </div>

        <div>
          <label
            className={`${styles.publishLabel} ${
              form.published ? styles.publishLabelActive : styles.publishLabelInactive
            }`}
          >
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            {form.published ? 'Published' : 'Draft'}
          </label>
        </div>

        <div className={styles.formFooter}>
          <button
            type="submit"
            disabled={saving}
            className={`${styles.submitBtn} ${saving ? styles.submitBtnDisabled : ''}`}
          >
            {saving ? 'Saving…' : 'Update Post'}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => router.push('/admin')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
