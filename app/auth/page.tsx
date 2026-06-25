import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "./auth-form";

function AuthPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex h-24 items-center justify-between">
          <Link
            className="flex items-center gap-3"
            href="/"
            aria-label="Phaisto home"
          >
            <Image
              src="/Phaisto_2 (2).png"
              alt="Phaisto"
              width={160}
              height={90}
              priority
              className="h-auto w-40 object-contain"
            />
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-[#6f5548] transition-colors hover:text-[#9f3f1f]"
          >
            Back home
          </Link>
        </header>

        <section className="flex flex-1 items-center justify-center py-10 lg:py-16">
          <Suspense fallback={null}>
            <AuthForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

export default AuthPage;
