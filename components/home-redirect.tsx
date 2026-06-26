"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTHENTICATED_HOME, useAuth } from "@/app/auth-provider";

export function HomeRedirect() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace(AUTHENTICATED_HOME);
    }
  }, [loading, router, user]);

  return null;
}
