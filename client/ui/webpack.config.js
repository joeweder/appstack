const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = (process.env.NODE_ENV === 'production');

function formatCSS(base) {
  var opt = (isProd ? '.min' : "");
  return base.concat(opt, ".css");
}

function getPlugins() {
  var plugins = [];
  var bootstrapRootName = "./src/styles/bootstrap/css/bootstrap";

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));

  plugins.push(
    new ExtractTextPlugin("[name].css")
  );

  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  plugins.push(
      new CopyWebpackPlugin([
        {from: formatCSS(bootstrapRootName), to: 'css/bootstrap.css'},
        {from: formatCSS(bootstrapRootName.concat('-theme')), to: 'css/bootstrap-theme.css'},
        {flatten: 'true', from: './src/styles/bootstrap/fonts/*', to: 'fonts'}
      ])
  );

  return plugins;
}

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
  plugins: getPlugins(),
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
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
  }
};