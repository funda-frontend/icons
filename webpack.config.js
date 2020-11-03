const path = require("path");

module.exports = {
  mode: "development",
  stats: "errors-only",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
};
