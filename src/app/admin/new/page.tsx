'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/RichTextEditor/RichTextEditor';
import styles from '../form.module.css';

export default function NewPostPage() {
  const router  = useRouter();
  const [saving, setSaving] = useState(false);
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
    category:         '',
    read_time:        '',
    faqs:             '',
  });

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === autoSlug(prev.title) || prev.slug === '' ? autoSlug(title) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return alert('Title and slug are required.');

    // Validate FAQs JSON if provided
    let parsedFaqs = null;
    if (form.faqs.trim()) {
      try {
        parsedFaqs = JSON.parse(form.faqs);
        if (!Array.isArray(parsedFaqs)) throw new Error('FAQs must be a JSON array.');
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return alert(`Invalid FAQs JSON: ${msg}`);
      }
    }

    setSaving(true);
    try {
      const res = await fetch('/api/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags:     form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          category: form.category.trim() || null,
          read_time: form.read_time.trim() || null,
          faqs:     parsedFaqs,
        }),
      });
      if (res.ok) {
        router.refresh();
        router.push('/admin');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create post.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error — check the browser console for details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>New Blog Post</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid2}>
          <div>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              className={styles.input}
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Best suburbs to invest in NSW 2026"
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
              placeholder="best-suburbs-invest-nsw-2026"
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
            placeholder="A short summary that appears on the blog listing page…"
          />
        </div>

        <div>
          <label className={styles.label}>Content</label>
          <RichTextEditor
            content={form.content}
            onChange={(html: string) => setForm({ ...form, content: html })}
            placeholder="Write your blog post here…"
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
              placeholder="https://images.unsplash.com/…"
            />
          </div>
          <div>
            <label className={styles.label}>Tags (comma-separated)</label>
            <input
              type="text"
              className={styles.input}
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="NSW, Investment, Suburbs"
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div>
            <label className={styles.label}>Category</label>
            <input
              type="text"
              className={styles.input}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Suburbs, Finance, Investing, Buying"
            />
          </div>
          <div>
            <label className={styles.label}>Read Time</label>
            <input
              type="text"
              className={styles.input}
              value={form.read_time}
              onChange={(e) => setForm({ ...form, read_time: e.target.value })}
              placeholder="e.g. 5 min read"
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div>
            <label className={styles.label}>SEO Title (optional)</label>
            <input
              type="text"
              className={styles.input}
              value={form.meta_title}
              onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
              placeholder="Override the page title for search engines"
            />
          </div>
          <div>
            <label className={styles.label}>SEO Description (optional)</label>
            <input
              type="text"
              className={styles.input}
              value={form.meta_description}
              onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
              placeholder="Override the meta description for search engines"
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>
            FAQs (JSON array — optional)
          </label>
          <textarea
            className={styles.textareaCode}
            value={form.faqs}
            rows={6}
            onChange={(e) => setForm({ ...form, faqs: e.target.value })}
            placeholder={`[
  { "question": "What is rental yield?", "answer": "Rental yield is the annual rental income as a percentage of the property's purchase price." }
]`}
          />
          <p className={styles.hint}>Enter a valid JSON array of {`{ question, answer }`} objects. Leave blank if no FAQs.</p>
        </div>

        <div>
          <label className={styles.label}>Author</label>
          <select
            className={styles.select}
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          >
            <option value="PropMarketHub">PropMarketHub (links to /about)</option>
            <option value="Mayank Ghosh">Mayank Ghosh (links to /mayank-ghosh)</option>
          </select>
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
            {form.published ? 'Publish immediately' : 'Save as draft'}
          </label>
        </div>

        <div className={styles.formFooter}>
          <button
            type="submit"
            disabled={saving}
            className={`${styles.submitBtn} ${saving ? styles.submitBtnDisabled : ''}`}
          >
            {saving ? 'Saving…' : form.published ? 'Publish Post' : 'Save Draft'}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => router.push('/admin')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
