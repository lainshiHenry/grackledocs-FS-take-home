import { STATUS_META, STATUS_ORDER } from "../../utils/statusConfig";
import { formatDate } from "../../utils/format";
import type { AccessibilityIssue, RemediationStatus } from "../../types/accessibility";

interface IssueRowProps {
    issue: AccessibilityIssue;
    onStatusChange: (status: RemediationStatus) => void;
    onOpenDetails: () => void;
}

export function IssueRow({ issue, onStatusChange, onOpenDetails }: IssueRowProps) {
    return (
        <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
            <td className="px-4 py-3 align-top">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-ink">
                    {issue.ruleId}
                </code>
                <p className="mt-1 text-sm text-slate-600">{issue.product}</p>
            </td>
            <td className="px-4 py-3 align-top text-sm text-ink">{issue.location}</td>
            <td className="px-4 py-3 align-top text-sm text-slate-600">{issue.help}</td>
            <td className="px-4 py-3 align-top">
                <label className="sr-only" htmlFor={`status-${issue.id}`}>
                    Update status for {issue.ruleId} at {issue.location}
                </label>
                <div className={`inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-1 py-1 text-sm font-medium ${STATUS_META[issue.status].badgeClass}`}>
                    <select
                        id={`status-${issue.id}`}
                        value={issue.status}
                        onChange={(event) => onStatusChange(event.target.value as RemediationStatus)}
                        className="cursor-pointer border-none bg-transparent text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        {STATUS_ORDER.map((status) => (
                            <option key={status} value={status}>
                                {STATUS_META[status].label}
                            </option>
                        ))}
                    </select>
                </div>
            </td>
            <td className="px-4 py-3 align-top text-sm text-slate-600">{formatDate(issue.lastUpdated)}</td>
            <td className="px-4 py-3 align-top">
                <button
                    type="button"
                    onClick={onOpenDetails}
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    View details
                    <span className="sr-only"> for {issue.ruleId} at {issue.location}</span>
                </button>
            </td>
        </tr>
    );
}
