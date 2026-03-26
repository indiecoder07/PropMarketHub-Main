import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes that require authentication
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// Auth routes — must be excluded from protection or they loop forever
// (Clerk redirects to sign-in → middleware protects sign-in → infinite loop)
const isAuthRoute = createRouteMatcher([
  '/admin/sign-in(.*)',
  '/admin/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req) && !isAuthRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  // Only run Clerk middleware on /admin routes and API routes.
  // Keeping Clerk off public pages prevents the __clerk_db_jwt header
  // from leaking into crawler requests and avoids dev-browser warnings
  // in external audit tools.
  matcher: [
    '/admin(.*)',
    '/(api|trpc)(.*)',
  ],
};
