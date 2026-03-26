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

/**
 * Strip YAML frontmatter from blog post content.
 * Guards against posts that were imported with markdown frontmatter (--- ... ---)
 * not being stripped before storage. Content is expected to be HTML.
 */
export function stripYamlFrontmatter(content: string): string {
  if (!content) return content;
  // Match YAML block: optional leading whitespace, opening ---, any content, closing ---
  return content.replace(/^\s*---[\s\S]*?---\s*/m, '');
}
