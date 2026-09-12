"use client";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STATUS_STYLES: Record<Booking["status"], string> = {
  PENDING: "bg-amber-500/15 text-amber-600",
  CONFIRMED: "bg-primary/10 text-primary",
  COMPLETED: "bg-green-500/15 text-green-600",
  CANCELLED: "bg-red-500/15 text-red-600",
};

export default function BookingCard({
  booking,
  role = "STUDENT",
}: {
  booking: Booking;
  role?: "STUDENT" | "TUTOR";
}) {
  const { tutorProfile, category, scheduledAt, durationMinutes, status } =
    booking;

  const router = useRouter();
  const formattedDate = new Date(scheduledAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleStatus = async (newStatus: Booking["status"]) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${booking.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      const message = result.message ?? "Something went wrong!";
      toast.error(message);
      return;
    }

    toast.success(`Booking ${newStatus} successfully.`);

    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            {role === "TUTOR" ? booking.student.name : tutorProfile.user.name}
          </CardTitle>
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

      <CardFooter>
        <Button
          onClick={() => handleStatus("CANCELLED")}
          variant="destructive"
          size="sm"
          disabled={status === "CANCELLED" || status === "COMPLETED"}
        >
          Cancel Booking
        </Button>
        {role === "TUTOR" && (
          <>
            <Button
              onClick={() => handleStatus("CONFIRMED")}
              size="sm"
              disabled={status !== "PENDING"}
            >
              Confirm Booking
            </Button>

            <Button
              onClick={() => {
                const sessionEndTime =
                  new Date(scheduledAt).getTime() + durationMinutes * 60 * 1000;
                const hasEnded = Date.now() >= sessionEndTime;

                if(!hasEnded) {
                  toast.error("You can mark this session as completed once it has ended.");
                  return;
                }
                handleStatus("COMPLETED");

              }}
              size="sm"
              disabled={status !== "CONFIRMED"}
            >
              Completed Booking
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
