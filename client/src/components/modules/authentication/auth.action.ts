import { authClient } from "@/lib/auth-client";

export const handleGoogleSignIn = () => {
  authClient.signIn.social({ provider: "google", callbackURL: "/" });
};