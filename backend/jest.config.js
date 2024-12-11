/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": ["ts-jest",{}],
  },
  testMatch: [
    '<rootDir>/**/*.test.ts', // Match all .test.tsx files in the src folder and subfolders
  ],
};