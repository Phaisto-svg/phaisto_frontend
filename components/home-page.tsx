"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTHENTICATED_HOME, useAuth } from "@/app/auth-provider";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

export function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace(AUTHENTICATED_HOME);
    }
  }, [loading, router, user]);

  if (loading || user) {
    return <main className="min-h-screen bg-white" />;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </main>
  );
}
