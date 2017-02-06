var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    contacts: './src/index.js'
  },
  output: {
    path: './bin',
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  devServer: {
    proxy: {
      '/appstack/service/**': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false
      }
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
/*
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
*/
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new CopyWebpackPlugin([
      {from: './src/styles/bootstrap/css/bootstrap.css', to: 'css/bootstrap.css'},
      {from: './src/styles/bootstrap/css/bootstrap-theme.css', to: 'css/bootstrap-theme.css'},
      {flatten: 'true', from: './src/styles/bootstrap/fonts/*', to: 'fonts'}
    ])
  ]
};