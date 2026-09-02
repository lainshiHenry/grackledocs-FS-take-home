import { renderHook, waitFor, act } from "@testing-library/react";
import { useIssues } from "./useIssues";

describe("useIssues", () => {
    it("starts in a loading state and resolves with issues and trend data", async () => {
        const { result } = renderHook(() => useIssues("default"));

        expect(result.current.loading).toBe(true);
        expect(result.current.issues).toEqual([]);

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 3000 });

        expect(result.current.error).toBeNull();
        expect(result.current.issues.length).toBeGreaterThan(0);
        expect(result.current.trend.length).toBeGreaterThan(0);
    });

    it("surfaces an error message in error mode", async () => {
        const { result } = renderHook(() => useIssues("error"));

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 3000 });

        expect(result.current.error).toBe("Unable to reach the accessibility report service.");
        expect(result.current.issues).toEqual([]);
    });

    it("resolves with an empty issue list in empty mode", async () => {
        const { result } = renderHook(() => useIssues("empty"));

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 3000 });

        expect(result.current.error).toBeNull();
        expect(result.current.issues).toEqual([]);
    });

    it("optimistically updates an issue's status", async () => {
        const { result } = renderHook(() => useIssues("default"));
        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 3000 });

        const target = result.current.issues[0];
        await act(async () => {
            await result.current.updateStatus(target.id, "completed");
        });

        const updated = result.current.issues.find((issue) => issue.id === target.id);
        expect(updated?.status).toBe("completed");
    });
});
