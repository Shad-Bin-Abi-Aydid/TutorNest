import { headers } from "next/headers";

import { Booking } from "@/types/booking.type";
import BookingCard from "./BookingCard";

export default async function BookingList() {
  const requestHeaders = await headers();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
    headers: {
      cookie: requestHeaders.get("cookie") ?? "",
    },
  });

  if (res.status === 404) {
    return (
      <section className="container mx-auto py-16 text-center">
        <p className="text-muted-foreground">
          You have no bookings yet. Browse tutors to schedule your first
          session.
        </p>
      </section>
    );
  }

  const result = await res.json();
  const bookings: Booking[] = result.data ?? [];

  return (
    <section className="container mx-auto pt-4 pb-16">
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  );
}
