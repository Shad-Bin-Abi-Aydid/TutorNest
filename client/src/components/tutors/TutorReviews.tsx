import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/types/tutor.type";

export default async function TutorReviews({
  tutorProfileId,
}: {
  tutorProfileId: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/tutor/${tutorProfileId}`,
  );
  const result = await res.json();

  const reviews: Review[] = result.data ?? [];

  return (
    <section className="container mx-auto py-12">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        Reviews{reviews.length > 0 && ` (${reviews.length})`}
      </h2>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">
          No reviews yet — be the first to book and leave one.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {review.student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{review.student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {review.comment && (
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
