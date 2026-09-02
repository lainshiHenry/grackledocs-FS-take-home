/** @type {import('jest').Config} */
module.exports = {
    rootDir: ".",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "<rootDir>/src/test/styleMock.ts",
    },
    transform: {
        "^.+\\.(t|j)sx?$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!(recharts|d3-.*|internmap|delaunator|robust-predicates)/)"],
};
