interface ProgressRingProps {
    percent: number;
    size?: number;
    strokeWidth?: number;
    label: string;
}

/** Circular progress indicator; percentage is also rendered as text so it never relies on color/shape alone. */
export function ProgressRing({ percent, size = 128, strokeWidth = 12, label }: ProgressRingProps) {
    const clamped = Math.min(100, Math.max(0, percent));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - clamped / 100);

    return (
        <div
            role="img"
            aria-label={`${label}: ${Math.round(clamped)} percent`}
            className="relative inline-flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#047857"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-[stroke-dashoffset] duration-700 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold text-ink">{Math.round(clamped)}%</span>
                <span className="text-xs text-slate-500">resolved</span>
            </div>
        </div>
    );
}
