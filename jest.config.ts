// eslint-disable-next-line node/no-unpublished-require, import/no-extraneous-dependencies
const { defaults: tsJestPreset } = require('ts-jest/presets');

module.exports = {
  transform: {
    ...tsJestPreset.transform,
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        isolatedModules: true
      }
    ]
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./build/']
};
