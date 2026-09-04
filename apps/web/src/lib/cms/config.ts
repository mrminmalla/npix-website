/**
 * Base URL for the NPIX backend API. Server-only (used from Server
 * Components / route handlers) — the public site never calls the API
 * directly from the browser, so this is intentionally not a
 * NEXT_PUBLIC_* variable. Defaults to the local dev port; in Docker,
 * this is overridden to the internal service hostname (e.g. http://api:4100).
 */
export const API_URL = process.env.API_URL ?? "http://localhost:4100";

export class CmsFetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

interface CmsFetchOptions {
  /** Seconds before Next.js revalidates this request's cached response. */
  revalidate?: number;
}

/**
 * Thin fetch wrapper for the public (unauthenticated) CMS endpoints. Uses
 * Next.js's fetch cache with a revalidate window so content edits made in
 * the admin panel show up without a full rebuild.
 */
export async function cmsFetch<T>(path: string, options: CmsFetchOptions = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: options.revalidate ?? 60 },
  });
  if (!res.ok) {
    throw new CmsFetchError(`CMS request failed: ${path} (${res.status})`, res.status);
  }
  // A Nest controller returning `null` (e.g. "nothing is featured") sends
  // an empty body, not the literal text "null" — Nest's response handling
  // treats null and undefined alike and just ends the response. res.json()
  // throws on an empty body ("Unexpected end of JSON input"), so read text
  // first and only parse when there's actually something to parse.
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}
