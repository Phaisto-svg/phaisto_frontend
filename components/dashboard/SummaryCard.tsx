type SummaryCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function SummaryCard({ label, value, detail }: SummaryCardProps) {
  return (
    <article className="rounded-md border border-[#ead8cc] bg-white p-5 shadow-[0_16px_45px_rgba(74,51,41,0.06)]">
      <p className="text-sm font-semibold text-[#72594b]">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="font-display text-3xl font-semibold text-[#2d211b]">
          {value}
        </p>
        <p className="text-right text-xs font-semibold uppercase text-[#a34724]">
          {detail}
        </p>
      </div>
    </article>
  );
}
