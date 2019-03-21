module.exports = {
    presets: [
        ["@babel/preset-env", {
            targets: {
                chrome: 58,
                ie: 10,
            },
        }],
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-namespace-from",
    ],
}
