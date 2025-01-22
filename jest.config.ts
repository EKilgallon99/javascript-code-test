import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['src', 'node_modules'],
  preset: 'ts-jest',
};

export default config;
