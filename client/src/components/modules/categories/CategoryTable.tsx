"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types/tutor.type";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CategoryTable({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  // Added a category
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSubject,
        }),
      },
    );

    const result = await res.json();
    if (!res.ok) {
      toast.error(result.message ?? "Something went wrong!");
      return;
    }

    toast.success("Category Created!.");
    setOpen(false);
    setNewSubject("");

    router.refresh();
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const result = await res.json();
      toast.error(result.message ?? "Something went wrong!");
      return;
    }

    toast.success("Category Deleted.");

    router.refresh();
  };

  // Update a category
  const updateCategory = async (
    e: React.FormEvent<HTMLFormElement>,
    categoryId: string,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      },
    );

    if (!res.ok) {
      const result = await res.json();
      toast.error(result.message ?? "Something went wrong!");
      return;
    }

    toast.success("Category updated.");
    setOpenEditId(null);


    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-baseline gap-2">
          All Categories
          <span className="text-sm font-normal text-muted-foreground">
            {categories.length}
          </span>
        </CardTitle>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Create a new subject category for tutors to select from.
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleAddCategory}
            >
              <div className="flex flex-col gap-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Mathematics"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {categories.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No categories yet. Add one to get started.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Dialog
                        open={openEditId === category.id}
                        onOpenChange={(isOpen) =>
                          setOpenEditId(isOpen ? category.id : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                              Update this category&apos;s name.
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            className="flex flex-col gap-y-4"
                            onSubmit={(e) => updateCategory(e, category.id)}
                          >
                            <div className="flex flex-col gap-y-1.5">
                              <Label htmlFor={`edit-name-${category.id}`}>
                                Name
                              </Label>
                              <Input
                                id={`edit-name-${category.id}`}
                                name="name"
                                defaultValue={category.name}
                                required
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="w-full">
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Category</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete &quot;
                              {category.name}&quot;? This action cannot be
                              undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
