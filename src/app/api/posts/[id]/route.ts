import { NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost, initDB } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();
    const { id } = await params;
    const body = await request.json();
    const post = await updatePost(id, body);
    return NextResponse.json({ post });
  } catch (error: unknown) {
    console.error('PUT /api/posts/[id] error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();
    const { id } = await params;
    await deletePost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
