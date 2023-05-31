const webpack = require("webpack");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
        new webpack.ProvidePlugin({
          process: "process/browser",
        }),
      ],
    },
    configure: {
      resolve: {
        fallback: {
          stream: require.resolve("stream-browserify"),
          path: require.resolve("path-browserify"),
          os: require.resolve("os-browserify/browser"),
          fs: false,
        },
      },
      ignoreWarnings: [/Failed to parse source map/],
    },
  },
};
