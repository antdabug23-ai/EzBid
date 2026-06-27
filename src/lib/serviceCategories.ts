/**
 * Lead service categories shown on the marketing site.
 *
 * Single source of truth for the public "Services" display. To add a new
 * service later, just append one object to `serviceCategories` — no UI edits
 * required (components map over `activeServiceCategories`).
 *
 * This is intentionally separate from the database `ServiceCategory` model
 * (used by job/vendor forms): it carries marketing-only fields like `slug`,
 * `seasonality`, `displayOrder`, and `icon`.
 */
export interface LeadServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  seasonality: string;
  isActive: boolean;
  displayOrder: number;
  /** When true, this category is offered as an option in the "Post a job" form. */
  availableForJobPosting: boolean;
  /** Emoji or icon name; optional and safe to leave undefined. */
  icon?: string;
}

export const serviceCategories: LeadServiceCategory[] = [
  {
    id: "lawn-care-landscaping",
    name: "Lawn Care & Landscaping",
    slug: "lawn-care-landscaping",
    description:
      "Lawn mowing, yard cleanup, landscaping, seasonal maintenance, and general outdoor property care.",
    seasonality: "Spring, Summer, Fall",
    isActive: true,
    displayOrder: 1,
    availableForJobPosting: true,
    icon: "🌱",
  },
  {
    id: "snow-removal",
    name: "Snow Removal",
    slug: "snow-removal",
    description:
      "Snow plowing, shoveling, salting, ice management, and winter property access support.",
    seasonality: "Winter",
    isActive: true,
    displayOrder: 2,
    availableForJobPosting: true,
    icon: "❄️",
  },
  {
    id: "house-cleaning",
    name: "House Cleaning",
    slug: "house-cleaning",
    description:
      "One-time, weekly, biweekly, and recurring house cleaning services for homeowners, renters, and property managers.",
    seasonality: "Year-round",
    isActive: true,
    displayOrder: 3,
    availableForJobPosting: true,
    icon: "🧹",
  },
  {
    id: "tree-removal",
    name: "Tree Removal",
    slug: "tree-removal",
    description:
      "Tree removal, fallen limb cleanup, storm damage response, brush clearing, and related outdoor property safety services.",
    seasonality: "Year-round, with strong demand after storms",
    isActive: true,
    displayOrder: 4,
    availableForJobPosting: false,
    icon: "🌳",
  },
];

/** Active categories, sorted for display. Components should consume this. */
export const activeServiceCategories: LeadServiceCategory[] = serviceCategories
  .filter((category) => category.isActive)
  .sort((a, b) => a.displayOrder - b.displayOrder);

/** Categories offered in the "Post a job" form, sorted for display. */
export const jobPostingCategories: LeadServiceCategory[] = serviceCategories
  .filter((category) => category.isActive && category.availableForJobPosting)
  .sort((a, b) => a.displayOrder - b.displayOrder);

export function getServiceCategoryBySlug(slug: string): LeadServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getServiceCategoryByName(name: string): LeadServiceCategory | undefined {
  return serviceCategories.find((category) => category.name === name);
}
