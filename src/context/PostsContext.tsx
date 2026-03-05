'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Post } from '@/lib/db';

interface PostsContextValue {
  posts: Post[];
  loading: boolean;
  fetchPosts: () => void;
  deletePost: (id: string, title: string) => Promise<void>;
  togglePublish: (post: Post) => Promise<void>;
}

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const deletePost = useCallback(async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const togglePublish = useCallback(async (post: Post) => {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    });
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p))
      );
    }
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, fetchPosts, deletePost, togglePublish }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts(): PostsContextValue {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used inside <PostsProvider>');
  return ctx;
}
