import { fetchIssues, fetchTrend, updateIssueStatusRemote } from "./mockApi";

describe("fetchIssues", () => {
    it("resolves with the mock issue list by default", async () => {
        const issues = await fetchIssues();
        expect(issues.length).toBeGreaterThan(0);
    });

    it("resolves with an empty array in empty mode", async () => {
        await expect(fetchIssues("empty")).resolves.toEqual([]);
    });

    it("rejects in error mode", async () => {
        await expect(fetchIssues("error")).rejects.toThrow(
            "Unable to reach the accessibility report service.",
        );
    });

    it("returns copies so callers can't mutate the shared fixture", async () => {
        const first = await fetchIssues();
        first[0].status = "completed";
        const second = await fetchIssues();
        expect(second[0].status).not.toBe("completed");
    });
});

describe("fetchTrend", () => {
    it("resolves with trend points by default", async () => {
        const trend = await fetchTrend();
        expect(trend.length).toBeGreaterThan(0);
    });

    it("rejects in error mode", async () => {
        await expect(fetchTrend("error")).rejects.toThrow();
    });
});

describe("updateIssueStatusRemote", () => {
    it("echoes back the requested status with a fresh timestamp", async () => {
        const result = await updateIssueStatusRemote("iss-001", "completed");
        expect(result.issueId).toBe("iss-001");
        expect(result.status).toBe("completed");
        expect(new Date(result.lastUpdated).toString()).not.toBe("Invalid Date");
    });
});
