import { TutorFilters, TutorProfile } from "@/types/tutor.type";
import TutorCard from "./TutorCard";

export default async function TutorList({
  filters,
}: {
  filters: TutorFilters;
}) {
  //  filters is object and maybe have some undefined values
  // so we need to ignore those undefine values

  const keyPairValues = Object.entries(filters);

  // Now we check which one is undefine
  const definedEntries = keyPairValues.filter(
    ([, value]) => value != undefined,
  );

  // Now turns it back to into a plain object
  const plainObject = Object.fromEntries(definedEntries);

  // Now make it a query string
  const queryString = new URLSearchParams(plainObject).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tutor-profiles?${queryString}`,
  );
  const result = await res.json();

  const tutors: TutorProfile[] = result.data ?? [];

  if (tutors.length === 0) {
    return (
      <section className="container mx-auto py-16 text-center">
        <p className="text-muted-foreground">No tutors available yet.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-16">
      <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight">
        All Tutors
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
