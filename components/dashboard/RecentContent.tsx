const recentContent = [
  {
    title: "Summer service announcement",
    channel: "Instagram",
    status: "Draft",
    date: "Today",
  },
  {
    title: "Customer review carousel",
    channel: "LinkedIn",
    status: "Ready",
    date: "Yesterday",
  },
  {
    title: "Weekend promotion post",
    channel: "Facebook",
    status: "Published",
    date: "Jun 24",
  },
];

export function RecentContent() {
  return (
    <section className="rounded-md border border-[#ead8cc] bg-white p-5 shadow-[0_16px_45px_rgba(74,51,41,0.06)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-[#2d211b]">
            Recent Content Overview
          </h2>
          <p className="mt-1 text-sm text-[#72594b]">
            A quick view of the latest generated and published content.
          </p>
        </div>
        <button className="w-fit text-sm font-semibold text-[#9f3f1f] transition-colors hover:text-[#823219]">
          View past contents
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        {recentContent.map((content) => (
          <article
            key={content.title}
            className="rounded-md border border-[#f0e1d7] bg-[#fffaf7] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-[#2d211b]">
                  {content.title}
                </h3>
                <p className="mt-1 text-sm text-[#72594b]">
                  {content.channel} - {content.date}
                </p>
              </div>
              <span className="w-fit rounded-md border border-[#e4cdbf] bg-white px-3 py-1 text-xs font-semibold uppercase text-[#6f5548]">
                {content.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
