import { GraduationCap, Star } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import type { TutorProfile } from "@/types/tutor.type";

const CATEGORY_BADGE_COLORS = [
  "bg-primary/10 text-primary",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
  "bg-chart-4/15 text-chart-4",
  "bg-chart-5/15 text-chart-5",
];

export function categoryBadgeColor(name: string) {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return CATEGORY_BADGE_COLORS[hash % CATEGORY_BADGE_COLORS.length];
}

export default function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const { id, bio, experienceYears, pricePerHour, avgRating } = tutor;
  const { name, image } = tutor.user;
  const categoryNames = tutor.categories.map((c) => c.category.name);

  return (
    <Card className="flex h-full flex-col pt-0">
      <div className="flex h-36 items-center justify-center bg-linear-to-br from-primary/15 via-background to-chart-2/15">
        <Avatar className="size-24 bg-background ring-4 ring-background">
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback
            className={`text-2xl font-semibold ${categoryBadgeColor(name)}`}
          >
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{name}</CardTitle>
          <div className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {avgRating ? avgRating.toFixed(1) : "New"}
          </div>
        </div>
        <CardDescription className="line-clamp-2">{bio}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {categoryNames.map((categoryName) => (
            <span
              key={categoryName}
              className={`rounded-full px-3 py-1 text-xs font-medium ${categoryBadgeColor(categoryName)}`}
            >
              {categoryName}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          {experienceYears} {experienceYears === 1 ? "year" : "years"} experience
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          ${pricePerHour}
          <span className="text-sm font-normal text-muted-foreground">/hr</span>
        </p>
        <Button asChild size="sm">
          <Link href={`/tutors/${id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
