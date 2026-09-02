import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IssueTable } from "./IssueTable";
import type { AccessibilityIssue } from "../../types/accessibility";

function makeIssue(overrides: Partial<AccessibilityIssue>): AccessibilityIssue {
    return {
        id: "iss-test",
        ruleId: "image-alt",
        severity: "critical",
        help: "Images must have alternate text",
        description: "Ensure images have alt text",
        helpUrl: "https://example.com/image-alt",
        product: "Marketing Website",
        contentType: "web",
        location: "Homepage hero image",
        status: "not_started",
        detectedBy: "automated",
        firstDetected: "2026-08-01T00:00:00.000Z",
        lastUpdated: "2026-08-01T00:00:00.000Z",
        ...overrides,
    };
}

describe("IssueTable", () => {
    const issues = [
        makeIssue({ id: "a", severity: "critical" }),
        makeIssue({ id: "b", severity: "moderate", ruleId: "color-contrast", help: "Contrast" }),
    ];

    it("groups issues into a section per severity", () => {
        render(<IssueTable issues={issues} onStatusChange={jest.fn()} onOpenDetails={jest.fn()} />);

        expect(screen.getByRole("heading", { name: /Critical \(1\)/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Moderate \(1\)/i })).toBeInTheDocument();
    });

    it("calls onStatusChange with the issue id and new status when the status select changes", async () => {
        const user = userEvent.setup();
        const onStatusChange = jest.fn();
        render(<IssueTable issues={issues} onStatusChange={onStatusChange} onOpenDetails={jest.fn()} />);

        const select = screen.getByLabelText(/Update status for image-alt at Homepage hero image/i);
        await user.selectOptions(select, "Resolved");

        expect(onStatusChange).toHaveBeenCalledWith("a", "completed");
    });

    it("calls onOpenDetails with the clicked issue", async () => {
        const user = userEvent.setup();
        const onOpenDetails = jest.fn();
        render(<IssueTable issues={issues} onStatusChange={jest.fn()} onOpenDetails={onOpenDetails} />);

        await user.click(screen.getByRole("button", { name: /View details for image-alt/i }));

        expect(onOpenDetails).toHaveBeenCalledWith(issues[0]);
    });
});
