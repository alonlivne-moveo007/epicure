/**
 * Resolves the Nest BFF base URL for **server-only** use (Server Components, Route Handlers).
 *
 * Mirrors the backend’s separation of concerns: the browser must not rely on internal Docker
 * hostnames. In `docker-compose`, set `BFF_INTERNAL_URL=http://backend:3002` on the frontend
 * service so `fetch` from Next reaches Nest. Local `nx serve` typically uses
 * `NEXT_PUBLIC_API_URL` or `http://localhost:3002`.
 *
 * Nest applies the global `/api` prefix (`apps/backend/src/main.ts`); callers append paths such
 * as `/api/homepage`.
 *
 * Local template: `apps/frontend/example.env` → copy to `.env.local` if you need non-default URLs.
 */
export function getBffBaseUrl(): string {
  return (
    process.env.BFF_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:3002'
  );
}
