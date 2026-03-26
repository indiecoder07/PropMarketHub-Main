/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Security headers ────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // CSP in report-only mode — observe violations before enforcing
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://clerk.propmarkethub.com.au https://*.clerk.accounts.dev",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://clerk.propmarkethub.com.au https://*.clerk.accounts.dev https://vitals.vercel-insights.com",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },

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
