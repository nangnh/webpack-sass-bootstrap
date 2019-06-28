const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const globSync = require("glob").sync;

module.exports = (env, options) => ({
  entry: ["./src/index.js"],
  devServer: {
    contentBase: "./dist"
  },
  devtool: "source-map",
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          options.mode !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader', 
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react",{
                      'plugins': ['@babel/plugin-proposal-class-properties']}]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: ['/node_modules/'],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: ['/node_modules/'],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    }),
    new CleanWebpackPlugin(["dist"]),
    ...globSync("src/**/*.html").map(fileName => {
      return new HtmlWebpackPlugin({
        template: fileName,
        inject: "body",
        filename: fileName.replace("src/", ""),
        favicon: './public/favicon.ico'
      });
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ],
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            extractComments: false
        }),
        new CompressionPlugin({
            test: /\.js$|\.css(\?.*)?$/i
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ""
  }
});
