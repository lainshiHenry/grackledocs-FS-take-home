import { STATUS_META } from "../../utils/statusConfig";
import type { RemediationStatus } from "../../types/accessibility";

/** Status shown as icon + colored text + label so it never relies on color alone. */
export function StatusBadge({ status }: { status: RemediationStatus }) {
    const meta = STATUS_META[status];
    const Icon = meta.icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${meta.badgeClass}`}
        >
            <Icon aria-hidden="true" className={status === "in_progress" ? "size-4 animate-spin" : "size-4"} />
            {meta.label}
        </span>
    );
}
