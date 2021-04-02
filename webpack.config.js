const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");
var webpack = require('webpack');


// check environment mode
var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
var API_BASE_URL = {
  production: JSON.stringify('http://localhost-production:4000'),
  development: JSON.stringify('https://localhost:44357')
}

module.exports = {
  entry: {
    main: "./src/main.js",
    // vendor: // TODO
  },
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[contenthash:8].js",
    // I need this literally just so I can use background images in scss
    publicPath: '', // https://stackoverflow.com/questions/64294706/webpack5-automatic-publicpath-is-not-supported-in-this-browser
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
          outputPath: "assets/img",
          esModule: false,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          // I cannot use both "style-loader" and MiniCssExtractPlugin.loader together. It drops a fuck ton of errors.
          // More about it can be read about here: https://stackoverflow.com/a/64320105/4267429
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
            // Code below is how it was in previous versions, but it won't work nowadays. Seen here: https://github.com/ckeditor/ckeditor5/issues/8315#issuecomment-714313936
            //   options: {
            //     plugins: () => [autoprefixer()],
            //   },
            // },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
    new webpack.DefinePlugin({
      'API_BASE_URL': API_BASE_URL[environment]
    }),
    // Look at MyNotes point 15 why we need this.
    new webpack.EnvironmentPlugin({
      'BUILD': 'web'
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  optimization: {
    // "hashed" is removed, this new logic can be found here: https://webpack.js.org/guides/caching/
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    historyApiFallback: true,
  }
};
