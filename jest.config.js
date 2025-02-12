export default {
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
