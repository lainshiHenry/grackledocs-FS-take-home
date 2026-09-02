import { CheckCircle2, CircleDashed, FlaskConical, Loader2, type LucideIcon } from "lucide-react";
import type { RemediationStatus } from "../types/accessibility";

export interface StatusMeta {
    label: string;
    description: string;
    icon: LucideIcon;
    textClass: string;
    badgeClass: string;
}

export const STATUS_ORDER: RemediationStatus[] = [
    "not_started",
    "in_progress",
    "testing",
    "completed",
];

export const STATUS_META: Record<RemediationStatus, StatusMeta> = {
    not_started: {
        label: "Not started",
        description: "Identified and queued for remediation",
        icon: CircleDashed,
        textClass: "text-pending",
        badgeClass: "bg-pending-surface text-pending",
    },
    in_progress: {
        label: "In progress",
        description: "A fix is actively being worked on",
        icon: Loader2,
        textClass: "text-inprogress",
        badgeClass: "bg-inprogress-surface text-inprogress",
    },
    testing: {
        label: "Verifying fix",
        description: "Fix applied, confirming it resolves the issue",
        icon: FlaskConical,
        textClass: "text-testing",
        badgeClass: "bg-testing-surface text-testing",
    },
    completed: {
        label: "Resolved",
        description: "Confirmed fixed and meets WCAG guidance",
        icon: CheckCircle2,
        textClass: "text-resolved",
        badgeClass: "bg-resolved-surface text-resolved",
    },
};
