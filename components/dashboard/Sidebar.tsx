"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProfilePopover } from "@/components/dashboard/ProfilePopover";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Past contents",
    href: "/dashboard/past-contents",
  },
  {
    label: "Asset library",
    href: "/dashboard/asset-library",
  },
  {
    label: "Business profile summary",
    href: "/dashboard/business-profile-summary",
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={[
        "relative flex flex-col overflow-visible border-b border-[#ead8cc] bg-[#fffaf7] transition-all duration-300 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r",
        isCollapsed ? "w-full lg:w-20" : "w-full lg:w-72",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-24 items-center gap-3 px-5",
          isCollapsed ? "justify-start lg:justify-center lg:px-3" : "justify-start",
        ].join(" ")}
      >
        <Link
          href="/dashboard"
          aria-label="Phaisto home"
          className={[
            "flex min-w-0 items-center",
            isCollapsed ? "lg:justify-center" : "",
          ].join(" ")}
        >
          <Image
            src={isCollapsed ? "/phaisto_logo_rough.png" : "/Phaisto_2 (2).png"}
            alt="Phaisto"
            width={isCollapsed ? 42 : 150}
            height={isCollapsed ? 42 : 84}
            priority
            className={[
              "h-auto object-contain transition-all",
              isCollapsed ? "w-10" : "w-36",
            ].join(" ")}
          />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsCollapsed((current) => !current)}
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
        aria-expanded={!isCollapsed}
        className="absolute right-5 top-7 z-30 flex h-10 w-20 items-center justify-center rounded-full border border-[#ead8cc] bg-white text-sm font-semibold text-[#6f5548] shadow-[0_12px_35px_rgba(74,51,41,0.14)] transition-colors hover:border-[#d8b9a7] hover:bg-[#fffaf7] hover:text-[#2d211b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c87755] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf7] lg:-right-5 lg:w-10"
      >
        <span className="lg:hidden">{isCollapsed ? "Open" : "Close"}</span>
        <span aria-hidden="true" className="hidden text-lg leading-none lg:block">
          {isCollapsed ? ">" : "<"}
        </span>
      </button>

      <nav
        aria-label="Dashboard navigation"
        className={[
          "gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-x-visible lg:px-5 lg:py-6",
          isCollapsed ? "hidden" : "flex",
        ].join(" ")}
      >
        {navigationItems.map((item) => {
          const isActive = item.label === "Dashboard";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "flex h-11 shrink-0 items-center rounded-md px-4 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#9f3f1f] text-white shadow-sm"
                  : "text-[#6f5548] hover:bg-white hover:text-[#2d211b]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={isCollapsed ? "mt-auto hidden p-3 lg:block" : "mt-auto p-5"}>
        <ProfilePopover collapsed={isCollapsed} />
      </div>
    </aside>
  );
}
