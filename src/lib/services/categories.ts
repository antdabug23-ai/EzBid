import "server-only";
import { prisma } from "@/lib/db/prisma";
import { getServiceCategoryBySlug } from "@/lib/serviceCategories";
import { ValidationError } from "./errors";

export function getActiveServiceCategories() {
  return prisma.serviceCategory.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
}

/**
 * Resolves a lead-category slug (from the shared config) to a persistent DB
 * ServiceCategory id, creating the row on first use. This lets the UI stay
 * config-driven while jobs keep a valid foreign key.
 */
export async function resolveServiceCategoryId(slug: string): Promise<string> {
  const config = getServiceCategoryBySlug(slug);
  if (!config) {
    throw new ValidationError("Select a valid service category.");
  }
  const category = await prisma.serviceCategory.upsert({
    where: { name: config.name },
    update: {},
    create: { name: config.name, description: config.description },
  });
  return category.id;
}
