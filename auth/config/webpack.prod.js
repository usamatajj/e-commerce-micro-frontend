const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies: packageJsonDependencies } = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/auth/latest/",
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
  ],
};

module.exports = merge(commonConfig, prodConfig);
