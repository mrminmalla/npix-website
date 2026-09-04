/**
 * Conversion layer between the rich-text editor's native format (HTML)
 * and the `ContentBlock[]` JSON shape the backend/API/public site already
 * expect (apps/web/src/types/index.ts `ContentBlock`, `Document.content`
 * in the Prisma schema) — see AGENTS notes on why this exists: the admin
 * form used to require hand-typed JSON in this exact shape; now it's
 * produced/consumed automatically so the admin never sees it.
 *
 * There's no shared types package between apps/web and apps/admin (a
 * pre-existing gap, not something this change should take on), so this
 * mirrors just the subset of `ContentBlock` this converter actually reads
 * or writes, rather than importing across the app boundary.
 */

type Align = 'left' | 'center' | 'right';

export type AdminContentBlock =
  | { type: 'heading'; text: string; html: string; level: 2 | 3; align?: Align }
  | { type: 'paragraph'; text: string; html: string; align?: Align }
  | { type: 'blockquote'; text: string; html: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'code'; code: string }
  // Not authorable through the editor, but existing documents can already
  // have these — read (and re-rendered as plain prose) so opening one for
  // editing never silently drops content, even though re-saving loses
  // their original structure (a standalone CTA-styled link / a table).
  | { type: 'link'; href: string; label: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function alignAttr(align?: Align): string {
  return align ? ` style="text-align: ${align}"` : '';
}

/** Strips all markup and checks whether anything real is left — used both
 *  here and by the editor itself so "an empty bold run" and "nothing
 *  typed at all" are treated the same way everywhere. */
export function isRichTextEmpty(html: string | undefined | null): boolean {
  if (!html) return true;
  return html.replace(/<[^>]*>/g, '').trim().length === 0;
}

/** Existing stored blocks -> HTML the editor can load and display. */
export function blocksToEditorHtml(blocks: AdminContentBlock[] | null | undefined): string {
  if (!blocks || blocks.length === 0) return '';
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading': {
          const tag = block.level === 2 ? 'h2' : 'h3';
          return `<${tag}${alignAttr(block.align)}>${block.html || escapeHtml(block.text)}</${tag}>`;
        }
        case 'paragraph':
          return `<p${alignAttr(block.align)}>${block.html || escapeHtml(block.text)}</p>`;
        case 'blockquote':
          return `<blockquote>${block.html || escapeHtml(block.text)}</blockquote>`;
        case 'list': {
          const tag = block.ordered ? 'ol' : 'ul';
          return `<${tag}>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</${tag}>`;
        }
        case 'code':
          return `<pre><code>${escapeHtml(block.code)}</code></pre>`;
        case 'link':
          return `<p><a href="${escapeHtml(block.href)}">${escapeHtml(block.label)}</a></p>`;
        case 'table':
          return block.rows.map((row) => `<p>${row.map(escapeHtml).join(' — ')}</p>`).join('');
        default:
          return '';
      }
    })
    .join('');
}

/** Editor HTML -> the stored block shape, at save time. Runs in the
 *  browser only (DOMParser) — this field type is only ever rendered
 *  client-side (RichTextEditor is a 'use client' component). */
export function editorHtmlToBlocks(html: string): AdminContentBlock[] {
  if (isRichTextEmpty(html)) return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blocks: AdminContentBlock[] = [];

  function readAlign(el: Element): Align | undefined {
    const value = (el as HTMLElement).style?.textAlign;
    return value === 'left' || value === 'center' || value === 'right' ? value : undefined;
  }

  for (const el of Array.from(doc.body.children)) {
    const tag = el.tagName.toLowerCase();
    const text = (el.textContent ?? '').trim();

    if (tag === 'h2' || tag === 'h3') {
      if (!text) continue;
      blocks.push({ type: 'heading', level: tag === 'h2' ? 2 : 3, text, html: el.innerHTML, align: readAlign(el) });
    } else if (tag === 'p') {
      if (!text) continue;
      blocks.push({ type: 'paragraph', text, html: el.innerHTML, align: readAlign(el) });
    } else if (tag === 'blockquote') {
      if (!text) continue;
      blocks.push({ type: 'blockquote', text, html: el.innerHTML });
    } else if (tag === 'ul' || tag === 'ol') {
      const items = Array.from(el.children)
        .map((li) => (li.textContent ?? '').trim())
        .filter(Boolean);
      if (items.length > 0) blocks.push({ type: 'list', ordered: tag === 'ol', items });
    } else if (tag === 'pre') {
      if (text) blocks.push({ type: 'code', code: text });
    }
  }

  return blocks;
}
