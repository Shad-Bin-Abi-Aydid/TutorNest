import { Calendar, Clock, Tag, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverviewStats({
  totalUsers,
  totalCategories,
  totalBookings,
  pendingBookings,
}: {
  totalUsers: number;
  totalCategories: number;
  totalBookings: number;
  pendingBookings: number;
}) {
  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users },
    { label: "Total Categories", value: totalCategories, icon: Tag },
    { label: "Total Bookings", value: totalBookings, icon: Calendar },
    { label: "Pending Bookings", value: pendingBookings, icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
