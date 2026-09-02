import { SEVERITY_META } from "../../utils/severityConfig";
import type { Severity } from "../../types/accessibility";

export function SeverityBadge({ severity }: { severity: Severity }) {
    const meta = SEVERITY_META[severity];
    const Icon = meta.icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${meta.badgeClass}`}
        >
            <Icon aria-hidden="true" className="size-4" />
            {meta.label}
        </span>
    );
}
