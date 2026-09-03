// No `intervalSeconds` prop: this app has no way to know or guarantee how
// often the embedded Grafana dashboard actually refreshes (that's set
// inside the dashboard config, not passed to this component), so an exact
// number here would be an unverifiable claim that can silently drift from
// reality if the dashboard's own refresh rate ever changes.
export function LiveIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="font-semibold text-success">Live</span>
      <span>&middot; Refreshed automatically</span>
    </div>
  );
}
