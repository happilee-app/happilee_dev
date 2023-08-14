const config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+.(js|ts)$': 'babel-jest',
    '^.+.(jsx|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy',
  },
}

export default config
