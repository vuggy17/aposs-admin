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
          // loader: "url-loader",
          use: [
            // { loader: "url-loader" },
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
              loader: "css-loader", // translates CSS into CommonJS
            },
            {
              loader: "less-loader", // compiles Less to CSS
              options: {
                lessOptions: {
                  // If you are using less-loader@5 please spread the lessOptions to options directly
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
      modules: [path.join(__dirname, "node_modules")],
      extensions: ["*", ".js", ".jsx", ".json"],
      preferRelative: true,
      alias: {
        components: path.resolve(__dirname, "src/components"),
        pages: path.resolve(__dirname, "src/pages"),
        style: path.resolve(__dirname, "src/style"),
        api: path.resolve(__dirname, "src/api"),
        util: path.resolve(__dirname, "src/util"),
        routes: path.resolve(__dirname, "src/routes"),
        lib: path.resolve(__dirname, "src/lib"),
        environment: path.resolve(__dirname, "src/environment"),
        asset: path.resolve(__dirname, "./src/asset"),
      },
    },
  };
};
