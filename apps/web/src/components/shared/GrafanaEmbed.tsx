"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

const LOAD_TIMEOUT_MS = 12000;

export function GrafanaEmbed({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = React.useState(0);

  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const iframeSrc = `${src}&theme=${theme}`;

  React.useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current));
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [mounted, iframeSrc, attempt]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      {mounted && status !== "error" && (
        <iframe
          key={attempt}
          src={iframeSrc}
          title={title}
          width="100%"
          height="100%"
          loading="lazy"
          frameBorder={0}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setStatus("loaded")}
        />
      )}

      {(!mounted || status === "loading") && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2
            className="h-6 w-6 animate-spin text-foreground-secondary/50"
            aria-hidden="true"
          />
          <span className="sr-only">Loading traffic graph&hellip;</span>
        </div>
      )}

      {mounted && status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <AlertTriangle className="h-6 w-6 text-foreground-secondary" aria-hidden="true" />
          <p className="text-sm text-foreground-secondary">
            Unable to load the traffic graph right now.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("loading");
              setAttempt((n) => n + 1);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
