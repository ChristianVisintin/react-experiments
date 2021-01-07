const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require("path");

module.exports = {
  entry: {
    frontend: "./frontend/src/index.tsx",
  },
  output: {
    path: path.resolve('./frontend/static/frontend/'),
    publicPath: './static/frontend/',
    filename: '[name]-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|woff|woff2|ttf|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8096,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: './webpack-stats.json',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./frontend/src/assets", to: "./assets/" }],
    }),
  ],
};
