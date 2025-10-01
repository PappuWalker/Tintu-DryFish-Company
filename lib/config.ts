export const NEXT_PUBLIC_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_BASE_URL || "https://admin.tintucuts.com";
export const NEXT_PUBLIC_PRODUCTS_API = process.env.NEXT_PUBLIC_PRODUCTS_API || `${NEXT_PUBLIC_ADMIN_BASE_URL}/api/products`;

// Server-side only
export const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || NEXT_PUBLIC_ADMIN_BASE_URL;
export const ADMIN_API_KEY = process.env.ADMIN_API_KEY || ""; // ensure set in env in production
