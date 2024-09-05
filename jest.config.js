const config = {
    testEnvironment: "node",
    verbose: true,
    testMatch: ["**/test/*.test.js"],
    forceExit: true,
    setupFilesAfterEnv: ["./test/jest.setup.js"],
};

module.exports = config;
