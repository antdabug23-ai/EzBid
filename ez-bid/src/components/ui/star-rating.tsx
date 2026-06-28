import { cn } from "@/lib/utils";

export interface StarRatingProps {
  rating: number;
  count: number;
  /** Show the "(N reviews)" suffix. */
  showCount?: boolean;
  className?: string;
}

/**
 * Read-only vendor rating display.
 * Shows filled/empty stars, the numeric average, and the review count.
 * Falls back to "New vendor" when there are no reviews.
 */
export function StarRating({ rating, count, showCount = true, className }: StarRatingProps) {
  if (!count || count <= 0) {
    return <span className={cn("text-xs text-slate-400", className)}>New vendor</span>;
  }

  const rounded = Math.round(rating);

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span aria-hidden="true" className="tracking-tight text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (i < rounded ? "\u2605" : "\u2606")).join("")}
      </span>
      <span className="font-medium text-slate-800">{rating.toFixed(1)}</span>
      {showCount ? (
        <span className="text-slate-500">
          ({count} {count === 1 ? "review" : "reviews"})
        </span>
      ) : null}
    </span>
  );
}
