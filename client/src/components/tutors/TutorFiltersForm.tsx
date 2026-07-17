"use client";
import { Category } from "@/types/tutor.type";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Menu } from "lucide-react";

export default function TutorFiltersForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateFilter = (updates: { [key: string]: string }) => {
    const keyPairValues = Object.entries(updates);

    const params = new URLSearchParams(searchParams.toString());

    keyPairValues.forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const sortValue = searchParams.get("sortBy")
    ? `${searchParams.get("sortBy")}:${searchParams.get("sortOrder")}`
    : "default";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 p-4">
          {/* Search */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search tutors..."
              value={searchParams.get("search") ?? ""}
              onChange={(e) => updateFilter({ search: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <Label>Category</Label>
            <Select
              value={searchParams.get("categoryId") || "all"}
              onValueChange={(value) =>
                updateFilter({ categoryId: value === "all" ? "" : value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="minPrice">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={searchParams.get("minPrice") ?? ""}
                onChange={(e) => updateFilter({ minPrice: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Any"
                value={searchParams.get("maxPrice") ?? ""}
                onChange={(e) => updateFilter({ maxPrice: e.target.value })}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1.5">
            <Label>Minimum Rating</Label>
            <Select
              value={searchParams.get("minRating") || "any"}
              onValueChange={(value) =>
                updateFilter({ minRating: value === "any" ? "" : value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-1.5">
            <Label>Sort By</Label>
            <Select
              value={sortValue}
              onValueChange={(value) => {
                if (value === "default") {
                  updateFilter({ sortBy: "", sortOrder: "" });
                  return;
                }
                const [sortBy, sortOrder] = value.split(":");
                updateFilter({ sortBy, sortOrder });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="pricePerHour:asc">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="pricePerHour:desc">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating:desc">Rating: High to Low</SelectItem>
                <SelectItem value="experienceYears:desc">
                  Most Experienced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
