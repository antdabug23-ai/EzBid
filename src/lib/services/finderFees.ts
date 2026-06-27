/**
 * Finder's fee calculation.
 *
 * Centralized so the fee policy is easy to update later (e.g. caps, Stripe).
 *
 * Tiers (MVP):
 *   $0 – $249      -> flat $10
 *   $250 – $499    -> flat $20
 *   $500 – $999    -> 5%
 *   $1,000 – $2,499-> 4%
 *   $2,500+        -> 3% (future cap)
 *
 * Result is always rounded UP to the nearest whole dollar.
 */

// Future hard cap can be enabled here without touching call sites.
const HIGH_TIER_CAP: number | null = null;

export function calculateFinderFee(acceptedBidAmount: number): number {
  if (!Number.isFinite(acceptedBidAmount) || acceptedBidAmount < 0) {
    return 0;
  }

  let fee: number;

  if (acceptedBidAmount < 250) {
    fee = 10;
  } else if (acceptedBidAmount < 500) {
    fee = 20;
  } else if (acceptedBidAmount < 1000) {
    fee = acceptedBidAmount * 0.05;
  } else if (acceptedBidAmount < 2500) {
    fee = acceptedBidAmount * 0.04;
  } else {
    fee = acceptedBidAmount * 0.03;
    if (HIGH_TIER_CAP !== null) {
      fee = Math.min(fee, HIGH_TIER_CAP);
    }
  }

  return Math.ceil(fee);
}

/** Human-readable description of the fee tier for a given amount. */
export function describeFinderFeeTier(acceptedBidAmount: number): string {
  if (acceptedBidAmount < 250) return "Flat $10";
  if (acceptedBidAmount < 500) return "Flat $20";
  if (acceptedBidAmount < 1000) return "5% of accepted bid";
  if (acceptedBidAmount < 2500) return "4% of accepted bid";
  return "3% of accepted bid";
}
