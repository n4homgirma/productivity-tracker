type Props = {
  done: number;
  total: number;
};

export default function ProgressBar({ done, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Today&apos;s progress</span>
        <span>
          {done}/{total} &mdash; {pct}%
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
