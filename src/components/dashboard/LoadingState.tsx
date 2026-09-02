export function LoadingState() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-20 shadow-sm"
        >
            <div
                aria-hidden="true"
                className="size-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary"
            />
            <p className="text-slate-600">Loading your accessibility violations…</p>
        </div>
    );
}
