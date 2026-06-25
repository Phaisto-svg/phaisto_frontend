const profileItems = [
  ["Business type", "Local service business"],
  ["Brand voice", "Clear, warm, professional"],
  ["Primary audience", "Nearby customers and repeat buyers"],
  ["Content goals", "Awareness, trust, regular bookings"],
];

export function BusinessProfileSummary() {
  return (
    <section className="rounded-md border border-[#ead8cc] bg-[#fffaf7] p-5 shadow-[0_16px_45px_rgba(74,51,41,0.06)]">
      <h2 className="font-display text-xl font-semibold text-[#2d211b]">
        Business Profile Summary
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#72594b]">
        Placeholder profile details from onboarding will appear here later.
      </p>

      <dl className="mt-5 grid gap-3">
        {profileItems.map(([label, value]) => (
          <div
            key={label}
            className="rounded-md border border-[#ead8cc] bg-white p-4"
          >
            <dt className="text-xs font-semibold uppercase text-[#9b7a68]">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-[#2d211b]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
