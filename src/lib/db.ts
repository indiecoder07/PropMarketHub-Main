import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  author: string;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  /** Content category for filtering on the blog index (e.g. "Suburbs", "Finance", "Investing") */
  category: string | null;
  /** Human-readable read time shown in post byline (e.g. "5 min read") */
  read_time: string | null;
  /** FAQ items stored as JSONB array: [{ question: string, answer: string }] */
  faqs: { question: string; answer: string }[] | null;
}

// Initialize blog_posts table + add new columns if they don't exist (idempotent)
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      published BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      author TEXT NOT NULL DEFAULT 'PropMarketHub',
      tags TEXT[] DEFAULT '{}',
      meta_title TEXT,
      meta_description TEXT
    )
  `;

  // Idempotent migrations — safe to run on every cold start
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS read_time TEXT`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS faqs JSONB`;
}

export async function getAllPosts(publishedOnly = true): Promise<Post[]> {
  if (publishedOnly) {
    const rows = await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC`;
    return rows as Post[];
  }
  const rows = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
  return rows as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
  return (rows[0] as Post) || null;
}

export async function getPostById(id: string): Promise<Post | null> {
  const rows = await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`;
  return (rows[0] as Post) || null;
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  published?: boolean;
  author?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  category?: string;
  read_time?: string;
  faqs?: { question: string; answer: string }[];
}): Promise<Post> {
  const rows = await sql`
    INSERT INTO blog_posts (
      title, slug, excerpt, content, cover_image, published,
      author, tags, meta_title, meta_description,
      category, read_time, faqs
    )
    VALUES (
      ${data.title},
      ${data.slug},
      ${data.excerpt},
      ${data.content},
      ${data.cover_image || null},
      ${data.published || false},
      ${data.author || 'PropMarketHub'},
      ${data.tags || []},
      ${data.meta_title || null},
      ${data.meta_description || null},
      ${data.category || null},
      ${data.read_time || null},
      ${data.faqs ? JSON.stringify(data.faqs) : null}
    )
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function updatePost(id: string, data: Partial<Omit<Post, 'id' | 'created_at'>>): Promise<Post> {
  const rows = await sql`
    UPDATE blog_posts SET
      title            = COALESCE(${data.title            ?? null}, title),
      slug             = COALESCE(${data.slug             ?? null}, slug),
      excerpt          = COALESCE(${data.excerpt          ?? null}, excerpt),
      content          = COALESCE(${data.content          ?? null}, content),
      cover_image      = COALESCE(${data.cover_image      ?? null}, cover_image),
      published        = COALESCE(${data.published        ?? null}, published),
      author           = COALESCE(${data.author           ?? null}, author),
      tags             = COALESCE(${data.tags             ?? null}, tags),
      meta_title       = COALESCE(${data.meta_title       ?? null}, meta_title),
      meta_description = COALESCE(${data.meta_description ?? null}, meta_description),
      category         = COALESCE(${data.category         ?? null}, category),
      read_time        = COALESCE(${data.read_time        ?? null}, read_time),
      faqs             = COALESCE(${data.faqs ? JSON.stringify(data.faqs) : null}, faqs),
      updated_at       = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function deletePost(id: string): Promise<void> {
  await sql`DELETE FROM blog_posts WHERE id = ${id}`;
}
