import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

const PALETTE = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
];

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface InitialsAvatarProps {
  name: string;
  className?: string;
}

export function InitialsAvatar({ name, className }: InitialsAvatarProps) {
  const colorClass = PALETTE[hashString(name) % PALETTE.length];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-semibold",
        colorClass,
        className,
      )}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
