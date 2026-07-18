import type { ReactNode } from "react";
import { ArrowLeft, BadgeCheck, GraduationCap, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryBadgeColor } from "@/components/tutors/TutorCard";
import type { TutorProfile } from "@/types/tutor.type";
import TutorReviews from "@/components/tutors/TutorReviews";


export default async function TutorDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tutor-profiles/${id}`,
  );
  const result = await res.json();

  if (!result.data) {
    notFound();
  }

  const tutor: TutorProfile = result.data;
  const { image, bio, experienceYears, pricePerHour, avgRating } = tutor;
  const { name } = tutor.user;
  const categoryNames = tutor.categories.map((c) => c.category.name);


  

  return (
    <div>
      {/* Profile banner */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/15 via-background to-chart-2/15" />
        <div className="container mx-auto pt-6">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tutors
          </Link>
        </div>
        <div className="container mx-auto flex flex-col items-center gap-6 py-10 text-center md:flex-row md:items-end md:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element -- tutor-uploaded image URLs aren't configured for next/image yet */}
          <img
            alt={name}
            src={image || "/placeholder-avatar.png"}
            className="h-36 w-36 shrink-0 rounded-2xl object-cover ring-4 ring-background"
          />

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {name}
              </h1>
              <div className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-sm font-medium ring-1 ring-foreground/10">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {avgRating ? avgRating.toFixed(1) : "New"}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {categoryNames.map((categoryName) => (
                <span
                  key={categoryName}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${categoryBadgeColor(categoryName)}`}
                >
                  {categoryName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto grid gap-8 py-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About {name.split(" ")[0]}</CardTitle>
            </CardHeader>
            <CardContent className="leading-relaxed text-muted-foreground">
              {bio}
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <StatTile
              icon={<GraduationCap className="h-5 w-5" />}
              value={experienceYears}
              label={experienceYears === 1 ? "Year experience" : "Years experience"}
            />
            <StatTile
              icon={<Star className="h-5 w-5" />}
              value={avgRating ? avgRating.toFixed(1) : "New"}
              label="Average rating"
            />
            <StatTile
              icon={<BadgeCheck className="h-5 w-5" />}
              value="Verified"
              label="Tutor status"
            />
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold">${pricePerHour}</span>
                <span className="text-sm text-muted-foreground">/ hour</span>
              </div>
              <Button size="lg" className="w-full">
                Book Session
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You won&apos;t be charged yet
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Review */}
      <TutorReviews tutorProfileId={tutor.id}></TutorReviews>
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-muted/50 p-4 text-center">
      <div className="text-primary">{icon}</div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
