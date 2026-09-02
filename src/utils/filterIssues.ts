import type { AccessibilityIssue, ContentType, RemediationStatus, Severity } from "../types/accessibility";

export interface IssueFiltersState {
    search: string;
    severities: Severity[];
    statuses: RemediationStatus[];
    product: string | "all";
    contentType: ContentType | "all";
}

export const DEFAULT_FILTERS: IssueFiltersState = {
    search: "",
    severities: [],
    statuses: [],
    product: "all",
    contentType: "all",
};

export function hasActiveFilters(filters: IssueFiltersState): boolean {
    return (
        filters.search.trim() !== "" ||
        filters.severities.length > 0 ||
        filters.statuses.length > 0 ||
        filters.product !== "all" ||
        filters.contentType !== "all"
    );
}

export function filterIssues(
    issues: AccessibilityIssue[],
    filters: IssueFiltersState,
): AccessibilityIssue[] {
    const search = filters.search.trim().toLowerCase();

    return issues.filter((issue) => {
        if (filters.severities.length > 0 && !filters.severities.includes(issue.severity)) {
            return false;
        }
        if (filters.statuses.length > 0 && !filters.statuses.includes(issue.status)) {
            return false;
        }
        if (filters.product !== "all" && issue.product !== filters.product) {
            return false;
        }
        if (filters.contentType !== "all" && issue.contentType !== filters.contentType) {
            return false;
        }
        if (search) {
            const haystack = `${issue.ruleId} ${issue.help} ${issue.description} ${issue.location} ${issue.product}`.toLowerCase();
            if (!haystack.includes(search)) return false;
        }
        return true;
    });
}
