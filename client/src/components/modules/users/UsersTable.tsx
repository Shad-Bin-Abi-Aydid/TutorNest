"use client";

import { Pencil, Trash2 } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const ROLE_STYLES: Record<User["role"], string> = {
  STUDENT: "bg-primary/10 text-primary",
  TUTOR: "bg-chart-2/15 text-chart-2",
  ADMIN: "bg-chart-4/15 text-chart-4",
};

const STATUS_STYLES: Record<User["status"], string> = {
  ACTIVE: "bg-green-500/15 text-green-600",
  BLOCKED: "bg-red-500/15 text-red-600",
};

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  // delete user
  const handleDeleteUser = async (userId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
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

    toast.success("User Deleted.");

    router.refresh();
  };

  // Update user
  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: string,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const role = formData.get("role");
    const status = formData.get("status");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          status,
        }),
      },
    );

    if (!res.ok) {
      const result = await res.json();
      toast.error(result.message ?? "Something went wrong!");
      return;
    }

    toast.success("User details updated.");
    setOpenEditId(null);

    router.refresh();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-2">
          All Users
          <span className="text-sm font-normal text-muted-foreground">
            {users.length}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {users.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No users yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Name
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Role
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${ROLE_STYLES[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Dialog
                        open={openEditId === user.id}
                        onOpenChange={(isOpen) =>
                          setOpenEditId(isOpen ? user.id : null)
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
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>
                              Update {user.name}&apos;s role and status.
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            className="flex flex-col gap-y-4"
                            onSubmit={(e) => handleUpdateUser(e, user.id)}
                          >
                            <div className="flex flex-col gap-y-1.5">
                              <Label htmlFor={`role-${user.id}`}>Role</Label>
                              <Select name="role" defaultValue={user.role}>
                                <SelectTrigger id={`role-${user.id}`}>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="STUDENT">
                                    Student
                                  </SelectItem>
                                  <SelectItem value="TUTOR">Tutor</SelectItem>
                                  <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex flex-col gap-y-1.5">
                              <Label htmlFor={`status-${user.id}`}>
                                Status
                              </Label>
                              <Select name="status" defaultValue={user.status}>
                                <SelectTrigger id={`status-${user.id}`}>
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ACTIVE">Active</SelectItem>
                                  <SelectItem value="BLOCKED">
                                    Blocked
                                  </SelectItem>
                                </SelectContent>
                              </Select>
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
                            <DialogTitle>Delete User</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete &quot;
                              {user.name}&quot;? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => handleDeleteUser(user.id)}
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
