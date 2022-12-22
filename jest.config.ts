/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
    bail: true,
    clearMocks: true,
    coverageProvider: 'v8',
    globals: {
      "ts-jest": {
        "compiler": "ttypescript"
      }
    },
    preset: 'ts-jest',
    setupFiles: [
      "<rootDir>/tests/config.ts"
    ],
    testMatch:['**/tests/**/*.test.ts'],
    transform: {
      ".(ts|tsx)": "ts-jest"
    },
    testTimeout: 30000,
};
  