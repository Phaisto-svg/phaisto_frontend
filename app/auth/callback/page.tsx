import { Suspense } from "react";
import { AuthCallbackClient } from "./callback-client";

export default function AuthCallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <Suspense fallback={null}>
        <AuthCallbackClient />
      </Suspense>
    </main>
  );
}
