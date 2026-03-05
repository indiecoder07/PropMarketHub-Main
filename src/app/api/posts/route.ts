import { NextResponse } from 'next/server';
import { getAllPosts, createPost, initDB } from '@/lib/db';

export async function GET() {
  try {
    await initDB();
    const posts = await getAllPosts(false);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts', posts: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const post = await createPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || '',
      content: body.content || '',
      cover_image: body.cover_image || undefined,
      published: body.published || false,
      author: body.author || 'PropMarketHub',
      tags: body.tags || [],
      meta_title: body.meta_title || undefined,
      meta_description: body.meta_description || undefined,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/posts error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create post';
    if (message.includes('unique') || message.includes('duplicate')) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
