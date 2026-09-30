import { headers } from "next/headers";

import AdminOverviewStats from "@/components/modules/admin/AdminOverviewStats";
import { Booking } from "@/types/booking.type";

export default async function AdminOverviewPage() {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie") ?? "";

  const [usersRes, categoriesRes, bookingsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      headers: { cookie },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
      headers: { cookie },
    }),
  ]);

  const [usersResult, categoriesResult, bookingsResult] = await Promise.all([
    usersRes.json(),
    categoriesRes.json(),
    bookingsRes.json(),
  ]);

  const totalUsers = (usersResult.data ?? []).length;
  const totalCategories = (categoriesResult.data ?? []).length;
  const bookings: Booking[] = bookingsResult.data ?? [];
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;

  return (
    <div className="flex flex-col gap-6 px-4 py-4 lg:px-6 lg:py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          A quick overview of your platform.
        </p>
      </div>

      <AdminOverviewStats
        totalUsers={totalUsers}
        totalCategories={totalCategories}
        totalBookings={totalBookings}
        pendingBookings={pendingBookings}
      />
    </div>
  );
}
