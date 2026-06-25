"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function exchangeCode() {
      const code = searchParams.get("code");

      if (!code) {
        setError("Missing authentication code.");
        return;
      }

      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        setError(exchangeError.message);
        return;
      }

      router.replace("/");
      router.refresh();
    }

    exchangeCode();
  }, [router, searchParams]);

  return (
    <div className="w-full max-w-sm rounded-md border border-[#ead8cc] bg-[#fffaf7] p-6 text-center shadow-[0_24px_70px_rgba(74,51,41,0.12)]">
      <h1 className="font-display text-xl font-semibold text-[#2d211b]">
        {error ? "Authentication failed" : "Signing you in..."}
      </h1>
      {error ? (
        <>
          <p className="mt-3 text-sm leading-6 text-[#72594b]">{error}</p>
          <Link
            href={`/auth?error=${encodeURIComponent(error)}`}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-[#9f3f1f] px-4 text-sm font-medium text-white transition-colors hover:bg-[#823219]"
          >
            Back to sign in
          </Link>
        </>
      ) : (
        <p className="mt-3 text-sm leading-6 text-[#72594b]">
          Please wait a moment.
        </p>
      )}
    </div>
  );
}
