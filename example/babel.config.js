module.exports = {
    presets: [
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-namespace-from",
    ],
    env: {
        production: {
            plugins: [
                ["transform-react-remove-prop-types", {
                    removeImport: true,
                }],
            ],
        },
    },
}
