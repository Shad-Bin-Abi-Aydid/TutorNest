import { headers } from "next/headers";

import BookingsTable from "@/components/modules/bookings/BookingsTable";
import { Booking } from "@/types/booking.type";

export default async function AdminBookingsPage() {
  const requestHeaders = await headers();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
    headers: {
      cookie: requestHeaders.get("cookie") ?? "",
    },
  });
  const result = await res.json();

  const bookings: Booking[] = result.data ?? [];

  return (
    <div className="flex flex-col gap-6 px-4 py-4 lg:px-6 lg:py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
        <p className="mt-1 text-muted-foreground">
          View every session booked across the platform.
        </p>
      </div>

      <BookingsTable bookings={bookings} />
    </div>
  );
}
