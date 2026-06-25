"use client";

import Image from "next/image";
import Link from "next/link";
import { AUTHENTICATED_HOME, useAuth } from "@/app/auth-provider";

const links = ["About", "Features", "Pricing", "Contact"];

function Navbar() {
  const { user, loading } = useAuth();
  const ctaHref = user ? AUTHENTICATED_HOME : "/auth";
  const ctaLabel = user ? "Dashboard" : "Get started";

  return (
    <header className="w-full border-b border-[#f0e1d7] bg-transparent">
      <div className="mx-auto flex h-24 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          className="flex items-center gap-3"
          href="#"
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
        </a>

        <nav
          className="hidden items-center gap-8 text-base font-medium text-[#6f5548] md:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a
              className="transition-colors hover:text-[#9f3f1f]"
              href={`#${link.toLowerCase()}`}
              key={link}
            >
              {link}
            </a>
          ))}
        </nav>

        <Link
          href={loading ? "/auth" : ctaHref}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-[#9f3f1f] px-3 text-sm font-medium text-white transition-colors hover:bg-[#823219] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
        >
          {loading ? "Get started" : ctaLabel}
        </Link>
      </div>
    </header>
  );
}

export { Navbar };
