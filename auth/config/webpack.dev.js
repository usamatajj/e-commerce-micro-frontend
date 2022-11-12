// Plugins
const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// Configs
const commonConfig = require("./webpack.common");
const { dependencies: packageJsonDependencies } = require("../package.json");

const devConfig = {
  mode: "development",
  output: { publicPath: "http://localhost:8082/" },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJsonDependencies,
    }),
    new HtmlWebpackPlugin({ template: "public/index.html" }),
  ],
};

module.exports = merge(commonConfig, devConfig);
