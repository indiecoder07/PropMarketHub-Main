/**
 * Author configuration for blog posts.
 * Keyed by the author name string stored in the blog_posts table.
 */

export interface Author {
  name: string;
  role: string;
  bio: string;
  /** Short one-liner for byline/card contexts */
  shortBio: string;
  url: string;
  /** Absolute URL to author avatar */
  image?: string;
  /** Company / agency */
  affiliation?: string;
  /** Schema.org sameAs URLs */
  sameAs?: string[];
  /** Area of expertise for structured data */
  expertise?: string[];
}

export const AUTHORS: Record<string, Author> = {
  PropMarketHub: {
    name: 'PropMarketHub',
    role: 'Property Research Team',
    shortBio: 'Data-driven property investment research for Australian investors.',
    bio: 'The PropMarketHub research team combines expertise in Australian property markets, data analysis, and financial planning to deliver actionable investment insights for property investors across NSW and beyond.',
    url: 'https://propmarkethub.com.au/about',
    expertise: ['Property Investment', 'Suburb Analysis', 'Market Research', 'NSW Real Estate'],
  },

  'Mayank Ghosh': {
    name: 'Mayank Ghosh',
    role: 'Licensed Real Estate & Buyer\'s Agent',
    affiliation: 'Blue Hill Real Estate',
    shortBio: 'Licensed buyer\'s agent & real estate agent at Blue Hill Real Estate, specialising in NSW property investment.',
    bio: `Mayank Ghosh is a licensed real estate agent and buyer's agent with Blue Hill Real Estate, specialising in the NSW property market. With professional roots in financial services and technology, he applies rigorous market analysis to every property decision — going beyond gut feel to deliver suburb-level intelligence that buyers and investors can act on with confidence.

Mayank works with a diverse range of clients across Greater Sydney and regional NSW — from first-home buyers taking their first step onto the property ladder, to homeowners looking to upgrade or rightsize, to seasoned investors identifying high-potential opportunities in emerging growth corridors and undervalued markets before they hit the mainstream radar.

Where most agents rely on intuition, Mayank brings genuine data discipline to the table — analysing suburb trends, yield potential, demographic shifts, and supply-demand dynamics to build a clear property case for every client he works with.`,
    url: 'https://propmarkethub.com.au/mayank-ghosh',
    image: '/authors/mayank-ghosh.jpg',
    expertise: [
      'Buyer\'s Agency',
      'NSW Property Investment',
      'Suburb Analysis',
      'First Home Buyers',
      'Investment Strategy',
      'Greater Sydney',
    ],
  },
};

/**
 * Retrieve author config by name, falling back to the PropMarketHub team profile.
 */
export function getAuthor(name: string): Author {
  return AUTHORS[name] ?? AUTHORS['PropMarketHub'];
}
