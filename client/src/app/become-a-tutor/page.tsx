import { Clock, DollarSign, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const VALUE_POINTS = [
  {
    icon: Clock,
    title: "Set Your Own Schedule",
    description:
      "Teach whenever it works for you. No fixed hours, no minimum commitment.",
  },
  {
    icon: DollarSign,
    title: "Set Your Own Price",
    description: "You decide what your time and expertise are worth per hour.",
  },
  {
    icon: Search,
    title: "Get Discovered",
    description:
      "Students already browse by subject, price, and rating — no marketing effort needed on your end.",
  },
];

export default function BecomeATutorPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/15 via-background to-chart-2/15" />
        <div className="container mx-auto flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Share Your Knowledge.{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Get Paid to Teach.
            </span>
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground md:text-lg">
            Join tutorNest and connect with students looking for exactly what
            you teach — set your own price, your own hours, and start
            tutoring in minutes.
          </p>
          <Button asChild size="lg">
            <Link href="/register?role=TUTOR">Get Started as a Tutor</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 gap-8 pb-20 sm:grid-cols-3">
        {VALUE_POINTS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
