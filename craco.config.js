const path = require("path");
const { whenProd, addBeforeLoader, loaderByName } = require("@craco/craco");
const WorkerPlugin = require("worker-plugin");

module.exports = {
  webpack: {
    configure: function (webpackConfig) {
      const locales = {
        type: "javascript/auto",
        test: /\.json/,
        include: /src(\/|\\)locales/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: whenProd(
                () => "[name].[contenthash:8].[ext]",
                "[name].[ext]"
              ),
              outputPath: (url, resourcePath, context) => {
                const lng = resourcePath
                  .replace(/\\/g, "/")
                  .match(/locales\/(.+)\/translation.json/)[1];

                return `static/locales/${lng}/${url}`;
              }
            }
          }
        ]
      };

      addBeforeLoader(webpackConfig, loaderByName("file-loader"), locales);

      return webpackConfig;
    },
    plugins: [new WorkerPlugin()],
    alias: {
      "@Store": path.resolve(__dirname, "src/store/"),
      "@Utils": path.resolve(__dirname, "src/utils/"),
      "@Data": path.resolve(__dirname, "src/data/"),
      "@SVG": path.resolve(__dirname, "src/svg/"),
      "@Components": path.resolve(__dirname, "src/components/"),
      "@Views": path.resolve(__dirname, "src/views/")
    }
  },
  eslint: {
    configure: {
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "jsx-a11y/anchor-has-content": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "no-use-before-define": "off",
        "no-unused-vars": "off",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  }
};
