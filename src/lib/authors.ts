/**
 * Author configuration for blog posts.
 * Keyed by the author name string stored in the blog_posts table.
 */

export interface Author {
  name: string;
  role: string;
  bio: string;
  url: string;
  /** Optional absolute URL to author avatar (displayed in AuthorBio) */
  image?: string;
}

export const AUTHORS: Record<string, Author> = {
  PropMarketHub: {
    name: 'PropMarketHub',
    role: 'Property Research Team',
    bio: 'The PropMarketHub research team combines expertise in Australian property markets, data analysis, and financial planning to deliver actionable investment insights for property investors across NSW and beyond.',
    url: 'https://propmarkethub.com.au/about',
  },
  'Mayank Ghosh': {
    name: 'Mayank Ghosh',
    role: 'Property Data Analyst',
    bio: 'Mayank specialises in property data analysis and suburb scoring methodologies, helping investors identify high-yield opportunities across New South Wales.',
    url: 'https://propmarkethub.com.au/about',
  },
};

/**
 * Retrieve author config by name, falling back to the PropMarketHub team profile.
 */
export function getAuthor(name: string): Author {
  return AUTHORS[name] ?? AUTHORS['PropMarketHub'];
}
