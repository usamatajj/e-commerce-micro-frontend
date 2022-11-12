// Plugins
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// Configs
const commonConfig = require("./webpack.common");
const { dependencies: packageJsonDependencies } = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJsonDependencies,
    }),
    new HtmlWebpackPlugin({ template: "public/index.html" }),
  ],
};

module.exports = merge(commonConfig, devConfig);
