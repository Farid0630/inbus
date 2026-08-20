export function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 border-s-2 border-gold/60 ps-4">
      <span className="font-display text-3xl font-bold text-cream sm:text-4xl">{value}</span>
      <span className="text-sm text-cream/65">{label}</span>
    </div>
  );
}
