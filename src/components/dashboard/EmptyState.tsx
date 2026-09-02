import { PartyPopper, SearchX } from "lucide-react";

interface EmptyStateProps {
    variant: "no-issues" | "no-matches";
    onClearFilters?: () => void;
}

/** Reassuring copy for the two "nothing to show" cases: everything resolved vs. filters too narrow. */
export function EmptyState({ variant, onClearFilters }: EmptyStateProps) {
    if (variant === "no-issues") {
        return (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                <PartyPopper aria-hidden="true" className="size-8 text-resolved" />
                <p className="text-lg font-medium text-ink">You&apos;re all caught up!</p>
                <p className="max-w-sm text-slate-600">
                    No open accessibility violations right now. New scans will appear here automatically.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
            <SearchX aria-hidden="true" className="size-8 text-slate-400" />
            <p className="text-lg font-medium text-ink">No violations match your filters</p>
            <p className="max-w-sm text-slate-600">
                Try adjusting or clearing your filters to see more results.
            </p>
            {onClearFilters && (
                <button
                    type="button"
                    onClick={onClearFilters}
                    className="mt-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-ink transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}
