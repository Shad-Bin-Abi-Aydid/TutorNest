import BookingList from "@/components/modules/bookings/BookingList";
import CreateTutorProfileForm from "@/components/modules/tutorProfile/CreateTutorProfileForm";
import { Category } from "@/types/tutor.type";
import { headers } from "next/headers";
import React from "react";

export default async function TutorDashboard() {
  const requestHeaders = await headers();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tutor-profiles/me`,
    {
      headers: { cookie: requestHeaders.get("cookie") ?? "" },
    },
  );

  if (res.status === 404) {
    // fetching categories
    const categoriesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    );

    const categoriesResult = await categoriesRes.json();
    const category: Category[] = categoriesResult.data ?? [];

    
    return (
      <CreateTutorProfileForm categories={category}></CreateTutorProfileForm>
    );
  }

  const result = await res.json();

  const emptyMessage =
      "You don't have any bookings yet. Once a student books a session with you, it'll show up here.";


  return <BookingList emptyMessage = {emptyMessage} role = "TUTOR"/>;
}
