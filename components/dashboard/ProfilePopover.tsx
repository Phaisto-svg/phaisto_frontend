"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/app/auth-provider";

function getInitials(name?: string | null, email?: string | null) {
  const source = name || email || "Phaisto User";
  const parts = source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2);

  return parts.map((part) => part[0]?.toUpperCase()).join("") || "PU";
}

type ProfilePopoverProps = {
  collapsed?: boolean;
};

export function ProfilePopover({ collapsed = false }: ProfilePopoverProps) {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const profile = useMemo(() => {
    const fullName =
      typeof user?.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null;
    const avatarUrl =
      typeof user?.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : null;
    const email = user?.email ?? null;

    return {
      avatarUrl,
      email,
      name: fullName || email || "Phaisto User",
      initials: getInitials(fullName, email),
    };
  }, [user]);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await signOut();
      router.push("/auth");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={[
          "flex w-full items-center rounded-md bg-transparent p-3 text-left transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c87755] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf7]",
          collapsed ? "justify-center" : "gap-3",
        ].join(" ")}
        aria-label="User profile"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2d211b] text-sm font-semibold text-white">
          {profile.avatarUrl ? (
            <span
              aria-hidden="true"
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.avatarUrl})` }}
            />
          ) : (
            profile.initials
          )}
        </span>

        <span className={collapsed ? "hidden" : "min-w-0"}>
          <span className="block truncate text-sm font-semibold text-[#2d211b]">
            {loading ? "Loading profile" : profile.name}
          </span>
          <span className="block truncate text-xs text-[#72594b]">
            {profile.email || "Workspace profile"}
          </span>
        </span>
      </button>

      <div className="pointer-events-none absolute bottom-0 left-full z-20 hidden min-w-44 pl-3 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:flex group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:flex group-focus-within:opacity-100">
        <div className="rounded-md border border-[#ead8cc] bg-white p-2 shadow-[0_24px_70px_rgba(74,51,41,0.18)]">
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md px-4 text-sm font-semibold text-[#9f3f1f] transition-colors hover:bg-[#fffaf7] disabled:opacity-60"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
}
