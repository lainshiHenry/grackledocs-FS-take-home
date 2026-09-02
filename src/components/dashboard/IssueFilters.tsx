import { Search } from "lucide-react";
import { SEVERITY_META, SEVERITY_ORDER } from "../../utils/severityConfig";
import { STATUS_META, STATUS_ORDER } from "../../utils/statusConfig";
import { CONTENT_TYPE_LABELS } from "../../utils/format";
import type { IssueFiltersState } from "../../utils/filterIssues";
import type { ContentType, RemediationStatus, Severity } from "../../types/accessibility";

interface IssueFiltersProps {
    filters: IssueFiltersState;
    onChange: (filters: IssueFiltersState) => void;
    products: string[];
}

function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function IssueFilters({ filters, onChange, products }: IssueFiltersProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="w-full md:max-w-sm">
                    <label htmlFor="issue-search" className="mb-1.5 block text-sm font-medium text-ink">
                        Search violations
                    </label>
                    <div className="relative">
                        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            id="issue-search"
                            type="search"
                            value={filters.search}
                            onChange={(event) => onChange({ ...filters, search: event.target.value })}
                            placeholder="Rule ID, page, or description"
                            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div>
                        <label htmlFor="filter-product" className="mb-1.5 block text-sm font-medium text-ink">
                            Product
                        </label>
                        <select
                            id="filter-product"
                            value={filters.product}
                            onChange={(event) => onChange({ ...filters, product: event.target.value })}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            <option value="all">All products</option>
                            {products.map((product) => (
                                <option key={product} value={product}>
                                    {product}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="filter-content-type" className="mb-1.5 block text-sm font-medium text-ink">
                            Content type
                        </label>
                        <select
                            id="filter-content-type"
                            value={filters.contentType}
                            onChange={(event) =>
                                onChange({ ...filters, contentType: event.target.value as ContentType | "all" })
                            }
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            <option value="all">All content types</option>
                            {(Object.keys(CONTENT_TYPE_LABELS) as ContentType[]).map((type) => (
                                <option key={type} value={type}>
                                    {CONTENT_TYPE_LABELS[type]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <fieldset className="mt-4">
                <legend className="mb-1.5 text-sm font-medium text-ink">Severity</legend>
                <div className="flex flex-wrap gap-2">
                    {SEVERITY_ORDER.map((severity: Severity) => {
                        const meta = SEVERITY_META[severity];
                        const checked = filters.severities.includes(severity);
                        return (
                            <label
                                key={severity}
                                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${checked ? `${meta.badgeClass} border-transparent` : "border-slate-300 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={checked}
                                    onChange={() => onChange({ ...filters, severities: toggle(filters.severities, severity) })}
                                />
                                {meta.label}
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <fieldset className="mt-4">
                <legend className="mb-1.5 text-sm font-medium text-ink">Status</legend>
                <div className="flex flex-wrap gap-2">
                    {STATUS_ORDER.map((status: RemediationStatus) => {
                        const meta = STATUS_META[status];
                        const checked = filters.statuses.includes(status);
                        return (
                            <label
                                key={status}
                                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${checked ? `${meta.badgeClass} border-transparent` : "border-slate-300 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={checked}
                                    onChange={() => onChange({ ...filters, statuses: toggle(filters.statuses, status) })}
                                />
                                {meta.label}
                            </label>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
}
