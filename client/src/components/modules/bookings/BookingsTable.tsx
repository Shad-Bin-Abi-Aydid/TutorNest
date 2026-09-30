import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "@/types/booking.type";

const STATUS_STYLES: Record<Booking["status"], string> = {
  PENDING: "bg-amber-500/15 text-amber-600",
  CONFIRMED: "bg-primary/10 text-primary",
  COMPLETED: "bg-green-500/15 text-green-600",
  CANCELLED: "bg-red-500/15 text-red-600",
};

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-2">
          All Bookings
          <span className="text-sm font-normal text-muted-foreground">
            {bookings.length}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {bookings.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No bookings yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Student
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Tutor
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Subject
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Date &amp; Time
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Duration
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.student.name}
                  </TableCell>
                  <TableCell>{booking.tutorProfile.user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {booking.category.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(booking.scheduledAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {booking.durationMinutes} min
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
