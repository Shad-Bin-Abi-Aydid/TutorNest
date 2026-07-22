import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { TutorProfile } from "@/types/tutor.type";

import TutorCard from "@/components/modules/tutors/TutorCard";

export default async function FeaturedTutors() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tutor-profiles?sortBy=rating&sortOrder=desc`,
  );
  const result = await res.json();
  
  const tutors: TutorProfile[] = result.data ?? [];


  if (tutors.length === 0) {
    return (
      <section className="bg-muted/40 py-16 text-center">
        <p className="text-muted-foreground">No tutors available yet.</p>
      </section>
    );
  }

  const featuredTutors = tutors.slice(0, 6);

  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight">
          Featured Tutors
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/tutors">See More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
