module.exports = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],

    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },

    setupFilesAfterEnv: [
        "<rootDir>/src/test/setup.ts",
    ],

    moduleNameMapper: {
        "\\.module\\.css$": "identity-obj-proxy",
    },

    clearMocks: true,

    coverageDirectory: "coverage",

    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.test.{ts,tsx}",
        "!src/test/**",
    ],
};