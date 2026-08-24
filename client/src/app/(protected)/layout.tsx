
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session.data) {
     redirect("/login");
  }

  return <div>{children}</div>;
}
