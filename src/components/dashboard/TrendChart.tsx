import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "../../types/accessibility";
import { formatDate } from "../../utils/format";

export function TrendChart({ data }: { data: TrendPoint[] }) {
    const first = data[0];
    const last = data[data.length - 1];
    const isTrendingDown = first && last && last.totalOpen <= first.totalOpen;

    const chartData = data.map((point) => ({
        ...point,
        label: formatDate(point.date),
    }));

    return (
        <div>
            <div className="h-40" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={28} />
                        <Tooltip
                            contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 13 }}
                            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="totalOpen"
                            name="Open violations"
                            stroke="#c2410c"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="resolved"
                            name="Resolved"
                            stroke="#047857"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* Text equivalent of the chart for screen reader users, per WCAG 1.1.1 */}
            <p className="sr-only">
                {first && last
                    ? `Open violations trend from ${first.totalOpen} on ${formatDate(first.date)} to ${last.totalOpen} on ${formatDate(last.date)}. Resolved count rose from ${first.resolved} to ${last.resolved} over the same period.`
                    : "No trend data available yet."}
            </p>
            {isTrendingDown && (
                <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-resolved">
                    You&apos;re on track — open violations are trending down.
                </p>
            )}
        </div>
    );
}
