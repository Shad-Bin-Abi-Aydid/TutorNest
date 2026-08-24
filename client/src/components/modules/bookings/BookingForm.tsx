"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { TutorProfile } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function BookingForm({
  tutorProfileId,
  categories,
}: {
  tutorProfileId: string;
  categories: TutorProfile["categories"];
}) {
  const getSession = authClient.useSession();
  const router = useRouter();
  const [scheduledTime, setScheduleTime] = useState("");
  const [durationTime, setDurationTime] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      // check the login user
      if (!getSession.data) {
        toast.error("Please login to book a session");
        router.push("/login");
        return;
      }

      // check the login user student or not
      if (getSession.data?.user.role !== "STUDENT") {
        toast.error("Only students can book sessions");
        return;
      }
    }

    setOpen(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!categoryId || !scheduledTime || !durationTime) {
      setError("Please fill in the fields");
      return;
    }

    const durationMinutes = Number(durationTime);

    // Now we need to send the data to the backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutorProfileId,
        categoryId,
        scheduledAt: new Date(scheduledTime).toISOString(),
        durationMinutes,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      const message = result.message ?? "Something went wrong!";
      setError(message);
      toast.error(message);
      return;
    }

    // reset the form and close the dialog on success
    setError("");
    setCategoryId("");
    setScheduleTime("");
    setDurationTime("");
    setOpen(false);
    toast.success("Session booked! We'll see you there.");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full" disabled={getSession.isPending}>
          Book Session
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>
            Choose a subject, date, and duration for your session.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="category">Subject</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.categoryId} value={c.categoryId}>
                    {c.category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="scheduledAt">Date &amp; Time</Label>
            <Input
              id="scheduledAt"
              name="scheduledAt"
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => {
                setScheduleTime(e.target.value);
              }}
              required
            />
          </div>

          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="duration">Duration</Label>
            <Select value={durationTime} onValueChange={setDurationTime}>
              <SelectTrigger id="duration" className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
