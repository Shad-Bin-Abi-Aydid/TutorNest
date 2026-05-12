import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123456", 10);

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
  }

  console.log("Seeded admin:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
