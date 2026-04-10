/** Simple horizontal bar chart for comparing categories. Values 0–100 (percent) or use max to scale. */
type Item = { label: string; value: number };

type Props = {
  items: Item[];
  title: string;
  description?: string;
  max?: number;
  barColor?: string;
};

export default function SimpleBarChart({ items, title, description, max = 100, barColor = "bg-[#0071e3]" }: Props) {
  return (
    <div className="w-full">
      <h3 className="font-display font-semibold text-brand text-lg tracking-[-0.224px]">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-600 tracking-[-0.224px]">{description}</p>}
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="w-32 shrink-0 text-sm text-slate-700 tracking-[-0.224px]">{item.label}</span>
            <div className="flex-1 h-6 rounded-md bg-[#ededf2] overflow-hidden">
              <div
                className={`h-full rounded-md ${barColor} transition-all duration-700`}
                style={{ width: `${Math.min(100, (item.value / max) * 100)}%` }}
              />
            </div>
            <span className="w-12 text-right text-sm font-medium text-slate-600 tabular-nums">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
