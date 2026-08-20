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
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
      <span className="font-mono text-4xl font-bold text-graphite/20 transition-colors duration-300 group-hover:text-rust/40">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}
