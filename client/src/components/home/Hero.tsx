import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn("py-20 md:py-32", className)}>
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Find the right tutor for you
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
