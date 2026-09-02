import { SEVERITY_META, SEVERITY_ORDER } from "../../utils/severityConfig";
import { IssueRow } from "./IssueRow";
import type { AccessibilityIssue, RemediationStatus } from "../../types/accessibility";

interface IssueTableProps {
    issues: AccessibilityIssue[];
    onStatusChange: (issueId: string, status: RemediationStatus) => void;
    onOpenDetails: (issue: AccessibilityIssue) => void;
}

export function IssueTable({ issues, onStatusChange, onOpenDetails }: IssueTableProps) {
    const grouped = SEVERITY_ORDER.map((severity) => ({
        severity,
        items: issues.filter((issue) => issue.severity === severity),
    })).filter((group) => group.items.length > 0);

    return (
        <div className="flex flex-col gap-6">
            {grouped.map(({ severity, items }) => {
                const meta = SEVERITY_META[severity];
                const Icon = meta.icon;
                const headingId = `severity-heading-${severity}`;
                return (
                    <section
                        key={severity}
                        aria-labelledby={headingId}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        <div className={`flex items-center gap-2 border-b border-slate-100 px-4 py-3 ${meta.badgeClass}`}>
                            <Icon aria-hidden="true" className="size-4" />
                            <h3 id={headingId} className="text-sm font-semibold">
                                {meta.label} <span className="font-normal">({items.length})</span>
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[720px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <th scope="col" className="px-4 py-2 font-semibold">Rule / Product</th>
                                        <th scope="col" className="px-4 py-2 font-semibold">Affected page / component</th>
                                        <th scope="col" className="px-4 py-2 font-semibold">Impact description</th>
                                        <th scope="col" className="px-4 py-2 font-semibold">Status</th>
                                        <th scope="col" className="px-4 py-2 font-semibold">Last updated</th>
                                        <th scope="col" className="px-4 py-2 font-semibold">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((issue) => (
                                        <IssueRow
                                            key={issue.id}
                                            issue={issue}
                                            onStatusChange={(status) => onStatusChange(issue.id, status)}
                                            onOpenDetails={() => onOpenDetails(issue)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
