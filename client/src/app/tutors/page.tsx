import TutorFiltersForm from "@/components/tutors/TutorFiltersForm";
import TutorList from "@/components/tutors/TutorList";
import { Category, TutorFilters } from "@/types/tutor.type";

function firstOf(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const filters: TutorFilters = {
    search: firstOf(params.search),
    categoryId: firstOf(params.categoryId),
    minPrice: firstOf(params.minPrice),
    maxPrice: firstOf(params.maxPrice),
    minRating: firstOf(params.minRating),
    sortBy: firstOf(params.sortBy),
    sortOrder: firstOf(params.sortOrder),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  const result = await res.json();

  const categories: Category[] = result.data ?? [];

  return (
    <div>
      <section className="container mx-auto flex items-center justify-between gap-4 pt-16 pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Find Your Tutor
          </h1>
          <p className="mt-1 text-muted-foreground">
            Browse verified tutors and filter by subject, price, and rating.
          </p>
        </div>
        <TutorFiltersForm categories={categories} />
      </section>

      <TutorList filters={filters} />
    </div>
  );
}
