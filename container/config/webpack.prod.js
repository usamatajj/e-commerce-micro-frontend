const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const { dependencies: packageJsonDependencies } = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `marketing@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: packageJsonDependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
