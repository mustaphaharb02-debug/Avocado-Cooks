/**
 * Where the login page is allowed to send you afterwards.
 *
 * /admin remembers the page you were heading for and returns you there
 * once you sign in, and that destination comes out of the URL. A path
 * beginning with "//" (or "/\\") is a protocol-relative URL, which the
 * browser reads as a *different website* — so a redirect built from one
 * would land the admin on someone else's page the moment their password
 * was accepted.
 *
 * Today's routes cannot produce such a path: "//anything" does not match
 * /admin/*, so RequireAdmin never stores it. This function keeps that
 * true on purpose rather than by accident, because the alternative is a
 * routing change quietly turning the login page into an open redirect.
 * (React Router 6.x carries an advisory for exactly this shape:
 * GHSA-2j2x-hqr9-3h42.)
 *
 * Anything that is not a plain in-site path falls back to /admin.
 */
export function safeRedirectPath(value, fallback = '/admin') {
  const path = typeof value === 'string' ? value.trim() : ''

  if (!path.startsWith('/')) return fallback
  if (path.startsWith('//') || path.startsWith('/\\')) return fallback

  return path
}
