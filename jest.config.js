/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setup-files-after-env.ts"],
  testEnvironment: "node",
};
