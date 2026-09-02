import type { TrendPoint } from "../types/accessibility";

/**
 * Weekly snapshots for the trend chart. Values are illustrative and align
 * with the current totals in mockIssues (13 open, 4 resolved of 17 total).
 */
export const mockTrend: TrendPoint[] = [
    { date: "2026-07-15", totalOpen: 22, resolved: 0 },
    { date: "2026-07-22", totalOpen: 20, resolved: 1 },
    { date: "2026-07-29", totalOpen: 19, resolved: 1 },
    { date: "2026-08-05", totalOpen: 17, resolved: 2 },
    { date: "2026-08-12", totalOpen: 16, resolved: 2 },
    { date: "2026-08-19", totalOpen: 15, resolved: 3 },
    { date: "2026-08-26", totalOpen: 14, resolved: 3 },
    { date: "2026-09-02", totalOpen: 13, resolved: 4 },
];
