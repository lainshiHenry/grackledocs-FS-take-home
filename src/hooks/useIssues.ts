import { useCallback, useEffect, useState } from "react";
import { fetchIssues, fetchTrend, updateIssueStatusRemote, type FetchMode } from "../api/mockApi";
import type { AccessibilityIssue, RemediationStatus, TrendPoint } from "../types/accessibility";

interface UseIssuesResult {
    issues: AccessibilityIssue[];
    trend: TrendPoint[];
    loading: boolean;
    error: string | null;
    reload: () => void;
    updateStatus: (issueId: string, status: RemediationStatus) => Promise<void>;
}

/** Loads the mock issue list + trend snapshot and exposes an optimistic status updater. */
export function useIssues(mode: FetchMode = "default"): UseIssuesResult {
    const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
    const [trend, setTrend] = useState<TrendPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadToken, setReloadToken] = useState(0);

    useEffect(() => {
        let cancelled = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting loading/error at the start of each fetch is intentional
        setLoading(true);
        setError(null);

        Promise.all([fetchIssues(mode), fetchTrend(mode)])
            .then(([issuesResult, trendResult]) => {
                if (cancelled) return;
                setIssues(issuesResult);
                setTrend(trendResult);
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : "Something went wrong.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [mode, reloadToken]);

    const reload = useCallback(() => setReloadToken((token) => token + 1), []);

    const updateStatus = useCallback(
        async (issueId: string, status: RemediationStatus) => {
            const previous = issues;
            // Optimistic update so the UI feels immediate; rolled back on failure.
            setIssues((current) =>
                current.map((issue) =>
                    issue.id === issueId
                        ? { ...issue, status, lastUpdated: new Date().toISOString() }
                        : issue,
                ),
            );
            try {
                const result = await updateIssueStatusRemote(issueId, status);
                setIssues((current) =>
                    current.map((issue) =>
                        issue.id === result.issueId
                            ? { ...issue, status: result.status, lastUpdated: result.lastUpdated }
                            : issue,
                    ),
                );
            } catch {
                setIssues(previous);
            }
        },
        [issues],
    );

    return { issues, trend, loading, error, reload, updateStatus };
}
