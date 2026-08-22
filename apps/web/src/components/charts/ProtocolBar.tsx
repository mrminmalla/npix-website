export function ProtocolBar({
  label,
  percent,
  colorClassName,
}: {
  label: string;
  percent: number;
  colorClassName: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-semibold text-foreground">{percent}%</span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-surface">
        <div
          className={`h-full rounded-full ${colorClassName}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
