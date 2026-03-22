/**
 * Shared JSON envelope for HTTP responses from the Nest API and Next.js routes.
 *
 * - `data` – Successful payload (e.g. Strapi collection response or a domain object).
 * - `message` – Optional human-readable success or informational text.
 * - `error` – Optional error summary when the handler returns a structured error body.
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}
