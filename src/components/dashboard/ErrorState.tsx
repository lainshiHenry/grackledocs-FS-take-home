import { AlertTriangle, RotateCw } from "lucide-react";

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div
            role="alert"
            className="flex flex-col items-center gap-3 rounded-2xl border border-orange-200 bg-white py-16 text-center shadow-sm"
        >
            <AlertTriangle aria-hidden="true" className="size-8 text-pending" />
            <p className="max-w-sm text-slate-700">
                There was an issue loading your violations. {message}
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
                <RotateCw aria-hidden="true" className="size-4" />
                Try again
            </button>
        </div>
    );
}
