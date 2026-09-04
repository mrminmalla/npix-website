import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Tells the public frontend to drop its ISR cache for specific paths right
 * after an admin save, so edits appear immediately instead of waiting out
 * the page's normal revalidate window. Best-effort: a failure here must
 * never fail the underlying admin mutation — worst case, the edit still
 * shows up once the page's normal ISR window elapses.
 */
@Injectable()
export class RevalidateService {
  private readonly logger = new Logger(RevalidateService.name);

  constructor(private readonly config: ConfigService) {}

  async trigger(paths: string[]): Promise<void> {
    const url = this.config.get<string>('WEB_REVALIDATE_URL');
    const secret = this.config.get<string>('WEB_REVALIDATE_SECRET');
    if (!url || !secret || paths.length === 0) return;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': secret },
        body: JSON.stringify({ paths }),
      });
      if (!res.ok) {
        this.logger.warn(`Frontend revalidate returned ${res.status} for ${paths.join(', ')}`);
      }
    } catch (err) {
      this.logger.warn(`Failed to reach frontend revalidate endpoint: ${(err as Error).message}`);
    }
  }
}
