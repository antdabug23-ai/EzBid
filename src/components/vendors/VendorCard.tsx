import Link from "next/link";
import type { VerificationStatus } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { VerificationBadge } from "./VerificationBadge";

interface VendorCardProps {
  href?: string;
  businessName: string;
  town?: string | null;
  state?: string | null;
  averageRating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  description?: string | null;
}

export function VendorCard({
  href,
  businessName,
  town,
  state,
  averageRating,
  reviewCount,
  verificationStatus,
  description,
}: VendorCardProps) {
  const inner = (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">{businessName}</h3>
          {town || state ? (
            <p className="text-sm text-slate-500">
              {[town, state].filter(Boolean).join(", ")}
            </p>
          ) : null}
        </div>
        <VerificationBadge status={verificationStatus} />
      </div>
      <div className="mt-2">
        <RatingDisplay rating={averageRating} count={reviewCount} size="sm" />
      </div>
      {description ? (
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{description}</p>
      ) : null}
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-transform hover:-translate-y-0.5">
        {inner}
      </Link>
    );
  }
  return inner;
}
