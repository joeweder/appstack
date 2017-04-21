const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

process.traceDeprecation = true;

var isProd = (process.env.NODE_ENV === 'production');
//set PRODUCTION_API=true  we default to false
var isProductionAPI = 'true' === process.env.PRODUCTION_API || false;

function formatCSS(base) {
  var opt = (isProd ? '.min' : "");
  return base.concat(opt, ".css");
}

function getProxyTarget() {
  return isProductionAPI ? 'http://localhost:8888' : 'http://localhost:3004';
}

//[chunkhash] is slow for dev and wasn't able to get working with webpack-dev-server
function getOutputFileName() {
  return isProd ? '[name].[chunkhash].js' : '[name].js';
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

  plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      })
  );

  plugins.push(
      //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      })
  );

  plugins.push(
      new ChunkHashReplacePlugin({
        src: 'src/index.html',
        dest: 'bin/index.html',
      })
  );

  return plugins;
}

module.exports = {
  entry: {
    contacts: './src/index.js'
  },
  output: {
    filename: getOutputFileName(),
    path: path.resolve(__dirname, './bin')
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/appstack/service/**': {
        target: getProxyTarget(),
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc',
            failOnWarning: false,
            failOnError: true
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!less-loader"
        })
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000'
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000',
              mimetype:'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000',
              mimetype:'application/octet-stream'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit:'100000',
              mimetype:'image/svg+xml'
            }
          }
        ]
      }
    ]
  }
};