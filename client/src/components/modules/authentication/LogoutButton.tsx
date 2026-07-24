"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  buttonText?: string;
  className?: string;
}


const LogoutButton = ({
  buttonText = "Logout",
  className,
}: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
   
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(className)}
      onClick={handleLogout}
    >
      {buttonText}
    </Button>
  );
};

export { LogoutButton };
