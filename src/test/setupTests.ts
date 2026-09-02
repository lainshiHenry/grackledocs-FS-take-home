import "@testing-library/jest-dom";

// jsdom has no ResizeObserver; recharts' ResponsiveContainer needs one to mount.
class ResizeObserverStub implements ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

globalThis.ResizeObserver = globalThis.ResizeObserver ?? ResizeObserverStub;
