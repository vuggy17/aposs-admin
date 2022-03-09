const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  return {
    mode,
    entry: "./src/index.js",
    output: {
      publicPath: "public/",
      path: path.resolve(__dirname, "build"),
      filename: "bundled.js",
    },
    module: {
      rules: [
        {
          test: /\.jpe?g|png|svg$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                outputPath: "public/img",
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  modifyVars: {
                    "primary-color": "#1DA57A",
                    "link-color": "#1DA57A",
                    "border-radius-base": "2px",
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
        favicon: "./public/favicon.ico",
        manifest: "./public/manifest.json",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed),
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ].filter(Boolean),
    devServer: {
      open: true,
      historyApiFallback: true,
      hot: true,
    },
    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"],
      extensions: ["*", ".js", ".jsx", ".json"],
      preferRelative: true,
      symlinks: false,
      cacheWithContext: false,
    },
  };
};
