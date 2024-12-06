/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // Process `*.tsx` files with `ts-jest`
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.app.json' }],
  },

  testMatch: [
    '<rootDir>/src/**/*frontend.test.tsx', // Match all .test.tsx files in the src folder and subfolders
  ],
};

export default config;
