const path = require("path");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackDistBanner } = require("webpack-dist-banner");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "json.js",
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
        new CleanWebpackPlugin(),
        new WebpackDistBanner({
            banner: `/* Copyright (c) NriotHrreion 2024 */
/* Repo: https://github.com/NriotHrreion/json */\n`,
            extensions: ["js"]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin({
            extractComments: true
        })]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    devtool: "source-map",
};
