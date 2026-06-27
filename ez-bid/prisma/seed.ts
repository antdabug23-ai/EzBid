import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SERVICE_CATEGORIES: { name: string; description: string }[] = [
  {
    name: "Landscaping and basic mowing",
    description: "Lawn mowing, yard cleanup, planting, and general landscaping.",
  },
  {
    name: "Power washing",
    description: "Exterior cleaning for driveways, siding, decks, and patios.",
  },
  {
    name: "Handyman services",
    description: "General repairs, assembly, mounting, and small fixes.",
  },
  {
    name: "Plumbing",
    description: "Leaks, fixtures, drains, water heaters, and pipe repair.",
  },
  {
    name: "HVAC",
    description: "Heating, cooling, and ventilation install and repair.",
  },
  {
    name: "Electrical work",
    description: "Wiring, outlets, fixtures, and electrical repair.",
  },
  {
    name: "Junk removal",
    description: "Hauling, cleanouts, and bulk item disposal.",
  },
  {
    name: "House cleaning",
    description: "Residential cleaning, deep cleans, and move-out cleaning.",
  },
];

async function main() {
  console.log("Seeding service categories...");
  for (const category of SERVICE_CATEGORIES) {
    await prisma.serviceCategory.upsert({
      where: { name: category.name },
      update: { description: category.description, isActive: true },
      create: { name: category.name, description: category.description },
    });
  }
  console.log(`Seeded ${SERVICE_CATEGORIES.length} service categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
