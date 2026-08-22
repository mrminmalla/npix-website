import Link from "next/link";
import { Download as DownloadIcon, ArrowRight } from "lucide-react";
import type { ContentBlock } from "@/types";

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3
                key={i}
                className="mt-6 text-lg font-semibold text-foreground first:mt-0"
              >
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={i} className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {block.text}
              </p>
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
