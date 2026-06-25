"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AUTHENTICATED_HOME, useAuth } from "@/app/auth-provider";

function getMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(
    searchParams.get("error"),
  );

  useEffect(() => {
    if (!loading && user) {
      router.push(AUTHENTICATED_HOME);
    }
  }, [loading, router, user]);

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      await signInWithEmail(email, password);
      router.push(AUTHENTICATED_HOME);
      router.refresh();
    } catch (error) {
      setMessage(getMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setMessage(null);
    setSubmitting(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      setMessage(getMessage(error));
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-[440px] rounded-md border border-[#ead8cc] bg-[#fffaf7] p-6 shadow-[0_24px_70px_rgba(74,51,41,0.12)] sm:p-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md border border-[#ead8cc] bg-white shadow-sm">
          <Image
            src="/phaisto_logo_rough.png"
            alt=""
            width={34}
            height={34}
            className="h-9 w-9 object-contain"
          />
        </div>
        <h2 className="font-display text-2xl font-semibold text-[#2d211b]">
          Welcome back
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#72594b]">
          Sign in to continue creating social posts for your business.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleEmailSignIn}>
        <label className="flex flex-col gap-2 text-sm font-medium text-[#4a3329]">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            type="email"
            autoComplete="email"
            required
            className="h-12 w-full rounded-md border border-[#e4cdbf] bg-white px-4 text-sm text-[#2d211b] outline-none transition placeholder:text-[#b29383] focus:border-[#a34724] focus:ring-2 focus:ring-[#f1d8c9]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4a3329]">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-md border border-[#e4cdbf] bg-white px-4 text-sm text-[#2d211b] outline-none transition placeholder:text-[#b29383] focus:border-[#a34724] focus:ring-2 focus:ring-[#f1d8c9]"
          />
        </label>

        {message ? (
          <p className="rounded-md border border-[#f0c6b4] bg-white px-3 py-2 text-sm text-[#9f3f1f]">
            {message}
          </p>
        ) : null}

        <div className="pt-2">
          <Button
            className="h-12 w-full bg-[#9f3f1f] text-white hover:bg-[#823219]"
            disabled={loading || submitting}
            type="submit"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </Button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#ead8cc]" />
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#9b7a68]">
              or
            </span>
            <div className="h-px flex-1 bg-[#ead8cc]" />
          </div>

          <Button
            variant="outline"
            className="h-12 w-full border-[#d8b9a7] bg-white text-[#4a3329] hover:bg-[#fbf4ef]"
            disabled={loading || submitting}
            onClick={handleGoogleSignIn}
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-5 w-5"
              viewBox="0 0 18 18"
            >
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.35 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.65 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        <p className="pt-2 text-center text-sm text-[#72594b]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#9f3f1f] underline-offset-4 hover:underline"
          >
            Start for free
          </Link>
        </p>
      </form>
    </div>
  );
}
