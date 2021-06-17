const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  notify: true,
  resetMocks: true,
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    path.join(__dirname, 'test-setup'),
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'components', 'common'],
  moduleNameMapper: {
    '^react(.*)$': '<rootDir>/node_modules/react$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
