/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy /suburb-scorecard/* to the Vite app's Vercel deployment
  async rewrites() {
    const scorecardUrl =
      process.env.SUBURB_SCORECARD_URL || 'https://suburb-scorecard.vercel.app';

    return [
      {
        source: '/suburb-scorecard',
        destination: `${scorecardUrl}/suburb-scorecard`,
      },
      {
        source: '/suburb-scorecard/:path*',
        destination: `${scorecardUrl}/suburb-scorecard/:path*`,
      },
      // Also proxy suburb detail and other scorecard routes
      {
        source: '/suburb/:path*',
        destination: `${scorecardUrl}/suburb/:path*`,
      },
      {
        source: '/region/:path*',
        destination: `${scorecardUrl}/region/:path*`,
      },
      {
        source: '/methodology',
        destination: `${scorecardUrl}/methodology`,
      },
      {
        source: '/top-10-nsw-investment-suburbs',
        destination: `${scorecardUrl}/top-10-nsw-investment-suburbs`,
      },
      {
        source: '/compare',
        destination: `${scorecardUrl}/compare`,
      },
      {
        source: '/faq',
        destination: `${scorecardUrl}/faq`,
      },
    ];
  },

  // Allow external images (for blog cover images)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
