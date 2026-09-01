import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Groups a list into rows of at most `size`. A fixed N-column CSS grid
 *  leaves dead space on the last row whenever a CMS-driven list's count
 *  isn't a multiple of N (e.g. 1 item stranded at a fraction of the row,
 *  or a trailing pair short of a full row). Chunking instead lets each
 *  row's own item count drive an even flex split — a row of 1 fills it,
 *  a row of 2 splits it in half, and so on — so every row reads as
 *  intentional regardless of the total. Pair with a flex row where each
 *  item has `flex-1` (see UpcomingEvents/NewsSection/EventsAnnouncements
 *  for the pattern). */
export function chunkIntoRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}
