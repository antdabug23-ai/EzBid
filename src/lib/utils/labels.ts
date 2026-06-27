import type {
  JobStatus,
  BidStatus,
  VerificationStatus,
  DocumentStatus,
  FinderFeeStatus,
  ServiceWindow,
  UrgencyLevel,
} from "@prisma/client";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  OPEN: "Open",
  BIDDING: "Receiving bids",
  ACCEPTED: "Bid accepted",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const BID_STATUS_LABELS: Record<BidStatus, string> = {
  SUBMITTED: "Submitted",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  WITHDRAWN: "Withdrawn",
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  NOT_VERIFIED: "Not verified",
  PENDING_REVIEW: "Pending review",
  DOCUMENT_VERIFIED: "Document verified",
  TRADE_VERIFIED: "Trade verified",
  REJECTED: "Rejected",
};

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const FINDER_FEE_STATUS_LABELS: Record<FinderFeeStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  INVOICED: "Invoiced",
  PAID: "Paid",
  WAIVED: "Waived",
};

export const SERVICE_WINDOW_LABELS: Record<ServiceWindow, string> = {
  MORNING: "Morning",
  AFTERNOON: "Afternoon",
  EVENING: "Evening",
  FLEXIBLE: "Flexible",
};

export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  LOW: "Low",
  NORMAL: "Normal",
  HIGH: "High",
  EMERGENCY: "Emergency",
};

export const SERVICE_WINDOW_OPTIONS = Object.entries(SERVICE_WINDOW_LABELS).map(
  ([value, label]) => ({ value, label })
);

export const URGENCY_OPTIONS = Object.entries(URGENCY_LABELS).map(
  ([value, label]) => ({ value, label })
);
