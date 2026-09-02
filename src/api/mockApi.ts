import { mockIssues } from "../data/mockIssues";
import { mockTrend } from "../data/mockTrend";
import type { AccessibilityIssue, TrendPoint } from "../types/accessibility";

const NETWORK_DELAY_MS = 700;

/** Demo-only switches so the loading/empty/error states can be seen without a real backend. */
export type FetchMode = "default" | "empty" | "error";

function delay<T>(value: T, ms = NETWORK_DELAY_MS): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchIssues(
    mode: FetchMode = "default",
): Promise<AccessibilityIssue[]> {
    if (mode === "error") {
        await delay(null);
        throw new Error("Unable to reach the accessibility report service.");
    }
    if (mode === "empty") {
        return delay([]);
    }
    return delay(mockIssues.map((issue) => ({ ...issue })));
}

export async function fetchTrend(mode: FetchMode = "default"): Promise<TrendPoint[]> {
    if (mode === "error") {
        await delay(null);
        throw new Error("Unable to reach the accessibility report service.");
    }
    if (mode === "empty") {
        return delay([]);
    }
    return delay(mockTrend.map((point) => ({ ...point })));
}

/** Simulates persisting a status change to the remediation tracker. */
export async function updateIssueStatusRemote(
    issueId: string,
    status: AccessibilityIssue["status"],
): Promise<{ issueId: string; status: AccessibilityIssue["status"]; lastUpdated: string }> {
    return delay(
        { issueId, status, lastUpdated: new Date().toISOString() },
        300,
    );
}
