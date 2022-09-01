const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    colorSwitcher: "./src/01-color-switcher.js",
    timer: "./src/02-timer.js",
    promises: "./src/03-promises.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      inject: "body",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/02-timer.html",
      inject: "body",
      chunks: ["timer"],
      filename: "02-timer.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/01-color-switcher.html",
      inject: "body",
      chunks: ["colorSwitcher"],
      filename: "01-color-switcher.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/03-promises.html",
      inject: "body",
      chunks: ["promises"],
      filename: "03-promises.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:5].css",
      chunkFilename: "[id].[contenthash:5].css",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].[hash:5].js",
    path: path.resolve(__dirname, "dist"),
  },
};
