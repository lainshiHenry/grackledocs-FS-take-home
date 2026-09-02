import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { SeverityBadge } from "./SeverityBadge";
import { STATUS_META, STATUS_ORDER } from "../../utils/statusConfig";
import { CONTENT_TYPE_LABELS, DETECTION_LABELS, formatDate } from "../../utils/format";
import type { AccessibilityIssue, RemediationStatus } from "../../types/accessibility";

interface IssueDetailDrawerProps {
    issue: AccessibilityIssue;
    onClose: () => void;
    onStatusChange: (status: RemediationStatus) => void;
}

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function IssueDetailDrawer({ issue, onClose, onStatusChange }: IssueDetailDrawerProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocused = useRef<Element | null>(null);

    useEffect(() => {
        previouslyFocused.current = document.activeElement;
        const dialog = dialogRef.current;
        const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        focusable?.[0]?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab" || !dialog) return;

            const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (previouslyFocused.current instanceof HTMLElement) {
                previouslyFocused.current.focus();
            }
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40" onMouseDown={onClose}>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="issue-drawer-title"
                onMouseDown={(event) => event.stopPropagation()}
                className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white p-6 shadow-xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {issue.ruleId}
                        </p>
                        <h2 id="issue-drawer-title" className="mt-1 text-xl font-semibold text-ink">
                            {issue.help}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close issue details"
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        <X aria-hidden="true" className="size-5" />
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <SeverityBadge severity={issue.severity} />
                    <StatusBadge status={issue.status} />
                </div>

                <p className="mt-4 text-sm text-slate-700">{issue.description}</p>

                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Product</dt>
                        <dd className="text-sm text-ink">{issue.product}</dd>
                    </div>
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Content type</dt>
                        <dd className="text-sm text-ink">{CONTENT_TYPE_LABELS[issue.contentType]}</dd>
                    </div>
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</dt>
                        <dd className="text-sm text-ink">{issue.location}</dd>
                    </div>
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Detected by</dt>
                        <dd className="text-sm text-ink">{DETECTION_LABELS[issue.detectedBy]}</dd>
                    </div>
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">First detected</dt>
                        <dd className="text-sm text-ink">{formatDate(issue.firstDetected)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Last updated</dt>
                        <dd className="text-sm text-ink">{formatDate(issue.lastUpdated)}</dd>
                    </div>
                    {issue.assignee && (
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Assigned to</dt>
                            <dd className="text-sm text-ink">{issue.assignee}</dd>
                        </div>
                    )}
                </dl>

                {issue.snippet && (
                    <div className="mt-6">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Where it was found</h3>
                        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
                            <code>{issue.snippet}</code>
                        </pre>
                    </div>
                )}

                {issue.failureSummary && (
                    <div className="mt-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Suggested fix</h3>
                        <p className="mt-1 text-sm text-slate-700">{issue.failureSummary}</p>
                    </div>
                )}

                <a
                    href={issue.helpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    Read full guidance
                    <ExternalLink aria-hidden="true" className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                </a>

                <div className="mt-6 border-t border-slate-100 pt-4">
                    <label htmlFor="drawer-status" className="mb-1.5 block text-sm font-medium text-ink">
                        Remediation status
                    </label>
                    <select
                        id="drawer-status"
                        value={issue.status}
                        onChange={(event) => onStatusChange(event.target.value as RemediationStatus)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        {STATUS_ORDER.map((status) => (
                            <option key={status} value={status}>
                                {STATUS_META[status].label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
