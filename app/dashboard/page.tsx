import { BusinessProfileSummary } from "@/components/dashboard/BusinessProfileSummary";
import { RecentContent } from "@/components/dashboard/RecentContent";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SummaryCard } from "@/components/dashboard/SummaryCard";

const performanceStats = [
  {
    label: "Content generated",
    value: "28",
    detail: "+6 this week",
  },
  {
    label: "Assets uploaded",
    value: "86",
    detail: "+12 new",
  },
  {
    label: "Posts published",
    value: "14",
    detail: "4 channels",
  },
  {
    label: "Drafts ready",
    value: "9",
    detail: "needs review",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <section className="rounded-md border border-[#ead8cc] bg-white p-6 shadow-[0_24px_70px_rgba(74,51,41,0.08)] sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase text-[#a34724]">
                    Dashboard
                  </p>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#2d211b] sm:text-4xl">
                    Welcome back to your content workspace
                  </h1>
                  <p className="mt-4 text-base leading-7 text-[#72594b]">
                    Review recent work, monitor content activity, and request
                    new polished social content for your business.
                  </p>
                </div>

                <button className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#9f3f1f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#823219] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c87755] focus-visible:ring-offset-2 sm:w-fit">
                  Request New Content
                </button>
              </div>
            </section>

            <section>
              <div className="mb-4 flex flex-col gap-1">
                <h2 className="font-display text-xl font-semibold text-[#2d211b]">
                  Performance Overview
                </h2>
                <p className="text-sm text-[#72594b]">
                  Workload and publishing activity at a glance.
                </p>
              </div>
              <div
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                aria-label="Performance overview"
              >
                {performanceStats.map((stat) => (
                  <SummaryCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    detail={stat.detail}
                  />
                ))}
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
              <RecentContent />
              <BusinessProfileSummary />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
