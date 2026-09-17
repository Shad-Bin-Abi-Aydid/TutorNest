"use client";

import { Star } from "lucide-react";
import { useState } from "react";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ReviewForm({ bookingId }: { bookingId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    // Now we send the data to the backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookingId,
        rating,
        comment
      })
    })

    const result = await res.json();

    if (!res.ok) {
      const message = result.message ?? "Something went wrong!";
      setError(message);
      toast.error(message);
      return;
    }

    // reset the form and close the dialog on success
    setError("");
    setComment("");
    setRating(0)
    setOpen(false);
    toast.success("Your review is published! ");
    router.refresh()
    
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Write a Review</Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Rate Your Session</DialogTitle>
          <DialogDescription>
            Share your experience to help other students choose the right tutor.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-1.5">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="comment">Comment (optional)</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Tell others about your experience with this tutor..."
              rows={4}
              onChange={(e) =>{setComment(e.target.value)}}
              value={comment}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
