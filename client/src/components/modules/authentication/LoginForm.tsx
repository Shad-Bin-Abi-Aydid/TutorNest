"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  heading?: string;
  buttonText?: string;
  className?: string;
}

// zod validation schema


const LoginForm = ({
  heading = "Welcome Back",
  buttonText = "Login",
  className,
}: LoginFormProps) => {
  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
          <h1 className="text-xl font-semibold">{heading}</h1>

          <form className="flex w-full flex-col gap-y-4">
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </form>

          <div className="flex w-full items-center gap-x-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button type="button" variant="outline" className="w-full">
            <FcGoogle className="size-4" />
            Continue with Google
          </Button>

          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>New here?</p>
            <a
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { LoginForm };
