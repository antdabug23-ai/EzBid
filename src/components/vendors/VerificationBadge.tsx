import type { VerificationStatus } from "@prisma/client";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { VERIFICATION_STATUS_LABELS } from "@/lib/utils/labels";

const config: Record<VerificationStatus, { tone: BadgeTone; icon: string }> = {
  NOT_VERIFIED: { tone: "neutral", icon: "○" },
  PENDING_REVIEW: { tone: "amber", icon: "…" },
  DOCUMENT_VERIFIED: { tone: "blue", icon: "✓" },
  TRADE_VERIFIED: { tone: "green", icon: "✓✓" },
  REJECTED: { tone: "red", icon: "✕" },
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const { tone, icon } = config[status];
  return (
    <Badge tone={tone}>
      <span aria-hidden>{icon}</span>
      {VERIFICATION_STATUS_LABELS[status]}
    </Badge>
  );
}
