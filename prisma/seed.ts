import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SERVICE_CATEGORIES: { name: string; description: string }[] = [
  { name: "Landscaping & Basic Mowing", description: "Lawn mowing, yard cleanup, planting, and general landscaping." },
  { name: "Power Washing", description: "Exterior cleaning for driveways, siding, decks, and patios." },
  { name: "Handyman Services", description: "General repairs, assembly, mounting, and small fixes." },
  { name: "Plumbing", description: "Leaks, fixtures, drains, water heaters, and pipe repair." },
  { name: "HVAC", description: "Heating, cooling, ventilation install and repair." },
  { name: "Electrical Work", description: "Wiring, outlets, fixtures, and electrical repair." },
  { name: "Junk Removal", description: "Hauling, cleanouts, and bulk item disposal." },
  { name: "House Cleaning", description: "Residential cleaning, deep cleans, and move-out cleaning." },
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

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@ezbid.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin12345";

  console.log(`Seeding admin user (${adminEmail})...`);
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: { email: adminEmail, passwordHash, role: "ADMIN" },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
