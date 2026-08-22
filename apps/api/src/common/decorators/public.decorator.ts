import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/** Marks a route as reachable without an admin session. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
