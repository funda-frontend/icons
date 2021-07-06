const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: "errors-only",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/**/*.(html|css)",
          to: "[name][ext]",
        },
      ],
    }),
  ],
};
