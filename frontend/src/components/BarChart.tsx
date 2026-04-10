export type BarChartItem = {
  label: string;
  value: number;
  max?: number;
  sublabel?: string;
};

type BarChartProps = {
  data: BarChartItem[];
  title: string;
  description?: string;
  valueSuffix?: string;
  barColor?: string;
  maxValue?: number;
};

export default function BarChart({
  data,
  title,
  description,
  valueSuffix = "",
  barColor = "bg-[#0071e3]",
  maxValue,
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full min-w-0">
      <h3 className="font-display font-semibold text-brand text-lg wrap-break-word tracking-[-0.224px]">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-600 tracking-[-0.224px]">{description}</p>}
      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between gap-2 text-sm mb-1">
              <span className="font-medium text-slate-700 wrap-break-word min-w-0 tracking-[-0.224px]">{item.label}</span>
              <span className="text-slate-600 tabular-nums shrink-0">
                {item.value}
                {valueSuffix}
              </span>
            </div>
            <div className="h-8 rounded-lg bg-[#ededf2] overflow-hidden">
              <div
                className={`h-full rounded-lg ${barColor} transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(100, (item.value / max) * 100)}%` }}
              />
            </div>
            {item.sublabel && (
              <p className="mt-0.5 text-xs text-slate-500">{item.sublabel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
