import CategoryTable from "@/components/modules/categories/CategoryTable";
import { Category } from "@/types/tutor.type";

export default async function AdminCategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);

  const result = await res.json();

  const category: Category[] = result.data ?? [];

  return (
    <div className="flex flex-col gap-6 px-4 py-4 lg:px-6 lg:py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-1 text-muted-foreground">
          Manage the subjects tutors can teach and students can search by.
        </p>
      </div>

      <CategoryTable categories={category} />
    </div>
  );
}
