import { cn } from "@/lib/utils";

export interface VendorRatingBadgeProps {
  /** Vendor's average rating (from real Review records). */
  averageRating: number;
  /** Vendor's total review count (from real Review records). */
  reviewCount: number;
  /** Compact inline text style (for tight spaces like dashboard previews). */
  compact?: boolean;
  className?: string;
}

const STAR_FILLED = "\u2605";
const STAR_OUTLINE = "\u2606";

/**
 * Compact, reusable vendor review indicator shown next to public vendor names.
 * Uses real review data only — never fabricates ratings or counts.
 *
 * - No reviews: outlined star + "New vendor".
 * - Has reviews: filled star + average + "N review(s)".
 */
export function VendorRatingBadge({
  averageRating,
  reviewCount,
  compact = false,
  className,
}: VendorRatingBadgeProps) {
  const hasReviews = reviewCount > 0;
  const reviewWord = reviewCount === 1 ? "review" : "reviews";

  if (compact) {
    if (!hasReviews) {
      return (
        <span className={cn("inline-flex items-center gap-1 text-slate-400", className)}>
          <span aria-hidden="true">{STAR_OUTLINE}</span>
          New vendor
        </span>
      );
    }
    return (
      <span className={cn("inline-flex items-center gap-1", className)}>
        <span aria-hidden="true" className="text-amber-500">
          {STAR_FILLED}
        </span>
        <span className="font-medium text-amber-700">{averageRating.toFixed(1)}</span>
        <span className="text-slate-500">
          &middot; {reviewCount} {reviewWord}
        </span>
      </span>
    );
  }

  if (!hasReviews) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500",
          className
        )}
      >
        <span aria-hidden="true">{STAR_OUTLINE}</span>
        New vendor
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700",
        className
      )}
    >
      <span aria-hidden="true" className="text-amber-500">
        {STAR_FILLED}
      </span>
      <span>{averageRating.toFixed(1)}</span>
      <span className="font-normal text-amber-600/90">
        &middot; {reviewCount} {reviewWord}
      </span>
    </span>
  );
}
