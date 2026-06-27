import type {
  JobStatus,
  BidStatus,
  FinderFeeStatus,
  DocumentStatus,
  VerificationStatus,
} from "@prisma/client";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import {
  JOB_STATUS_LABELS,
  BID_STATUS_LABELS,
  FINDER_FEE_STATUS_LABELS,
  DOCUMENT_STATUS_LABELS,
  VERIFICATION_STATUS_LABELS,
} from "@/lib/utils/labels";

const jobTone: Record<JobStatus, BadgeTone> = {
  OPEN: "blue",
  BIDDING: "blue",
  ACCEPTED: "purple",
  IN_PROGRESS: "amber",
  COMPLETED: "green",
  CANCELLED: "neutral",
};

const bidTone: Record<BidStatus, BadgeTone> = {
  SUBMITTED: "blue",
  ACCEPTED: "green",
  DECLINED: "neutral",
  WITHDRAWN: "neutral",
};

const feeTone: Record<FinderFeeStatus, BadgeTone> = {
  PENDING: "amber",
  CONFIRMED: "green",
  INVOICED: "blue",
  PAID: "green",
  WAIVED: "neutral",
};

const docTone: Record<DocumentStatus, BadgeTone> = {
  PENDING: "amber",
  APPROVED: "green",
  REJECTED: "red",
};

const verTone: Record<VerificationStatus, BadgeTone> = {
  NOT_VERIFIED: "neutral",
  PENDING_REVIEW: "amber",
  DOCUMENT_VERIFIED: "blue",
  TRADE_VERIFIED: "green",
  REJECTED: "red",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return <Badge tone={jobTone[status]}>{JOB_STATUS_LABELS[status]}</Badge>;
}

export function BidStatusBadge({ status }: { status: BidStatus }) {
  return <Badge tone={bidTone[status]}>{BID_STATUS_LABELS[status]}</Badge>;
}

export function FinderFeeStatusBadge({ status }: { status: FinderFeeStatus }) {
  return <Badge tone={feeTone[status]}>{FINDER_FEE_STATUS_LABELS[status]}</Badge>;
}

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  return <Badge tone={docTone[status]}>{DOCUMENT_STATUS_LABELS[status]}</Badge>;
}

export function VerificationStatusBadge({ status }: { status: VerificationStatus }) {
  return <Badge tone={verTone[status]}>{VERIFICATION_STATUS_LABELS[status]}</Badge>;
}
