module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [
    '/node_modules/(?!bson)',
  ],
};
