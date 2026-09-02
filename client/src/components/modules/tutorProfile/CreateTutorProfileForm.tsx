"use client";
import { categoryBadgeColor } from "@/components/modules/tutors/TutorCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTutorProfileForm({
  categories,
}: {
  categories: Category[];
}) {
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [pricePerHour, setPricePerHours] = useState(0);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const router = useRouter();

  const toggleCategory = (categoryId: string) => {
    setCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleCreateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tutor-profiles`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          experienceYears,
          pricePerHour,
          categoryIds,
        }),
      },
    );

    const result = await res.json();
    if (!res.ok) {
      toast.error(result.message ?? "Something went wrong!");
      return;
    }

    toast.success("Profile created! You're now visible to students.");

    

    router.refresh();
  };
  return (
    <div className="container mx-auto max-w-2xl py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Complete Your Tutor Profile
          </CardTitle>
          <CardDescription>
            Tell students about yourself so they can find and book you.
          </CardDescription>
        </CardHeader>

        <form className="flex flex-col gap-y-6" onSubmit={handleCreateProfile}>
          <CardContent className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell students about your teaching style, background, and experience..."
                rows={5}
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-1.5">
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  min={0}
                  placeholder="e.g. 3"
                  value={experienceYears}
                  onChange={(e) => {
                    setExperienceYears(Number(e.target.value));
                  }}
                  required
                />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <Label htmlFor="pricePerHour">Price per Hour ($)</Label>
                <Input
                  id="pricePerHour"
                  name="pricePerHour"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="e.g. 25"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHours(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Subjects You Teach</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = categoryIds.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        isSelected
                          ? categoryBadgeColor(category.name)
                          : "bg-muted text-muted-foreground hover:bg-muted/70"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" size="lg">
              Create Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
