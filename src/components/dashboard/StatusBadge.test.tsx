import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
    it("renders the status label as visible text, not just color", () => {
        render(<StatusBadge status="completed" />);
        expect(screen.getByText("Resolved")).toBeInTheDocument();
    });

    it("renders a distinct label per status", () => {
        const { rerender } = render(<StatusBadge status="not_started" />);
        expect(screen.getByText("Not started")).toBeInTheDocument();

        rerender(<StatusBadge status="in_progress" />);
        expect(screen.getByText("In progress")).toBeInTheDocument();

        rerender(<StatusBadge status="testing" />);
        expect(screen.getByText("Verifying fix")).toBeInTheDocument();
    });
});
