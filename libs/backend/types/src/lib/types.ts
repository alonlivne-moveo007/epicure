/** Shared API response shape (used by backend and frontend) */
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}
