/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@server-actions/(.*)$": "<rootDir>/src/server-actions/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
  },
};
