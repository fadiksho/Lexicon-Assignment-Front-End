const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  entry: {
    main: ["./src/main.js"],
  },
  mode: "production",
  output: {
    filename: "[name]-bandle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // "style-loader", // creates style nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          },
        ]
      },
      {
        test: /\.html$/,
        use: [{
            loader: "file-loader",
            options: {
              name: "[name].html"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|ico)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["../dist"], {
      allowExternal: true
    }),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}