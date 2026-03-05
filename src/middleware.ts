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
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
