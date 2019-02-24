const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: ["./src/main.js"],
  },
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: "[name]-bandle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    overlay: true
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}