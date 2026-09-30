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

  const categoryNames = [
    "Math",
    "Physics",
    "English",
    "Chemistry",
    "Biology",
    "History",
    "ICT",
    "Computer Science",
  ];

  const categories: Record<string, { id: string; name: string }> = {};

  for (const name of categoryNames) {
    categories[name] = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeded categories");

  async function upsertCredentialAccount(userId: string) {
    const existingAccount = await prisma.account.findFirst({
      where: { userId, providerId: "credential" },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          id: crypto.randomUUID(),
          accountId: userId,
          providerId: "credential",
          userId,
          password: hashedPassword,
        },
      });
    } else {
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword },
      });
    }
  }

  // Sample tutors, each with a profile and subject categories.
  const tutorSeeds = [
    {
      email: "shad@test.com",
      name: "Shad",
      bio: "Experienced English tutor",
      experienceYears: 3,
      pricePerHour: 20,
      categoryNames: ["English"],
    },
    {
      email: "rifataramim29@gmail.com",
      name: "Rifat",
      bio: "Experienced ICT Tutor",
      experienceYears: 4,
      pricePerHour: 35,
      categoryNames: ["ICT"],
    },
    {
      email: "mamun@gmail.com",
      name: "Mamun",
      bio: "Hi, I'm Mamun! I've been teaching Computer Science and ICT for years, helping students build a strong foundation in programming, algorithms, and computer fundamentals. My teaching style focuses on breaking complex concepts down into simple, practical examples — so students don't just memorize for exams, they actually understand how things work. Whether you're preparing for board exams or just starting to explore programming, I'm here to make learning CS and ICT clear and stress-free.",
      experienceYears: 10,
      pricePerHour: 20,
      categoryNames: ["Computer Science", "ICT"],
    },
  ];

  const tutorProfilesByEmail: Record<
    string,
    { profile: { id: string }; userId: string }
  > = {};

  for (const seed of tutorSeeds) {
    const tutorUser = await prisma.user.upsert({
      where: { email: seed.email },
      update: {},
      create: {
        name: seed.name,
        email: seed.email,
        emailVerified: true,
        role: "TUTOR",
      },
    });
    await upsertCredentialAccount(tutorUser.id);

    const tutorProfile = await prisma.tutorProfile.upsert({
      where: { userId: tutorUser.id },
      update: {},
      create: {
        userId: tutorUser.id,
        bio: seed.bio,
        experienceYears: seed.experienceYears,
        pricePerHour: seed.pricePerHour,
      },
    });

    for (const categoryName of seed.categoryNames) {
      await prisma.tutorCategory.upsert({
        where: {
          tutorProfileId_categoryId: {
            tutorProfileId: tutorProfile.id,
            categoryId: categories[categoryName].id,
          },
        },
        update: {},
        create: {
          tutorProfileId: tutorProfile.id,
          categoryId: categories[categoryName].id,
        },
      });
    }

    tutorProfilesByEmail[seed.email] = { profile: tutorProfile, userId: tutorUser.id };
    console.log("Seeded tutor:", seed.email);
  }

  // Extra accounts referenced by bookings below (one tutor-role account with
  // no profile, and the admin's own student test account).
  const extraUserSeeds = [
    { email: "student@test.com", name: "Shad Test 3", role: "TUTOR" as const },
    { email: "shadaydid@gmail.com", name: "Shad Bin Abi Aydid", role: "STUDENT" as const },
  ];

  const usersByEmail: Record<string, { id: string }> = {};

  for (const seed of extraUserSeeds) {
    const user = await prisma.user.upsert({
      where: { email: seed.email },
      update: {},
      create: {
        name: seed.name,
        email: seed.email,
        emailVerified: true,
        role: seed.role,
      },
    });
    await upsertCredentialAccount(user.id);
    usersByEmail[seed.email] = user;
  }

  console.log("Seeded extra accounts");

  // Bookings, replicating the real local test data.
  const bookingSeeds = [
    { studentEmail: "student@test.com", tutorEmail: "shad@test.com", category: "English", scheduledAt: "2026-06-01T10:00:00.000Z", durationMinutes: 60, status: "CONFIRMED" },
    { studentEmail: "rifataramim29@gmail.com", tutorEmail: "shad@test.com", category: "English", scheduledAt: "2026-07-01T10:00:00.000Z", durationMinutes: 60, status: "COMPLETED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "rifataramim29@gmail.com", category: "ICT", scheduledAt: "2026-08-08T14:17:00.000Z", durationMinutes: 60, status: "CONFIRMED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "shad@test.com", category: "English", scheduledAt: "2026-08-13T23:52:00.000Z", durationMinutes: 90, status: "CANCELLED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "rifataramim29@gmail.com", category: "ICT", scheduledAt: "2026-08-31T12:03:00.000Z", durationMinutes: 30, status: "CANCELLED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "mamun@gmail.com", category: "ICT", scheduledAt: "2026-09-19T12:43:00.000Z", durationMinutes: 90, status: "CANCELLED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "mamun@gmail.com", category: "ICT", scheduledAt: "2026-09-18T13:49:00.000Z", durationMinutes: 60, status: "COMPLETED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "mamun@gmail.com", category: "Computer Science", scheduledAt: "2026-09-13T11:09:00.000Z", durationMinutes: 30, status: "CANCELLED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "mamun@gmail.com", category: "ICT", scheduledAt: "2026-09-26T16:23:00.000Z", durationMinutes: 60, status: "CONFIRMED" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "rifataramim29@gmail.com", category: "ICT", scheduledAt: "2026-09-20T13:28:00.000Z", durationMinutes: 60, status: "PENDING" },
    { studentEmail: "shadaydid@gmail.com", tutorEmail: "mamun@gmail.com", category: "Computer Science", scheduledAt: "2026-09-17T10:28:00.000Z", durationMinutes: 30, status: "COMPLETED" },
  ] as const;

  for (const seed of bookingSeeds) {
    const studentId =
      usersByEmail[seed.studentEmail]?.id ??
      tutorProfilesByEmail[seed.studentEmail]?.userId;
    const tutorProfileId = tutorProfilesByEmail[seed.tutorEmail].profile.id;
    const categoryId = categories[seed.category].id;
    const scheduledAt = new Date(seed.scheduledAt);

    const existingBooking = await prisma.booking.findFirst({
      where: { studentId, tutorProfileId, scheduledAt },
    });

    if (!existingBooking) {
      await prisma.booking.create({
        data: {
          studentId,
          tutorProfileId,
          categoryId,
          scheduledAt,
          durationMinutes: seed.durationMinutes,
          status: seed.status,
        },
      });
    }
  }

  console.log("Seeded bookings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
