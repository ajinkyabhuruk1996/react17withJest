const {defaults} = require('jest-config');

module.exports = {
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  roots: ['src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/setupFilesImportForJest.ts',
    "<rootDir>/src/setuptests.js"
  ],
  //testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  "testMatch": ["**/*.test.js"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    "^.+\\.svg$": "<rootDir>/svgTransform.js" 
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  verbose: true,
  globals: {
    "__DEV__": true,
    "__RCTProfileIsProfiling": false
  },
};