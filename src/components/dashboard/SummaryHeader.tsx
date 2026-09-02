import { ProgressRing } from "./ProgressRing";
import { TrendChart } from "./TrendChart";
import { STATUS_META, STATUS_ORDER } from "../../utils/statusConfig";
import type { AccessibilityIssue, TrendPoint } from "../../types/accessibility";

interface SummaryHeaderProps {
    issues: AccessibilityIssue[];
    trend: TrendPoint[];
    onViewPlan: () => void;
}

export function SummaryHeader({ issues, trend, onViewPlan }: SummaryHeaderProps) {
    const total = issues.length;
    const resolvedCount = issues.filter((issue) => issue.status === "completed").length;
    const percentResolved = total === 0 ? 0 : (resolvedCount / total) * 100;

    const counts = STATUS_ORDER.map((status) => ({
        status,
        count: issues.filter((issue) => issue.status === status).length,
    }));

    return (
        <section
            aria-labelledby="summary-heading"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 id="summary-heading" className="text-2xl font-semibold text-ink">
                        Accessibility remediation snapshot
                    </h1>
                    <p className="mt-1 max-w-xl text-slate-600">
                        A live view of the accessibility violations found across your products, and how
                        steadily we&apos;re working through them together.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onViewPlan}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    View remediation plan
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr_1.4fr] lg:items-center">
                <div className="flex flex-col items-center gap-3 justify-self-center">
                    <ProgressRing percent={percentResolved} label="Violations resolved" />
                    <p className="text-sm text-slate-600">
                        <span className="font-semibold text-ink">{resolvedCount}</span> of{" "}
                        <span className="font-semibold text-ink">{total}</span> resolved
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4" role="list" aria-label="Violation counts by status">
                    {counts.map(({ status, count }) => {
                        const meta = STATUS_META[status];
                        const Icon = meta.icon;
                        return (
                            <div
                                key={status}
                                role="listitem"
                                className={`flex items-center gap-3 rounded-xl p-3 ${meta.badgeClass}`}
                            >
                                <Icon aria-hidden="true" className="size-5 shrink-0" />
                                <div>
                                    <p className="text-lg font-semibold leading-none">{count}</p>
                                    <p className="text-xs font-medium">{meta.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                    <h2 className="mb-2 text-sm font-semibold text-ink">Violations over time</h2>
                    <TrendChart data={trend} />
                </div>
            </div>
        </section>
    );
}
