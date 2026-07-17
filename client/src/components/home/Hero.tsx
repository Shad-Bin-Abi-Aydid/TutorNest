import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn("relative overflow-hidden py-20 md:py-32", className)}>
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/15 via-background to-chart-2/15" />
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Find the right{" "}
          <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            tutor
          </span>{" "}
          for you
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground md:text-lg">
          Browse qualified tutors by subject, book sessions that fit your
          schedule, and learn at your own pace.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/tutors">Find a Tutor</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/become-a-tutor">Become a Tutor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero };
