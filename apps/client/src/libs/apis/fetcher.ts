/**
 * fetcher.ts
 *
 * Common data fetching utility function.
 *
 * - Named "fetcher" based on its role: handles HTTP requests and responses.
 * - Even without SWR, the term clearly conveys its purpose and matches common conventions.
 * - Abstract enough to allow internal implementation changes (e.g., fetch, axios).
 * - Keeps the codebase clean and semantically meaningful.
 */
