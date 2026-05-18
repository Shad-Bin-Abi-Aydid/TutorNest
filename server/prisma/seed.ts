import "dotenv/config";
import { hashPassword } from "@better-auth/utils/password";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await hashPassword("Admin@123456");

  const admin = await prisma.user.upsert({
    where: { email: "admin@tutornest.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@tutornest.com",
      emailVerified: true,
      role: "ADMIN",
    },
  });

  const existingAccount = await prisma.account.findFirst({
    where: { userId: admin.id, providerId: "credential" },
  });

  if (!existingAccount) {
    await prisma.account.create({
      data: {
        id: crypto.randomUUID(),
        accountId: admin.id,
        providerId: "credential",
        userId: admin.id,
        password: hashedPassword,
      },
    });
  } else {
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: { password: hashedPassword },
    });
  }

  console.log("Seeded admin:", admin.email);

  // Temporary seed: categories are seeded here because the admin dashboard
  // is not yet implemented. Once role-based routes are live, admin will
  // manage categories via the API.

  const categories = [
    "Math",
    "Physics",
    "English",
    "Chemistry",
    "Biology",
    "History",
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeded categories");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
