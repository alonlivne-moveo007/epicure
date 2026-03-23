const path = require('path');
const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  // Nx runs Jest from the workspace root; Next must resolve `app/` relative to the frontend app.
  dir: path.join(__dirname),
});

const config = {
  displayName: '@epicure/frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../coverage/frontend',
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
