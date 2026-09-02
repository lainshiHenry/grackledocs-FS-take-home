import { useMemo, useState } from "react";
import type { FetchMode } from "../api/mockApi";
import { useIssues } from "../hooks/useIssues";
import { SummaryHeader } from "../components/dashboard/SummaryHeader";
import { IssueFilters } from "../components/dashboard/IssueFilters";
import { IssueTable } from "../components/dashboard/IssueTable";
import { IssueDetailDrawer } from "../components/dashboard/IssueDetailDrawer";
import { LoadingState } from "../components/dashboard/LoadingState";
import { ErrorState } from "../components/dashboard/ErrorState";
import { EmptyState } from "../components/dashboard/EmptyState";
import { DEFAULT_FILTERS, filterIssues, hasActiveFilters, type IssueFiltersState } from "../utils/filterIssues";
import type { AccessibilityIssue } from "../types/accessibility";

export function DashboardPage() {
    const [demoMode, setDemoMode] = useState<FetchMode>("default");
    const { issues, trend, loading, error, reload, updateStatus } = useIssues(demoMode);
    const [filters, setFilters] = useState<IssueFiltersState>(DEFAULT_FILTERS);
    const [activeIssueId, setActiveIssueId] = useState<string | null>(null);
    const [announcement, setAnnouncement] = useState("");

    const products = useMemo(
        () => Array.from(new Set(issues.map((issue) => issue.product))).sort(),
        [issues],
    );

    const filteredIssues = useMemo(() => filterIssues(issues, filters), [issues, filters]);
    const activeIssue = issues.find((issue) => issue.id === activeIssueId) ?? null;

    function handleStatusChange(issue: AccessibilityIssue, status: AccessibilityIssue["status"]) {
        void updateStatus(issue.id, status);
        setAnnouncement(`${issue.ruleId} at ${issue.location} marked as ${status.replace("_", " ")}.`);
    }

    return (
        <div className="min-h-screen bg-surface pb-16">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
            >
                Skip to main content
            </a>

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <p className="text-lg font-semibold text-primary">GrackleDocs</p>
                    <p className="text-sm text-slate-500">Accessibility remediation dashboard</p>
                </div>
            </header>

            <main id="main-content" className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
                <div role="status" aria-live="polite" className="sr-only">
                    {announcement}
                </div>

                {loading && <LoadingState />}

                {!loading && error && (
                    <ErrorState
                        message="Please check your connection and try again."
                        onRetry={reload}
                    />
                )}

                {!loading && !error && (
                    <>
                        <SummaryHeader
                            issues={issues}
                            trend={trend}
                            onViewPlan={() => document.getElementById("violations-table")?.scrollIntoView({ behavior: "smooth" })}
                        />

                        {issues.length === 0 ? (
                            <EmptyState variant="no-issues" />
                        ) : (
                            <div id="violations-table" className="flex flex-col gap-4">
                                <IssueFilters filters={filters} onChange={setFilters} products={products} />
                                {filteredIssues.length === 0 ? (
                                    <EmptyState
                                        variant="no-matches"
                                        onClearFilters={() => setFilters(DEFAULT_FILTERS)}
                                    />
                                ) : (
                                    <IssueTable
                                        issues={filteredIssues}
                                        onStatusChange={(issueId, status) => {
                                            const issue = issues.find((item) => item.id === issueId);
                                            if (issue) handleStatusChange(issue, status);
                                        }}
                                        onOpenDetails={(issue) => setActiveIssueId(issue.id)}
                                    />
                                )}
                                {hasActiveFilters(filters) && filteredIssues.length > 0 && (
                                    <p className="text-sm text-slate-500">
                                        Showing {filteredIssues.length} of {issues.length} violations.
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Demo-only controls to preview loading/empty/error handling without a live backend */}
            <div className="mx-auto mt-4 flex max-w-6xl flex-wrap items-center gap-2 px-4 text-xs text-slate-400 sm:px-6">
                <span>Demo data controls:</span>
                {(["default", "empty", "error"] as FetchMode[]).map((mode) => (
                    <button
                        key={mode}
                        type="button"
                        onClick={() => setDemoMode(mode)}
                        className={`rounded-full border px-2.5 py-1 transition ${demoMode === mode ? "border-primary text-primary" : "border-slate-200 hover:bg-slate-100"
                            }`}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            {activeIssue && (
                <IssueDetailDrawer
                    issue={activeIssue}
                    onClose={() => setActiveIssueId(null)}
                    onStatusChange={(status) => handleStatusChange(activeIssue, status)}
                />
            )}
        </div>
    );
}
