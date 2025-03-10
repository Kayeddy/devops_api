/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__tests__/helpers/'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__tests__/helpers/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 30000
}; 