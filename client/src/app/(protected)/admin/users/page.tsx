import { headers } from "next/headers";

import UsersTable from "@/components/modules/users/UsersTable";
import { User } from "@/types/user.type";

export default async function AdminUsersPage() {
  const requestHeaders = await headers();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: { cookie: requestHeaders.get("cookie") ?? "" },
  });

  const result = await res.json();

  const users: User[] = result.data ?? [];

  return (
    <div className="flex flex-col gap-6 px-4 py-4 lg:px-6 lg:py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-muted-foreground">
          Manage user roles and account status.
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
