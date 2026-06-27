import { cn } from "@/lib/utils/cn";

interface RatingDisplayProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  showNumber?: boolean;
  className?: string;
}

export function RatingDisplay({
  rating,
  count,
  size = "md",
  showNumber = true,
  className,
}: RatingDisplayProps) {
  const rounded = Math.round(rating);
  const starSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className={cn("flex", starSize)} aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= rounded ? "text-amber-400" : "text-slate-300"}>
            ★
          </span>
        ))}
      </div>
      {showNumber ? (
        <span className="text-sm text-slate-600">
          {rating > 0 ? rating.toFixed(1) : "New"}
          {count !== undefined ? (
            <span className="text-slate-400"> ({count})</span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
