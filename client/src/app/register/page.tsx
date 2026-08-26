import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { Suspense } from "react";

export default function registerPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
