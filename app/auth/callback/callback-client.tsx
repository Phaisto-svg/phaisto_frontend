"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AUTHENTICATED_HOME } from "@/app/auth-provider";
import { supabase } from "@/lib/supabase/client";

export function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasExchangedCode = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function exchangeCode() {
      if (hasExchangedCode.current) {
        return;
      }

      hasExchangedCode.current = true;

      const providerError =
        searchParams.get("error_description") ?? searchParams.get("error");

      if (providerError) {
        setError(providerError);
        return;
      }

      const code = searchParams.get("code");

      if (!code) {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          router.replace(AUTHENTICATED_HOME);
          return;
        }

        router.replace("/auth");
        return;
      }

      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        setError(exchangeError.message);
        return;
      }

      router.replace(AUTHENTICATED_HOME);
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
