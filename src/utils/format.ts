import type { ContentType, DetectionMethod } from "../types/accessibility";

export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
    web: "Web page",
    pdf: "PDF",
    word: "Word document",
    powerpoint: "PowerPoint",
};

export const DETECTION_LABELS: Record<DetectionMethod, string> = {
    automated: "Automated scan",
    human: "Human reviewer",
    ai: "AI review",
};
