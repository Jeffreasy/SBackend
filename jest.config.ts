export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/dist'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/test-utils.ts'],
  testTimeout: 30000, // Verhoog de timeout tot 30 seconden
};
