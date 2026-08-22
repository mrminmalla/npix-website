export function LiveIndicator({ intervalSeconds = 30 }: { intervalSeconds?: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-foreground-secondary">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="font-semibold text-success">Live</span>
      <span>&middot; Updated every {intervalSeconds} seconds</span>
    </div>
  );
}
