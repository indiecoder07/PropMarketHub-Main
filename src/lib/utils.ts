import slugify from 'slugify';

export function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true, trim: true });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}
