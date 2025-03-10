module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
}; 