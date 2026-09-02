import { AlertCircle, AlertOctagon, AlertTriangle, Info, type LucideIcon } from "lucide-react";
import type { Severity } from "../types/accessibility";

export interface SeverityMeta {
    label: string;
    description: string;
    icon: LucideIcon;
    textClass: string;
    badgeClass: string;
}

export const SEVERITY_ORDER: Severity[] = ["critical", "serious", "moderate", "minor"];

export const SEVERITY_META: Record<Severity, SeverityMeta> = {
    critical: {
        label: "Critical",
        description: "Blocks core tasks for people using assistive technology",
        icon: AlertOctagon,
        textClass: "text-red-700",
        badgeClass: "bg-red-50 text-red-700",
    },
    serious: {
        label: "Serious",
        description: "Major barrier for some users, workaround unlikely",
        icon: AlertTriangle,
        textClass: "text-orange-700",
        badgeClass: "bg-orange-50 text-orange-700",
    },
    moderate: {
        label: "Moderate",
        description: "Noticeable friction, but a workaround usually exists",
        icon: AlertCircle,
        textClass: "text-amber-700",
        badgeClass: "bg-amber-50 text-amber-700",
    },
    minor: {
        label: "Minor",
        description: "Small deviation from best practice, low user impact",
        icon: Info,
        textClass: "text-slate-600",
        badgeClass: "bg-slate-100 text-slate-600",
    },
};
