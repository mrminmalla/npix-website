/** Public NPIX website, for "View site" links in the admin shell. */
export const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3005';

/** Where the sidebar's Help link points. Defaults to the public site's
 *  documentation page until a dedicated admin help page exists. */
export const ADMIN_HELP_URL = process.env.NEXT_PUBLIC_ADMIN_HELP_URL ?? `${PUBLIC_SITE_URL}/documentation`;
