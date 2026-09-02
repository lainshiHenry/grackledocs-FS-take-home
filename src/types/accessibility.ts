/** Domain model for the accessibility dashboard. Mirrors axe-core's report shape
 * (id, impact, description, help, helpUrl, nodes) with fields added for the
 * remediation workflow (status, product, ownership, timestamps). See
 * templates/axe-report.template.json for the raw source shape this is derived from. */

/** Matches axe-core's `impact` values, used to group and prioritize the table. */
export type Severity = "critical" | "serious" | "moderate" | "minor";

/** Remediation lifecycle a client can move an issue through. */
export type RemediationStatus =
    | "not_started"
    | "in_progress"
    | "testing"
    | "completed";

export type ContentType = "web" | "pdf" | "word" | "powerpoint";

/** How the violation was found, per problem.md (human, automated, or AI review). */
export type DetectionMethod = "automated" | "human" | "ai";

export interface AccessibilityIssue {
    /** Unique per finding instance (a rule can appear multiple times/pages). */
    id: string;
    /** axe-core rule id, e.g. "image-alt". */
    ruleId: string;
    severity: Severity;
    /** Short rule title, axe-core's `help`. */
    help: string;
    /** Longer rule description, axe-core's `description`. */
    description: string;
    helpUrl: string;
    /** Client-facing product/site this was found in. */
    product: string;
    contentType: ContentType;
    /** Human-readable page/section/component, e.g. "Homepage hero image". */
    location: string;
    /** CSS selector or document target from axe-core's `target`. */
    target?: string;
    /** Offending markup snippet from axe-core's `html`. */
    snippet?: string;
    /** axe-core's `failureSummary`, kept for the detail view. */
    failureSummary?: string;
    status: RemediationStatus;
    detectedBy: DetectionMethod;
    firstDetected: string;
    lastUpdated: string;
    assignee?: string;
}

/** A single weekly snapshot used to plot the "trending down" chart. */
export interface TrendPoint {
    date: string;
    totalOpen: number;
    resolved: number;
}
