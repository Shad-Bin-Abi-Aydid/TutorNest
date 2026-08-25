import BookingList from "@/components/modules/bookings/BookingList";

export default function StudentDashboard() {
  return (
    <div>
      <section className="container mx-auto pt-16 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Bookings
        </h1>
        <p className="mt-1 text-muted-foreground">
          View your upcoming and past tutoring sessions.
        </p>
      </section>

      <BookingList />
    </div>
  );
}
