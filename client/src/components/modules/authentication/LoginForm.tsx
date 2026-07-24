"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import z from "zod";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { handleGoogleSignIn } from "./auth.action";

interface LoginFormProps {
  heading?: string;
  buttonText?: string;
  className?: string;
}

// zod validation schema
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum length is 8"),
});

const LoginForm = ({
  heading = "Welcome Back",
  buttonText = "Login",
  className,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate the inputs according to the formSchema
    const result = formSchema.safeParse({ email, password });

    // if the zod validation is not success
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message ?? "Something went wrong!");
      return;
    }

    router.push("/");
  };

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
          <h1 className="text-xl font-semibold">{heading}</h1>

          <form
            className="flex w-full flex-col gap-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
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

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
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
