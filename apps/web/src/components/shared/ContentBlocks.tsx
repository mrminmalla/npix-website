import Link from "next/link";
import { Download as DownloadIcon, ArrowRight } from "lucide-react";
import type { ContentBlock, TextAlign } from "@/types";
import { cn } from "@/lib/utils";

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

const ALIGN_CLASS: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * `html` is admin-authored rich text (bold/italic/underline/links), already
 * sanitized server-side on save (see DocumentsService) before it's ever
 * stored — safe to inject directly. Blocks written before the rich-text
 * editor existed have no `html`, only plain `text`, which React already
 * escapes normally via ordinary interpolation below.
 */
function RichText({ html, text }: { html?: string; text: string }) {
  if (html) return <span dangerouslySetInnerHTML={{ __html: html }} />;
  return <>{text}</>;
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const HeadingTag = block.level === 2 ? "h2" : "h3";
            return (
              <HeadingTag
                key={i}
                className={cn(
                  "mt-6 font-semibold text-foreground first:mt-0",
                  block.level === 2 ? "text-xl" : "text-lg",
                  block.align && ALIGN_CLASS[block.align],
                )}
              >
                <RichText html={block.html} text={block.text} />
              </HeadingTag>
            );
          }

          case "paragraph":
            return (
              <p
                key={i}
                className={cn(
                  "mt-3 text-sm leading-relaxed text-foreground-secondary",
                  block.align && ALIGN_CLASS[block.align],
                )}
              >
                <RichText html={block.html} text={block.text} />
              </p>
            );

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="mt-4 border-l-4 border-secondary bg-surface py-2 pl-4 text-sm italic leading-relaxed text-foreground-secondary"
              >
                <RichText html={block.html} text={block.text} />
              </blockquote>
            );

          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag key={i} className="mt-3 space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                    {block.ordered ? (
                      <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-secondary">
                        {j + 1}.
                      </span>
                    ) : (
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ListTag>
            );
          }

          case "table":
            return (
              <div
                key={i}
                className="mt-4 overflow-x-auto rounded-xl border border-border"
              >
                <table className="w-full min-w-[420px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface text-left">
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-4 py-3 font-semibold text-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr
                        key={r}
                        className="border-b border-border last:border-b-0 hover:bg-surface/60"
                      >
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-3 text-foreground-secondary">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "code":
            return (
              <pre
                key={i}
                className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-foreground"
              >
                <code className="font-mono">{block.code}</code>
              </pre>
            );

          case "link": {
            const Icon = block.download ? DownloadIcon : ArrowRight;
            const linkClassName =
              "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400";
            return (
              <div key={i}>
                {!block.download && isInternalHref(block.href) ? (
                  <Link href={block.href} className={linkClassName}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {block.label}
                  </Link>
                ) : (
                  <a
                    href={block.href}
                    target={block.download ? undefined : "_blank"}
                    rel={block.download ? undefined : "noopener noreferrer"}
                    download={block.download || undefined}
                    className={linkClassName}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {block.label}
                  </a>
                )}
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
