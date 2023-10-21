const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: path.resolve(__dirname, "./src/index.ts"),
  devServer: {
    static: path.resolve(__dirname, "public"),
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "public/index.html",
    }),
  ],
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
};
