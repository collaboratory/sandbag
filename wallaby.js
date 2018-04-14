module.exports = wallaby => {
  return {
    files: [
      {
        pattern: "src/**",
        load: true
      }
    ],
    tests: [
      {
        pattern: "__tests__/*.test.js"
      }
    ],
    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },
    env: {
      type: "node"
    },
    testFramework: "jest",
    debug: true,
    reportConsoleErrorAsError: true
  };
};
