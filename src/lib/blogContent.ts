/**
 * Blog content processing utilities.
 * The blog uses PostgreSQL + TipTap HTML content (not MDX files).
 * All utilities operate on raw HTML strings.
 */

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Sanitize blog post HTML content:
 * - Strips raw YAML frontmatter (--- ... ---) at top
 * - Strips TipTap-encoded frontmatter (<p>---</p> paragraph blocks)
 * - Strips duplicate leading <h1> tags (post title already rendered in page header)
 * - Strips visible "SEO Tags:" blocks at end of content
 */
export function sanitizePostContent(html: string): string {
  if (!html) return html;
  let content = html;

  // 1. Strip raw YAML frontmatter block at top (--- ... ---)
  content = content.replace(/^\s*---[\s\S]*?---\s*/m, '');

  // 2. Strip TipTap-encoded frontmatter: consecutive <p>---</p> lines wrapping key: value paragraphs
  content = content.replace(/<p>\s*-{3}\s*<\/p>[\s\S]*?<p>\s*-{3}\s*<\/p>\s*/i, '');

  // 3. Strip leading duplicate <h1> — post title is already shown in the page layout
  content = content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');

  // 4. Strip visible "SEO Tags:" blocks (various patterns)
  // Pattern A: <p>SEO Tags: ...</p> inline paragraph
  content = content.replace(/<p>\s*SEO\s+[Tt]ags?\s*:[\s\S]*?<\/p>/gi, '');
  // Pattern B: <h2>SEO Tags</h2> followed by remaining content (at end of post)
  content = content.replace(/<h[1-6][^>]*>\s*SEO\s+[Tt]ags?\s*<\/h[1-6]>[\s\S]*/gi, '');
  // Pattern C: plain-text "SEO Tags:" lines (if content leaked as text)
  content = content.replace(/\n?SEO\s+[Tt]ags?\s*:[^\n]*$/gim, '');

  return content.trim();
}

/**
 * Convert a heading string to a slug-style id.
 * e.g. "How to Calculate Rental Yield?" → "how-to-calculate-rental-yield"
 */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Inject `id` attributes into H2 elements so TOC anchor links work.
 * Safe to run on TipTap-generated HTML — only adds id if not already present.
 */
export function injectHeadingIds(html: string): string {
  if (!html) return html;
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, inner) => {
    if (/\bid=/.test(attrs)) return match; // already has id
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugifyHeading(text);
    if (!id) return match;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
}

/**
 * Extract H2 and H3 headings from HTML for Table of Contents rendering.
 * Returns array of { id, text, level } in document order.
 */
export function extractHeadings(html: string): Heading[] {
  if (!html) return [];
  const headings: Heading[] = [];
  const regex = /<h([23])([^>]*)>([\s\S]*?)<\/h[23]>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const attrs = match[2];
    const inner = match[3];
    const text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text) continue;
    const idMatch = attrs.match(/\bid="([^"]+)"/);
    const id = idMatch ? idMatch[1] : slugifyHeading(text);
    if (id) headings.push({ id, text, level });
  }
  return headings;
}

/**
 * Tool keyword → calculator mapping for ToolCTA injection.
 * Matched against post tags + title (case-insensitive).
 */
export const TAG_TO_TOOL: Record<
  string,
  { label: string; href: string; description: string }
> = {
  mortgage: {
    label: 'Mortgage Calculator',
    href: '/mortgage-calculator',
    description:
      'Calculate monthly repayments, total interest costs, and compare different loan scenarios side by side.',
  },
  'rental yield': {
    label: 'Rental Yield Calculator',
    href: '/rental-yield-calculator',
    description:
      'Instantly calculate gross and net rental yield for any investment property in Australia.',
  },
  'cash flow': {
    label: 'Cash Flow Calculator',
    href: '/cash-flow-calculator',
    description:
      'Model weekly and annual cash flow including all rental property income and expenses.',
  },
  'stamp duty': {
    label: 'Stamp Duty Calculator',
    href: '/stamp-duty-calculator',
    description:
      'Calculate exact NSW stamp duty costs for your purchase price, property type, and buyer category.',
  },
  'borrowing power': {
    label: 'Borrowing Power Calculator',
    href: '/borrowing-power-calculator',
    description:
      'Estimate how much you can borrow from Australian lenders based on your income and expenses.',
  },
  investment: {
    label: 'Property Investment Calculator',
    href: '/property-investment-calculator',
    description:
      'Model long-term returns, equity growth, and total investment performance for any property.',
  },
  'first home': {
    label: 'First Home Buyer Calculator',
    href: '/first-home-buyer-calculator',
    description:
      'See all grants, stamp duty concessions, and deposit requirements available to first home buyers.',
  },
  suburb: {
    label: 'Suburb Scorecard',
    href: '/suburb-scorecard',
    description:
      'Compare investment scores for 488 NSW suburbs — rental yield, vacancy rate, population growth and more.',
  },
  'negative gearing': {
    label: 'Negative Gearing Calculator',
    href: '/negative-gearing-calculator',
    description:
      'Calculate your tax deductions and annual tax saving from a negatively geared investment property.',
  },
};

/**
 * Return the best matching tool CTA for a post given its tags and title.
 * Checks each keyword in priority order; returns first match or null.
 */
export function getToolCTAForPost(
  tags: string[],
  title: string
): { label: string; href: string; description: string } | null {
  const haystack = [...tags, title].join(' ').toLowerCase();
  for (const [keyword, tool] of Object.entries(TAG_TO_TOOL)) {
    if (haystack.includes(keyword)) return tool;
  }
  return null;
}
