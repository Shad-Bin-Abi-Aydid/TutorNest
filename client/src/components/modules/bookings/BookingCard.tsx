import { Calendar, Clock } from "lucide-react";

import { categoryBadgeColor } from "@/components/modules/tutors/TutorCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Booking } from "@/types/booking.type";

const STATUS_STYLES: Record<Booking["status"], string> = {
  PENDING: "bg-amber-500/15 text-amber-600",
  CONFIRMED: "bg-primary/10 text-primary",
  COMPLETED: "bg-green-500/15 text-green-600",
  CANCELLED: "bg-red-500/15 text-red-600",
};

export default function BookingCard({ booking }: { booking: Booking }) {
  const { tutorProfile, category, scheduledAt, durationMinutes, status } = booking;

  const formattedDate = new Date(scheduledAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const canCancel = status === "PENDING" || status === "CONFIRMED";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{tutorProfile.user.name}</CardTitle>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
          >
            {status}
          </span>
        </div>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryBadgeColor(category.name)}`}
        >
          {category.name}
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {durationMinutes} min
        </div>
      </CardContent>

      {canCancel && (
        <CardFooter>
          <Button variant="destructive" size="sm">
            Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
