const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { resolve } = require("path");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  return {
    mode,
    entry: "./src/index.js",
    output: {
      publicPath: "/",
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
        // {
        //   test: /\.(jpe?g|png|gif|svg)$/i,
        //   exclude: /node_modules/,
        //   options: {
        //     name: "/public/icons/[name].[ext]",
        //   },
        // },
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
        "process.env.NODE_ENV": JSON.stringify(
          isDevelopment ? "development" : "production"
        ),
      }),
    ].filter(Boolean),
    devServer: {
      open: true,
      historyApiFallback: true,
      hot: true,
    },
    resolve: {
      modules: [resolve(process.cwd(), "src"), "node_modules"],
      extensions: ["*", ".js", ".jsx", ".json"],
      symlinks: false,
      cacheWithContext: false,
      preferRelative: true,
    },
  };
};

// module.exports = {
//   entry: path.join(__dirname, "src", "index.js"),
//   output: {
//     path: path.resolve(__dirname, "dist"),
//   },
//   rules: [
//     {
//       test: /\.less$/,
//       use: [
//         {
//           loader: "less-loader", // compiles Less to CSS
//           options: {
//             lessOptions: {
//               // If you are using less-loader@5 please spread the lessOptions to options directly
//               modifyVars: {
//                 "primary-color": "#1DA57A",
//                 "link-color": "#1DA57A",
//                 "border-radius-base": "2px",
//               },
//               javascriptEnabled: true,
//             },
//           },
//         },
//       ],
//       // ...other rules
//     },
//   ],
//   // ...other config
// };
