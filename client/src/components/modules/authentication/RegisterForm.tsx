"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { z } from "zod";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { handleGoogleSignIn } from "./auth.action";

interface RegisterFormProps {
  heading?: string;
  buttonText?: string;
  className?: string;
}

// Zod schema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
  role: z.enum(["STUDENT", "TUTOR"]),
});

const RegisterForm = ({
  heading = "Create an Account",
  buttonText = "Create Account",
  className,
}: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const initialRole = roleParam === "TUTOR" ? "TUTOR" : "STUDENT";
  const [role, setRole] = useState(initialRole);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Your password didn't match!");
      return;
    }

    // validate the form input with the formSchema
    const result = formSchema.safeParse({ name, email, password, role });

    // if getting wrong input
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    const { data, error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message ?? "Something went wrong");
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                required
              />
            </div>

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
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TUTOR">Tutor</SelectItem>
                </SelectContent>
              </Select>
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
            <p>Already a user?</p>
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { RegisterForm };
