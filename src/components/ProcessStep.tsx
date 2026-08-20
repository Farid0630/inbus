export function ProcessStep({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative flex flex-col gap-3 rounded-2xl border border-line bg-cream p-6">
      <span className="font-display text-4xl font-bold text-forest/15">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}
