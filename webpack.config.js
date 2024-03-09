const path = require("path");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        libraryTarget: "umd",
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin({
            extractComments: false
        })]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    devtool: "source-map",
};
