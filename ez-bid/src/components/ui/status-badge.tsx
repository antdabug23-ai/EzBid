import type {
  JobStatus,
  BidStatus,
  VerificationStatus,
  DocumentStatus,
  FinderFeeStatus,
} from "@prisma/client";
import { Badge, type BadgeTone } from "./badge";

const JOB_STATUS: Record<JobStatus, { label: string; tone: BadgeTone }> = {
  OPEN: { label: "Open", tone: "blue" },
  BIDDING: { label: "Receiving bids", tone: "blue" },
  ACCEPTED: { label: "Bid accepted", tone: "purple" },
  IN_PROGRESS: { label: "In progress", tone: "amber" },
  COMPLETED: { label: "Completed", tone: "green" },
  CANCELLED: { label: "Cancelled", tone: "neutral" },
};

const BID_STATUS: Record<BidStatus, { label: string; tone: BadgeTone }> = {
  SUBMITTED: { label: "Submitted", tone: "blue" },
  ACCEPTED: { label: "Accepted", tone: "green" },
  DECLINED: { label: "Declined", tone: "neutral" },
  WITHDRAWN: { label: "Withdrawn", tone: "neutral" },
};

const VERIFICATION_STATUS: Record<VerificationStatus, { label: string; tone: BadgeTone }> = {
  NOT_VERIFIED: { label: "Not verified", tone: "neutral" },
  PENDING_REVIEW: { label: "Pending review", tone: "amber" },
  DOCUMENT_VERIFIED: { label: "Document verified", tone: "blue" },
  TRADE_VERIFIED: { label: "Trade verified", tone: "green" },
  REJECTED: { label: "Rejected", tone: "red" },
};

const DOCUMENT_STATUS: Record<DocumentStatus, { label: string; tone: BadgeTone }> = {
  PENDING: { label: "Pending", tone: "amber" },
  APPROVED: { label: "Approved", tone: "green" },
  REJECTED: { label: "Rejected", tone: "red" },
};

const FINDER_FEE_STATUS: Record<FinderFeeStatus, { label: string; tone: BadgeTone }> = {
  PENDING: { label: "Pending", tone: "amber" },
  CONFIRMED: { label: "Confirmed", tone: "green" },
  INVOICED: { label: "Invoiced", tone: "blue" },
  PAID: { label: "Paid", tone: "green" },
  WAIVED: { label: "Waived", tone: "neutral" },
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const { label, tone } = JOB_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function BidStatusBadge({ status }: { status: BidStatus }) {
  const { label, tone } = BID_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function VerificationStatusBadge({ status }: { status: VerificationStatus }) {
  const { label, tone } = VERIFICATION_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  const { label, tone } = DOCUMENT_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function FinderFeeStatusBadge({ status }: { status: FinderFeeStatus }) {
  const { label, tone } = FINDER_FEE_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}
