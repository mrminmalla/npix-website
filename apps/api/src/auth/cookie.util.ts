import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';

const ACCESS_COOKIE = 'npix_at';
const REFRESH_COOKIE = 'npix_rt';

function baseOptions(config: ConfigService): CookieOptions {
  return {
    httpOnly: true,
    secure: config.get('NODE_ENV') === 'production',
    sameSite: 'lax',
    path: '/',
  };
}

export function setAuthCookies(
  res: Response,
  config: ConfigService,
  tokens: { accessToken: string; refreshToken: string },
) {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, {
    ...baseOptions(config),
    maxAge: 15 * 60 * 1000,
  });
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
    ...baseOptions(config),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response, config: ConfigService) {
  res.clearCookie(ACCESS_COOKIE, baseOptions(config));
  res.clearCookie(REFRESH_COOKIE, baseOptions(config));
}

export { ACCESS_COOKIE, REFRESH_COOKIE };
