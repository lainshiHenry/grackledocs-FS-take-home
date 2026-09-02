import { DEFAULT_FILTERS, filterIssues, hasActiveFilters, type IssueFiltersState } from "./filterIssues";
import type { AccessibilityIssue } from "../types/accessibility";

function makeIssue(overrides: Partial<AccessibilityIssue>): AccessibilityIssue {
    return {
        id: "iss-test",
        ruleId: "image-alt",
        severity: "critical",
        help: "Images must have alternate text",
        description: "Ensure images have alt text",
        helpUrl: "https://example.com/image-alt",
        product: "Marketing Website",
        contentType: "web",
        location: "Homepage hero image",
        status: "not_started",
        detectedBy: "automated",
        firstDetected: "2026-08-01T00:00:00.000Z",
        lastUpdated: "2026-08-01T00:00:00.000Z",
        ...overrides,
    };
}

describe("hasActiveFilters", () => {
    it("returns false for the default filters", () => {
        expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false);
    });

    it("returns true when any field diverges from the default", () => {
        expect(hasActiveFilters({ ...DEFAULT_FILTERS, search: "alt" })).toBe(true);
        expect(hasActiveFilters({ ...DEFAULT_FILTERS, severities: ["critical"] })).toBe(true);
        expect(hasActiveFilters({ ...DEFAULT_FILTERS, product: "Support Center" })).toBe(true);
    });
});

describe("filterIssues", () => {
    const issues = [
        makeIssue({ id: "a", severity: "critical", status: "not_started", product: "Marketing Website", contentType: "web" }),
        makeIssue({ id: "b", severity: "moderate", status: "completed", product: "Support Center", contentType: "pdf", ruleId: "color-contrast", help: "Contrast" }),
        makeIssue({ id: "c", severity: "serious", status: "in_progress", product: "Support Center", contentType: "web", location: "Contact form" }),
    ];

    it("returns all issues when no filters are active", () => {
        expect(filterIssues(issues, DEFAULT_FILTERS)).toHaveLength(3);
    });

    it("filters by severity", () => {
        const result = filterIssues(issues, { ...DEFAULT_FILTERS, severities: ["critical"] });
        expect(result.map((i) => i.id)).toEqual(["a"]);
    });

    it("filters by multiple statuses (OR semantics)", () => {
        const result = filterIssues(issues, { ...DEFAULT_FILTERS, statuses: ["not_started", "completed"] });
        expect(result.map((i) => i.id).sort()).toEqual(["a", "b"]);
    });

    it("filters by product", () => {
        const result = filterIssues(issues, { ...DEFAULT_FILTERS, product: "Support Center" });
        expect(result.map((i) => i.id).sort()).toEqual(["b", "c"]);
    });

    it("filters by content type", () => {
        const result = filterIssues(issues, { ...DEFAULT_FILTERS, contentType: "pdf" });
        expect(result.map((i) => i.id)).toEqual(["b"]);
    });

    it("filters by case-insensitive search across rule id, help, and location", () => {
        const result = filterIssues(issues, { ...DEFAULT_FILTERS, search: "CONTACT" });
        expect(result.map((i) => i.id)).toEqual(["c"]);
    });

    it("combines filters with AND semantics across fields", () => {
        const filters: IssueFiltersState = {
            ...DEFAULT_FILTERS,
            severities: ["serious"],
            product: "Support Center",
        };
        expect(filterIssues(issues, filters).map((i) => i.id)).toEqual(["c"]);
    });

    it("returns an empty array when nothing matches", () => {
        const result = filterIssues(issues, { ...DEFAULT_FILTERS, search: "no-such-rule" });
        expect(result).toEqual([]);
    });
});
